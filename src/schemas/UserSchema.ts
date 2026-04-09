import { z } from "zod";

export const CreateUserSchema = z.object({
  userName: z.string().min(1, "Username is required"),
});

export const LoginUserSchema = z.object({
  userName: z.string().min(1, "Username is required"),
});

export const UserSchema = z.object({
  userId: z.guid(),
  username: z.string(),
  createdAt: z.coerce.date()
});

export type CreateUserPayload = z.infer<typeof CreateUserSchema>;
export type LoginUserPayload = z.infer<typeof LoginUserSchema>;
export type User = z.infer<typeof UserSchema>;