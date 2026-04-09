import { z } from "zod";

export const MessageSchema = z.object({
  messageId: z.guid(),
  userId: z.guid(),
  chatRoomId: z.guid(),
  username: z.string(),
  text: z.string(),
  sentiment: z.string().nullable().optional(),
  positiveScore: z.number().nullable().optional(),
  neutralScore: z.number().nullable().optional(),
  negativeScore: z.number().nullable().optional(),
  sentAt: z.coerce.date()
});

export const MessagesSchema = z.array(MessageSchema);

export type Message = z.infer<typeof MessageSchema>;