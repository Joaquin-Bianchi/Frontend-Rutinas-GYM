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
import { uploadImage } from "@/services/uploadImageService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  closeModal: () => void;
}

function CreateExerciseForm({ closeModal }: Props) {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<Exercise>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const createExerciseMutation = useMutation({
    mutationFn: createExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
    onError: (error) => {
      handlerError(error);
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["image"] });
    },
    onError: (error) => {
      handlerError(error);
    },
  });

  const onSubmit = handleSubmit(async (data: Exercise) => {
    setIsLoading(true);

    try {
      let imageUrl = "";

      if (selectedFile) {
        const uploadResponse = await uploadImageMutation.mutateAsync(
          selectedFile
        );
        imageUrl = uploadResponse;
      }

      await createExerciseMutation.mutateAsync({
        ...data,
        image: imageUrl || undefined,
      });

      toast.success("Ejercicio creado");
      closeModal();
    } catch (error) {
      handlerError(error);
    } finally {
      setIsLoading(false);
    }
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

      <div className="form-field">
        <Label className="label">Subir imagen</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedFile(e.target.files[0]);
            }
          }}
        />
      </div>

      <MultiSelectField
        name="muscleGroups"
        label="Grupos musculares"
        control={control}
        options={Object.values(MuscleGroup)}
        rules={{ required: "Debes seleccionar al menos un grupo muscular" }}
        placeholder="Grupos musculares"
      />

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creando..." : "Crear ejercicio"}
      </Button>
    </form>
  );
}

export default CreateExerciseForm;
