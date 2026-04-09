import { useMutation } from "@tanstack/react-query";
import {
  LoginUserSchema,
  UserSchema,
  type LoginUserPayload,
  type User,
} from "../../schemas/UserSchema";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usePostLoginUser = () => {
  return useMutation<User, Error, LoginUserPayload>({
    mutationKey: ["loginUser"],
    mutationFn: async (payload) => {
      const validBody = LoginUserSchema.parse(payload);

      const res = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validBody),
      });

      if (!res.ok) {
        throw new Error("Failed to login user");
      }

      const data = await res.json();
      return UserSchema.parse(data);
    },
  });
};