import MuscleGroup from "@/enums/muscleGroup.enum";
import api from "@/lib/axios";

interface Exercise {
  name: string;
  image?: string;
  muscleGroups: MuscleGroup[];
}

export const getExercises = async () => {
  const response = await api.get("/exercise");
  console.log(response);
  return response;
};

export const createExercise = async (exercise: Exercise) => {
  const response = await api.post("/exercise", exercise);
  console.log(response);
  return response;
};

export const editExercise = async ({
  exerciseId,
  data,
}: {
  exerciseId: string;
  data: Exercise;
}) => {

  const response = await api.put(`/exercise/${exerciseId}`, data);
  return response;
};

export const deleteExerciseById = async (exerciseId: string) => {
  const response = await api.delete(`/exercise/${exerciseId}`);
  console.log(response);
  return response;
};
