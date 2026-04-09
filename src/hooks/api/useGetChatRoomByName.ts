import { useMutation } from "@tanstack/react-query";
import {
  ChatRoomSchema,
  type ChatRoom,
} from "../../schemas/ChatRoomSchema";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetChatRoomByName = () => {
  return useMutation<ChatRoom, Error, string>({
    mutationFn: async (chatRoomName: string) => {
      const res = await fetch(
        `${API_BASE_URL}/chatRooms/by-name/${encodeURIComponent(chatRoomName)}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch chat room by name");
      }

      const data = await res.json();
      return ChatRoomSchema.parse(data);
    },
  });
};