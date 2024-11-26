import { RoutineExercise } from "@/interfaces/routineExercise.interface";
import api from "@/lib/axios";

export const createRoutineExercises = async (data: RoutineExercise) => {
  const response = await api.post("/routine", data);
  return response.data;
};

export const deleteRoutinExercise = async (id: string) => {
    const response = await api.delete(`/routine/${id}`)
    return response
}