// src/types/chat.ts
import type { Message } from "./schemas/MessageSchema";

export type MessageItem =
  | {
      type: "system";
      userName: string;
      message: string;
    }
  | ({ type: "message" } & Message);

export type JoinChatRequest = {
  userId: string;
  chatRoomId: string;
  userName: string;
  chatName: string;
};
