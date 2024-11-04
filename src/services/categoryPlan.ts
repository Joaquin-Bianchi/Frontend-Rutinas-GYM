import api from "@/lib/axios";

export const getCategoryPlans = async () => {
  const response = await api.get("/categoryPlan");
  return response.data;
};
