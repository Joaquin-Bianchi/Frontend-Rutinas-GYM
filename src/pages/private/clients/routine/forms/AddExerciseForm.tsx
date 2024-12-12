import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Exercise } from "@/interfaces/exercise.interface";
import { RoutineExercise } from "@/interfaces/routineExercise.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createRoutineExercises } from "@/services/routineExerciseService";
import { handlerError } from "@/utils/handlerError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Props {
  exercises: Exercise[];
  routineId: string;
  closeModal: () => void;
}

function AddExerciseForm({ exercises, routineId, closeModal }: Props) {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<RoutineExercise>();

  const createRoutineExerciseMutation = useMutation({
    mutationFn: createRoutineExercises,
    mutationKey: ["createRoutineExercise"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client"] });
      toast.success("Ejercicio agregado");
      closeModal();
    },
    onError: (error: any) => {
      handlerError(error);
    },
  });

  const onSubmit = handleSubmit((data: RoutineExercise) => {
    const formattedData = {
      ...data,
      sets: data.sets as any === "" ? (data.sets = NaN) : Number(data.sets),
      reps: data.reps as any === "" ? (data.reps = NaN) : Number(data.reps),
      time: data.time as any === "" ? (data.time = NaN) : Number(data.time),
      routineId,
      exerciseId: data.id,
    };
    
    createRoutineExerciseMutation.mutate(formattedData);
  });

  return (
    <form className="grid grid-cols-3 gap-4 py-4" onSubmit={onSubmit}>
      <div className="col-span-3">
        <Controller
          name="id"
          control={control}
          rules={{ required: "Debes seleccionar un ejercicio" }}
          render={({ field }) => (
            <div className="space-y-2">
              <Label htmlFor="exercise">Ejercicio</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un ejercicio" />
                </SelectTrigger>
                <SelectContent>
                  {exercises.map((exercise) => (
                    <SelectItem key={exercise.id} value={exercise.id}>
                      {exercise.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      <div className="col-span-2 flex items-end space-x-2">
        <div className="flex-1">
          <FormField
            name="sets"
            label="Series"
            control={control}
            placeholder="Series"
            type="number"
          />
        </div>

        <div className="flex items-center justify-center pb-2">
          <span className="text-lg font-bold">x</span>
        </div>

        <div className="flex-1">
          <FormField
            name="reps"
            label="Repeticiones"
            control={control}
            placeholder="Repeticiones"
            type="number"
          />
        </div>
      </div>

      <div className="col-span-1">
        <FormField
          name="time"
          label="Tiempo"
          control={control}
          placeholder="Tiempo"
          type="number"
        />
      </div>

      <div className="col-span-3">
        <FormField
          name="comment"
          label="Comentario"
          control={control}
          placeholder="Comentario"
        />
      </div>

      <div className="col-span-3">
        <Button
          type="submit"
          className="w-full"
          disabled={createRoutineExerciseMutation.isPending}
        >
          {createRoutineExerciseMutation.isPending
            ? "Creando..."
            : "Crear Rutina"}
        </Button>
      </div>
    </form>
  );
}

export default AddExerciseForm;