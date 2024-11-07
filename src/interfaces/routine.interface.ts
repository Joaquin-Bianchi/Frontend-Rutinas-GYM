import { Day } from "@/enums/day.enum";
import { RoutineExercise } from "./routineExercise.interface";

export interface Routine {
  id: string;
  userId: string;
  day: Day;
  routineExercises: RoutineExercise[];
}
