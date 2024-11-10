export interface RoutineExercise {
  id: string;
  exerciseId: string;
  routineId: string;
  sets?: number;
  reps?: number;
  time?: number;
  comment?: string;
}
