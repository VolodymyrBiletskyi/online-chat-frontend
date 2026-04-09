import { useQuery } from "@tanstack/react-query";
import {
  MessagesSchema,
  type Message,
} from "../../schemas/MessageSchema";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMessagesByChatRoom = (chatRoomId: string | null) => {
  return useQuery<Message[]>({
    queryKey: ["messages", chatRoomId],
    enabled: !!chatRoomId,
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/chats/${chatRoomId}/messages`);

      if (!res.ok) {
        throw new Error("Failed to fetch chat messages");
      }

      const data = await res.json();
      return MessagesSchema.parse(data);
    },
  });
};