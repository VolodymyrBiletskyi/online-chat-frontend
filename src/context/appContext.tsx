import { createContext, type ReactNode } from "react";
import { useAuthContext } from "../hooks/context/useAuthContext";
import { useChatsContext } from "../hooks/context/useChatContext";
import { useMessagesContext } from "../hooks/context/useMessageContext";

type AppContextType = {
  handleLogout: () => Promise<void>;
};

export const AppContext = createContext<AppContextType | null>(null);

export function AppActionsProvider({ children }: { children: ReactNode }) {
  const { logoutUser } = useAuthContext();
  const { clearChatsState } = useChatsContext();
  const { handleCloseChat, resetChatInput } = useMessagesContext();

  const handleLogout = async () => {
    await handleCloseChat();
    clearChatsState();
    resetChatInput();
    logoutUser();
  };

  return (
    <AppContext.Provider value={{ handleLogout }}>
      {children}
    </AppContext.Provider>
  );
}
