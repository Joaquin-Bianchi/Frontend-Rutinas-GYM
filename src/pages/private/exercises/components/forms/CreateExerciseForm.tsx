import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { MultiSelectField } from "@/components/form/MultiSelectField";
import MuscleGroup from "@/enums/muscleGroup.enum";
import { Exercise } from "@/interfaces/exercise.interface";
import { createExercise } from "@/services/exerciseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { handlerError } from "@/utils/handlerError";

interface Props {
  closeModal: () => void;
}

function CreateExerciseForm({ closeModal }: Props) {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<Exercise>();

  const createExerciseMutation = useMutation({
    mutationFn: createExercise,
    mutationKey: ["createExercise"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      toast.success("Ejercicio creado");
      closeModal();
    },
    onError: (error) => {
      handlerError(error);
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
        placeholder="Nombre"
      />

      <FormField
        name="image"
        label="URL de la imagen"
        control={control}
        placeholder="Imagen"
      />

      <MultiSelectField
        name="muscleGroups"
        label="Grupos musculares"
        control={control}
        options={Object.values(MuscleGroup)}
        rules={{ required: "Debes seleccionar al menos un grupo muscular" }}
        placeholder="Grupos musculares"
      />

      <Button type="submit" disabled={createExerciseMutation.isPending}>
        {createExerciseMutation.isPending ? "Creando..." : "Crear ejercicio"}
      </Button>
    </form>
  );
}

export default CreateExerciseForm;
