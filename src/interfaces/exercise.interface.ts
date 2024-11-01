import MuscleGroup from "@/enums/muscleGroup.enum";

export interface Exercise {
  id: string;
  name: string;
  image: string;
  muscleGroups: MuscleGroup[];
}
