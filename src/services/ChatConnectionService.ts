import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import type { JoinChatRequest } from "../schemas/JoinChatSchema";

const SIGNALR_URL = import.meta.env.VITE_SIGNALR_URL;

export const createChatConnection = () => {
  if (!SIGNALR_URL) {
    throw new Error("VITE_SIGNALR_URL is not defined");
  }

  return new HubConnectionBuilder()
    .withUrl(SIGNALR_URL)
    .withAutomaticReconnect()
    .build();
};

export const startChatConnection = async (connection: HubConnection) => {
  await connection.start();
};

export const stopChatConnection = async (connection: HubConnection) => {
  await connection.stop();
};

export const joinSignalRChat = async (
  connection: HubConnection,
  payload: JoinChatRequest,
) => {
  await connection.invoke("JoinChat", payload);
};

export const sendSignalRMessage = async (
  connection: HubConnection,
  message: string,
) => {
  await connection.invoke("SendMessage", message);
};