import { useAuthContext } from "../hooks/context/useAuthContext";
import { useChatsContext } from "../hooks/context/useChatContext";
import { useAppContext } from "../hooks/context/useAppContext";

export const Sidebar = () => {
  const { currentUser } = useAuthContext();
  const { chats, selectedChat, handleSelectChat, handleOpenEntry } =
    useChatsContext();
  const { handleLogout } = useAppContext();

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Chats</h2>

        <button
          onClick={() => void handleLogout()}
          className="rounded-lg bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <button
        onClick={handleOpenEntry}
        className="mb-4 rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600"
      >
        Create / Join chat
      </button>

      <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
        {!currentUser || chats.length === 0 ? (
          <p className="text-sm text-gray-400">No chats yet</p>
        ) : (
          chats.map((chat) => {
            const isActive = selectedChat?.id === chat.chatRoomId;

            return (
              <button
                key={chat.chatRoomId}
                onClick={() => {
                  void handleSelectChat(chat);
                }}
                className={`rounded-xl px-4 py-3 text-left transition ${
                  isActive
                    ? "bg-blue-100 font-semibold text-blue-700"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <span className="block truncate">{chat.chatRoomName}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
