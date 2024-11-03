import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { MultiSelectField } from "@/components/form/MultiSelectField";
import MuscleGroup from "@/enums/muscleGroup.enum";
import { Exercise } from "@/interfaces/exercise.interface";
import { createExercise } from "@/services/exerciseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  onSuccess?: () => void;
}
//? FUNCION PARA CERRAR EL MODAL

function ExerciseForm({ onSuccess }: Props) {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<Exercise>();

  const createExerciseMutation = useMutation({
    mutationFn: createExercise,
    mutationKey: ["createExercise"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      toast.success("Ejercicio creado correctamente");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Error al crear el ejercicio");
    },
  });

  const onSubmit = handleSubmit((data: Exercise) => {
    createExerciseMutation.mutate(data);
  });

  return (
    <form className="grid gap-4 py-4" onSubmit={onSubmit}>
      <FormField
        name="name"
        label="Nombre"
        control={control}
        rules={{ required: "El nombre es requerido" }}
        placeholder="Press de banca..."
      />

      <FormField
        name="image"
        label="URL de la imagen"
        control={control}
        placeholder="https://..."
      />

      <MultiSelectField
        name="muscleGroups"
        label="Grupos musculares"
        control={control}
        options={Object.values(MuscleGroup)}
        rules={{ required: "Debes seleccionar al menos un grupo muscular" }}
        placeholder="Selecciona grupos musculares"
      />

      <Button type="submit" disabled={createExerciseMutation.isPending}>
        {createExerciseMutation.isPending ? "Creando..." : "Crear ejercicio"}
      </Button>
    </form>
  );
}

export default ExerciseForm;
