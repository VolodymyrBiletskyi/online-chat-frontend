import { z } from "zod";

export const JoinChatSchema = z.object({
  userId: z.guid(),
  chatRoomId: z.guid(),
  userName: z.string().min(1),
  chatName: z.string().min(1),
});

export type JoinChatRequest = z.infer<typeof JoinChatSchema>;