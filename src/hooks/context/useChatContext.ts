import { useContext } from "react";
import { ChatsContext } from "../../context/chatContext";

export function useChatsContext() {
  const context = useContext(ChatsContext);

  if (!context) {
    throw new Error("useChatsContext must be used within ChatsProvider");
  }

  return context;
}
