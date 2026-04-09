import { useMutation } from "@tanstack/react-query";
import {
  CreateUserSchema,
  UserSchema,
  type CreateUserPayload,
  type User,
} from "../../schemas/UserSchema";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usePostUser = () => {
  return useMutation<User, Error, CreateUserPayload>({
    mutationKey: ["createUser"],
    mutationFn: async (payload) => {
      const validBody = CreateUserSchema.parse(payload);

      const res = await fetch(`${API_BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validBody),
      });

      if (!res.ok) {
        throw new Error("Failed to create user");
      }

      const data = await res.json();
      return UserSchema.parse(data);
    },
  });
};