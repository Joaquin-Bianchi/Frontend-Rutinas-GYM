import MuscleGroup from "@/enums/muscleGroup.enum";
import api from "@/lib/axios";

interface Exercise {
  name: string;
  image?: string;
  muscleGroups: MuscleGroup[];
}

export const getExercisesPagination = async ({ page = 1, limit = 1 }) => {
  const url =
    limit === 0 ? `/exercise` : `/exercise?page=${page}&limit=${limit}`;
  const response = await api.get(url);
  return response.data;
};

export const createExercise = async (exercise: Exercise) => {
  const response = await api.post("/exercise", exercise);
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
  return response;
};
