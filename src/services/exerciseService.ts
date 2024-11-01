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
