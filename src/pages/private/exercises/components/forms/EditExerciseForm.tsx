import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { MultiSelectField } from "@/components/form/MultiSelectField";
import MuscleGroup from "@/enums/muscleGroup.enum";
import { Exercise } from "@/interfaces/exercise.interface";
import { editExercise } from "@/services/exerciseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  exercise: Exercise;
}

function EditExerciseForm({ exercise }: Props) {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<Exercise>({
    defaultValues: {
      name: exercise.name,
      image: exercise.image,
      muscleGroups: exercise.muscleGroups,
    },
  });

  const editExerciseMutation = useMutation({
    mutationFn: editExercise,
    mutationKey: ["editExercise"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      toast.success("Ejercicio editado correctamente");
    },
    onError: (error) => {
      console.error("Error al editar el ejercicio:", error);
      toast.error(error.message || "Error al editar el ejercicio");
    },
  });

  const onSubmit = handleSubmit((data: Exercise) => {
    editExerciseMutation.mutate({ exerciseId: exercise.id, data });
  });

  return (
    <form className="grid gap-4 py-4" onSubmit={onSubmit}>
      <FormField
        name="name"
        label="Nombre"
        control={control}
        rules={{ required: "El nombre es requerido" }}
        placeholder={exercise.name}
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

      <Button type="submit" disabled={editExerciseMutation.isPending}>
        {editExerciseMutation.isPending ? "Editando..." : "Editar ejercicio"}
      </Button>
    </form>
  );
}

export default EditExerciseForm;
