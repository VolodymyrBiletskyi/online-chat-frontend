import { useContext } from "react";
import { MessagesContext } from "../../context/messageContext";

export function useMessagesContext() {
  const context = useContext(MessagesContext);

  if (!context) {
    throw new Error("useMessagesContext must be used within MessagesProvider");
  }

  return context;
}
