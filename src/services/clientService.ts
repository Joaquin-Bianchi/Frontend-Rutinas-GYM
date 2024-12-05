import { Client } from "@/interfaces/client.interface";
import api from "@/lib/axios";

export const getClients = async ({ page = 1, limit = 10 }) => {
  const response = await api.get(`/user?page=${page}&limit=${limit}`);

  const { formattedUsers, total, totalPages } = response.data;

  const clients = formattedUsers.filter(
    (user: Client) => user.role === "CLIENT"
  );

  return {
    clients,
    page,
    limit,
    total,
    totalPages,
  };
};

export const createClient = async (client: Client) => {
  try {
    const response = await api.post("/auth/register", client);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const editClient = async (client: Client) => {
  const response = await api.put(`/user/${client.id}`, client);
  return response.data;
};

export const deleteClientById = async (clientId: string) => {
  const response = await api.delete(`/user/${clientId}`);
  return response;
};

export const getClientById = async (clientId: string) => {
  const response = await api.get(`/user/${clientId}`);
  return response.data;
};
