import { Client } from "@/interfaces/client.interface";
import api from "@/lib/axios";

export const getClients = async () => {
  const response = await api.get("/user");
  const clients = response.data.filter(
    (user: Client) => user.role === "CLIENT"
  );
  return clients;
};

export const createClient = async (client: Client) => {
  console.log(client);
  const response = await api.post("/auth/register", client);
  console.log(response);
  return response.data;
};

export const deleteClientById = async (clientId: string) => {
  const response = await api.delete(`/user/${clientId}`);
  console.log(response);
  return response;
};
