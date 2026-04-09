import { z } from "zod";

export const CreateChatRoomSchema = z.object({
  chatRoomName: z.string().min(1, "Chat room name is required"),
});

export const ChatRoomSchema = z.object({
  chatRoomId: z.guid(),
  chatRoomName: z.string(),
  createdAt: z.coerce.date()
});

export const ChatRoomsSchema = z.array(ChatRoomSchema);

export type CreateChatRoomPayload = z.infer<typeof CreateChatRoomSchema>;
export type ChatRoom = z.infer<typeof ChatRoomSchema>;