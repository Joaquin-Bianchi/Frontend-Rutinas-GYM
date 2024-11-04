import { Client } from "@/interfaces/client.interface";
import api from "@/lib/axios";

export const getClients = async () => {
  const response = await api.get("/user");
  return response.data;
};

export const createClient = async (client: Client) => {
  const response = await api.post("/user", client);
  console.log(response);
  return response.data;
};
export const deleteClientById = async (clientId: string) => {
  const response = await api.delete(`/user/${clientId}`);
  console.log(response);
  return response;
};
