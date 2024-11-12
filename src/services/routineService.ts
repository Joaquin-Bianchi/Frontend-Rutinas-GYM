import api from "@/lib/axios";

export const getRoutineById = async (routineId: string) => {
  const response = await api.get(`/routine/${routineId}`);
  console.log(response);
  return response.data;
};
