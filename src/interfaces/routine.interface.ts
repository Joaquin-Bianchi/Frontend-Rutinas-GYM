import { Day } from "@/enums/day.enum";
import { RoutineExercise } from "./routineExercise.interface";

export interface Routine {
  // userId: string;
  name: string;
  day: Day;
  routineExercises: RoutineExercise[];
}
