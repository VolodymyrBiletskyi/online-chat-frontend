import type { ReactNode } from "react";
import { AuthProvider } from "./authContext";
import { MessagesProvider } from "./messageContext";
import { ChatsProvider } from "./chatContext";
import { AppActionsProvider } from "./appContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <MessagesProvider>
        <ChatsProvider>
          <AppActionsProvider>{children}</AppActionsProvider>
        </ChatsProvider>
      </MessagesProvider>
    </AuthProvider>
  );
}
