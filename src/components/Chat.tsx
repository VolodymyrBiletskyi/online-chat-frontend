import { Message } from "./Message";
import { useChatsContext } from "../hooks/context/useChatContext";
import { useMessagesContext } from "../hooks/context/useMessageContext";

export const Chat = () => {
  const { selectedChat, handleOpenEntry } = useChatsContext();
  const {
    messages,
    chatInput,
    handleChatInputChange,
    handleSendMessage,
    handleChatKeyDown,
    handleCloseChat,
    messageEndRef,
  } = useMessagesContext();

  if (!selectedChat) return null;

  const handleClose = async () => {
    await handleCloseChat();
    handleOpenEntry();
  };

  return (
    <div className="flex h-full w-full max-w-4xl flex-col rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-5 flex justify-between border-b pb-4">
        <h1 className="text-2xl font-bold">{selectedChat.chatName}</h1>

        <button
          onClick={() => void handleClose()}
          className="text-3xl font-bold text-gray-500 transition hover:text-black"
        >
          ×
        </button>
      </div>

      <div className="flex h-96 flex-col gap-3 overflow-auto scroll-smooth pb-3">
        {messages.map((messageInfo, index) => (
          <Message
            messageInfo={messageInfo}
            key={
              messageInfo.type === "system"
                ? `system-${messageInfo.userName}-${index}`
                : messageInfo.messageId
            }
          />
        ))}

        <span ref={messageEndRef} />
      </div>

      <div className="mt-4 flex gap-3 border-t pt-4">
        <input
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          type="text"
          value={chatInput}
          onChange={handleChatInputChange}
          placeholder="Type message"
          onKeyDown={(e) => {
            void handleChatKeyDown(e.key);
          }}
        />

        <button
          type="button"
          className="rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
          onClick={() => void handleSendMessage()}
        >
          Send
        </button>
      </div>
    </div>
  );
};
