import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ChatRoomSchema,
  type ChatRoom,
} from "../../schemas/ChatRoomSchema";;

type CreateChatRoomPayload = {
  chatRoomName: string;
};

type HttpError = Error & {
  status?: number;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const usePostChatRoom = (userId?: string | null) => {
  const queryClient = useQueryClient();

  return useMutation<ChatRoom, HttpError, CreateChatRoomPayload>({
    mutationFn: async ({ chatRoomName }) => {
      const res = await fetch(`${API_BASE_URL}/chatRooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatRoomName }),
      });

      if (!res.ok) {
        const error = new Error("Failed to create chat room") as HttpError;
        error.status = res.status;
        throw error;
      }

      const data = await res.json();
      return ChatRoomSchema.parse(data);
    },
    onSuccess: async () => {
      if (userId) {
        await queryClient.invalidateQueries({
          queryKey: ["chatRoomsByUser", userId],
        });
      }
    },
  });
};