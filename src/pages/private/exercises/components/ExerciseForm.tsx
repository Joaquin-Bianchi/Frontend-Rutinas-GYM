import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multipleSelector";
import MuscleGroup from "@/enums/muscleGroup.enum";
import { Exercise } from "@/interfaces/exercise.interface";
import { createExercise } from "@/services/exerciseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  onSuccess?: () => void;
}

function ExerciseForm({ onSuccess }: Props) {
  const queryClient = useQueryClient();
  const { 
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Exercise>();

  const createExerciseMutation = useMutation({
    mutationFn: createExercise,
    mutationKey: ["createExercise"],
    onSuccess: () => {
      // Revalida la data de ejercicios
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      toast.success("Ejercicio creado correctamente");
    },
    onError: (error) => {
      toast.error(error.message || "Error al crear el ejercicio");
    },
  });

  const onSubmit = handleSubmit((data: Exercise) => {
    console.log(data);
    createExerciseMutation.mutate(data);
    onSuccess?.();
  });

  return (
    <form className="grid gap-4 py-4" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Controller
          name="name"
          control={control}
          rules={{ required: "El nombre es requerido" }}
          render={({ field }) => (
            <Input id="name" placeholder="Press de banca..." {...field} />
          )}
        />
        {errors.name && (
          <span className="text-sm text-red-500">{errors.name.message}</span>
        )}
      </div>
      {/* //todo: agregar imagen */}
      <div className="grid gap-2">
        <Label htmlFor="image">URL de la imagen</Label>
        <Input id="image" placeholder="https://..." />
      </div>
      <div className="grid gap-2">
        <Label>Grupos musculares</Label>
        <Controller
          name="muscleGroups"
          control={control}
          rules={{ required: "Debes seleccionar al menos un grupo muscular" }}
          render={({ field: { onChange, value } }) => (
            <MultiSelector values={value || []} onValuesChange={onChange} loop>
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Selecciona grupos musculares" />
              </MultiSelectorTrigger>

              <MultiSelectorContent>
                <MultiSelectorList className="capitalize">
                  {Object.values(MuscleGroup).map((muscleGroup) => (
                    <MultiSelectorItem key={muscleGroup} value={muscleGroup}>
                      {muscleGroup}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          )}
        />
        {errors.muscleGroups && (
          <span className="text-sm text-red-500">
            {errors.muscleGroups.message}
          </span>
        )}
      </div>
      <Button type="submit" disabled={createExerciseMutation.isPending}>
        {createExerciseMutation.isPending ? "Creando..." : "Crear ejercicio"}
      </Button>
    </form>
  );
}

export default ExerciseForm;
