import { RoutineExercise } from "@/interfaces/routineExercise.interface";
import api from "@/lib/axios";

export const createRoutineExercises = async (data: RoutineExercise) => {
  const { routineId } = data;

  console.log("DATA ENVIADA DESDE EL FRONT: ", data);

  const response = await api.put(`/routine/${routineId}`, data);
  console.log(response);
  return response;
};
