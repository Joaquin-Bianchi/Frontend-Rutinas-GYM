import { Exercise } from "./exercise.interface";

export interface RoutineExercise {
  exercise: Exercise;
  id: string;
  exerciseId: string;
  routineId: string;
  sets?: number;
  reps?: number;
  time?: number;
  comment?: string;
}
