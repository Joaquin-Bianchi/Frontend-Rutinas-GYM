import { CategoryPlan } from "@/interfaces/categotyPlan.interface";
import api from "@/lib/axios";

export const getCategoryPlans = async () => {
  const response = await api.get("/categoryPlan");
  return response.data;
};

export const createCategoryPlan = async (data: CategoryPlan) => {
  const response = await api.post("/categoryPlan", data);
  return response.data;
};

export const editCategoryPlan = async (data: CategoryPlan) => {
  const response = await api.put("/categoryPlan", data);
  return response.data;
};

export const deleteCategoryPlan = async (id: string) => {
  const response = await api.delete(`/categoryPlan/${id}`);
  return response.data;
};
