import {
  createContext,
  useState,
  type ChangeEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetChatsByUser } from "../hooks/api/useGetChatsByUser";
import { usePostChatRoom } from "../hooks/api/usePostChatRoom";
import { useGetChatRoomByName } from "../hooks/api/useGetChatRoomByName";
import type { ChatRoom } from "../schemas/ChatRoomSchema";
import { useAuthContext } from "../hooks/context/useAuthContext";
import { useMessagesContext } from "../hooks/context/useMessageContext";

type SelectedChat = {
  id: string;
  chatName: string;
};

type ChatsContextType = {
  chats: ChatRoom[];
  selectedChat: SelectedChat | null;
  entryChatName: string;
  entryIsSubmitting: boolean;
  setEntryChatName: (value: string) => void;
  handleEntryChatNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleEntrySubmit: (e: SyntheticEvent<HTMLFormElement>) => Promise<void>;
  handleSelectChat: (chat: ChatRoom) => Promise<void>;
  handleOpenEntry: () => void;
  clearChatsState: () => void;
};

type HttpError = Error & {
  status?: number;
};

export const ChatsContext = createContext<ChatsContextType | null>(null);

export function ChatsProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { currentUser } = useAuthContext();
  const { joinChatRoom, resetMessagesState, resetChatInput } =
    useMessagesContext();

  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);
  const [entryChatName, setEntryChatName] = useState("");

  const { data: chats = [] } = useGetChatsByUser(currentUser?.id ?? null);

  const { mutateAsync: createChatRoom, isPending: isCreatingRoom } =
    usePostChatRoom(currentUser?.id ?? "");

  const { mutateAsync: getChatRoomByName, isPending: isSearchingRoom } =
    useGetChatRoomByName();

  const entryIsSubmitting = isCreatingRoom || isSearchingRoom;

  const handleEntryChatNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEntryChatName(e.target.value);
  };

  const resolveChatRoom = async (name: string) => {
    try {
      return await createChatRoom({ chatRoomName: name });
    } catch (error) {
      const httpError = error as HttpError;

      if (httpError.status === 409) {
        return await getChatRoomByName(name);
      }

      throw error;
    }
  };

  const handleEntrySubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) return;

    const trimmedChatRoomName = entryChatName.trim();
    if (!trimmedChatRoomName || entryIsSubmitting) return;

    try {
      const chat = await resolveChatRoom(trimmedChatRoomName);

      resetMessagesState();

      await joinChatRoom({
        userId: currentUser.id,
        chatRoomId: chat.chatRoomId,
        userName: currentUser.userName,
        chatName: chat.chatRoomName,
      });

      await queryClient.invalidateQueries({
        queryKey: ["chatRoomsByUser", currentUser.id],
      });

      setSelectedChat({
        id: chat.chatRoomId,
        chatName: chat.chatRoomName,
      });

      setEntryChatName("");
    } catch (error) {
      console.error("Failed to join chat:", error);
    }
  };

  const handleSelectChat = async (chat: ChatRoom) => {
    if (!currentUser) return;

    try {
      resetMessagesState();

      await joinChatRoom({
        userId: currentUser.id,
        chatRoomId: chat.chatRoomId,
        userName: currentUser.userName,
        chatName: chat.chatRoomName,
      });

      setSelectedChat({
        id: chat.chatRoomId,
        chatName: chat.chatRoomName,
      });

      resetChatInput();
    } catch (error) {
      console.error("Join chat failed:", error);
    }
  };

  const handleOpenEntry = () => {
    setSelectedChat(null);
    setEntryChatName("");
    resetChatInput();
  };

  const clearChatsState = () => {
    setSelectedChat(null);
    setEntryChatName("");
  };

  return (
    <ChatsContext.Provider
      value={{
        chats,
        selectedChat,
        entryChatName,
        entryIsSubmitting,
        setEntryChatName,
        handleEntryChatNameChange,
        handleEntrySubmit,
        handleSelectChat,
        handleOpenEntry,
        clearChatsState,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}
