import { Client } from "@/interfaces/client.interface";
import api from "@/lib/axios";

export const getClients = async ({ page = 1, limit = 10 }) => {
  const response = await api.get(`/user?page=${page}&limit=${limit}`);

  // Extrae los datos relevantes de la respuesta
  const { formattedUsers, total, totalPages } = response.data;

  // Filtra solo los usuarios con rol "CLIENT"
  const clients = formattedUsers.filter(
    (user: Client) => user.role === "CLIENT"
  );

  // Devuelve un objeto con los datos necesarios
  return {
    clients, // Lista de clientes filtrados
    page, // Página actual
    limit, // Límite de usuarios por página
    total, // Total de usuarios
    totalPages, // Total de páginas
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
