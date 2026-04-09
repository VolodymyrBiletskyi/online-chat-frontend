import { EntryRoom } from "./components/EntryRoom";
import { Chat } from "./components/Chat";
import { Sidebar } from "./components/SideBar";
import { EnterUser } from "./components/EnterUser";
import { useAuthContext } from "./hooks/context/useAuthContext";
import { useChatsContext } from "./hooks/context/useChatContext";

function App() {
  const { currentUser } = useAuthContext();
  const { selectedChat } = useChatsContext();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {currentUser && (
        <aside className="w-72 border-r bg-white p-4">
          <Sidebar />
        </aside>
      )}

      <main className="flex flex-1 items-center justify-center p-6">
        {!currentUser ? (
          <EnterUser />
        ) : !selectedChat ? (
          <EntryRoom />
        ) : (
          <Chat />
        )}
      </main>
    </div>
  );
}

export default App;
