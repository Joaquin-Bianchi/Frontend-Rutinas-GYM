import api from "@/lib/axios";

export const getClients = async () => {
  const response = await api.get("/user");
  return response.data;
};
