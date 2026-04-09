import {
  createContext,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { HubConnection } from "@microsoft/signalr";
import type { JoinChatRequest } from "../schemas/JoinChatSchema";
import type { Message } from "../schemas/MessageSchema";
import { useGetMessagesByChatRoom } from "../hooks/api/useGetMessagesByChatRoom";
import type { MessageItem } from "../types";
import {
  createChatConnection,
  joinSignalRChat,
  sendSignalRMessage,
  startChatConnection,
  stopChatConnection,
} from "../services/ChatConnectionService";

type MessagesContextType = {
  messages: MessageItem[];
  chatInput: string;
  messageEndRef: React.RefObject<HTMLSpanElement | null>;
  isMessagesLoading: boolean;
  setChatInput: (value: string) => void;
  handleChatInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => Promise<void>;
  handleChatKeyDown: (key: string) => Promise<void>;
  handleCloseChat: () => Promise<void>;
  joinChatRoom: (payload: JoinChatRequest) => Promise<void>;
  resetMessagesState: () => void;
  resetChatInput: () => void;
};

export const MessagesContext = createContext<MessagesContextType | null>(null);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [activeChatRoomId, setActiveChatRoomId] = useState<string | null>(null);

  const messageEndRef = useRef<HTMLSpanElement>(null);

  const { data: historyMessages, isLoading: isMessagesLoading } =
    useGetMessagesByChatRoom(activeChatRoomId);

  useEffect(() => {
    if (!activeChatRoomId) {
      setMessages([]);
      return;
    }

    if (!historyMessages) return;

    const mappedMessages: MessageItem[] = historyMessages.map((item) => ({
      type: "message",
      messageId: item.messageId,
      chatRoomId: item.chatRoomId,
      userId: item.userId,
      username: item.username,
      text: item.text,
      sentiment: item.sentiment,
      positiveScore: item.positiveScore,
      neutralScore: item.neutralScore,
      negativeScore: item.negativeScore,
      sentAt: item.sentAt,
    }));

    setMessages(mappedMessages);
  }, [activeChatRoomId, historyMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  const joinChatRoom = async (payload: JoinChatRequest) => {
    try {
      if (connection) {
        await stopChatConnection(connection);
      }

      setMessages([]);
      setActiveChatRoomId(payload.chatRoomId);

      const newConnection = createChatConnection();

      newConnection.on("ReceiveMessage", (message: Message) => {
        setMessages((prev) => [
          ...prev,
          {
            type: "message",
            ...message,
          },
        ]);
      });

      newConnection.on(
        "ReceiveSystemMessage",
        (userName: string, message: string) => {
          setMessages((prev) => [
            ...prev,
            {
              type: "system",
              userName,
              message,
            },
          ]);
        },
      );

      await startChatConnection(newConnection);
      await joinSignalRChat(newConnection, payload);

      setConnection(newConnection);
    } catch (error) {
      console.error("Join chat failed:", error);
    }
  };

  const handleSendMessage = async () => {
    const trimmedMessage = chatInput.trim();

    if (!trimmedMessage || !connection) return;

    await sendSignalRMessage(connection, trimmedMessage);
    setChatInput("");
  };

  const handleChatKeyDown = async (key: string) => {
    if (key !== "Enter") {
      return;
    }

    await handleSendMessage();
  };

  const handleCloseChat = async () => {
    try {
      if (connection) {
        await stopChatConnection(connection);
      }
    } finally {
      setConnection(null);
      setMessages([]);
      setChatInput("");
      setActiveChatRoomId(null);
    }
  };

  const resetMessagesState = () => {
    setMessages([]);
  };

  const resetChatInput = () => {
    setChatInput("");
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        chatInput,
        messageEndRef,
        isMessagesLoading,
        setChatInput,
        handleChatInputChange,
        handleSendMessage,
        handleChatKeyDown,
        handleCloseChat,
        joinChatRoom,
        resetMessagesState,
        resetChatInput,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
