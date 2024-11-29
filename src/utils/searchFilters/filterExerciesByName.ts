import { Exercise } from "@/interfaces/exercise.interface";

export const filteExercicesByName = (
  exercices: Exercise[],
  searchText: string
) => {
  return !exercices
    ? []
    : exercices.filter((exercice) =>
        exercice.name.toLowerCase().includes(searchText.toLowerCase())
      );
};
