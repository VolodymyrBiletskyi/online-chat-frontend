import { useQuery } from "@tanstack/react-query";
import {
  ChatRoomsSchema,
  type ChatRoom,
} from "../../schemas/ChatRoomSchema";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetChatsByUser = (userId: string | null) => {
  return useQuery<ChatRoom[]>({
    queryKey: ["chatRoomsByUser", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/chatRooms/${userId}`);

      if (!res.ok) {
        throw new Error("Failed to fetch user chat rooms");
      }

      const data = await res.json();
      return ChatRoomsSchema.parse(data);
    },
  });
};