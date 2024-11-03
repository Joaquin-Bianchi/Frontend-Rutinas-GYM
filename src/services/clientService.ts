import api from "@/lib/axios";

export const getClients = async () => {
  const response = await api.get("/clients");
  return response.data;
};
