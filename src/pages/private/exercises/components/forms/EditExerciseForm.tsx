import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { MultiSelectField } from "@/components/form/MultiSelectField";
import MuscleGroup from "@/enums/muscleGroup.enum";
import { Exercise } from "@/interfaces/exercise.interface";
import { editExercise } from "@/services/exerciseService";
import { uploadImage } from "@/services/uploadImageService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { handlerError } from "@/utils/handlerError";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  exercise: Exercise;
  closeModal: () => void;
}

function EditExerciseForm({ exercise, closeModal }: Props) {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<Exercise>({
    defaultValues: {
      name: exercise.name,
      image: exercise.image,
      muscleGroups: exercise.muscleGroups,
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    exercise.image || null
  );
  const [isLoading, setIsLoading] = useState(false);

  const editExerciseMutation = useMutation({
    mutationFn: editExercise,
    mutationKey: ["editExercise"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      toast.success("Ejercicio editado");
      closeModal();
    },
    onError: (error: any) => {
      handlerError(error);
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      handlerError(error);
    },
  });

  const onSubmit = handleSubmit(async (data: Exercise) => {
    setIsLoading(true);

    try {
      let imageUrl = exercise.image;

      if (selectedFile) {
        const uploadResponse = await uploadImageMutation.mutateAsync(
          selectedFile
        );
        imageUrl = uploadResponse;
      }

      await editExerciseMutation.mutateAsync({
        exerciseId: exercise.id,
        data: { ...data, image: imageUrl },
      });
    } catch (error) {
      handlerError(error);
    } finally {
      setIsLoading(false);
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <form className="grid gap-4 py-4" onSubmit={onSubmit}>
      <FormField
        name="name"
        label="Nombre"
        control={control}
        rules={{ required: "El nombre es requerido" }}
        placeholder="Nombre del ejercicio"
      />

      <div className="form-field">
        <Label className="label">Imagen actual</Label>
        {previewImage && (
          <img
            src={previewImage}
            alt="Vista previa de la imagen"
            className="w-32 h-32 object-cover rounded"
          />
        )}
      </div>

      <div className="form-field">
        <Label className="label">Actualizar imagen</Label>
        <Input type="file" accept="image/*" onChange={handleFileChange} />
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
        {isLoading ? "Editando..." : "Editar ejercicio"}
      </Button>
    </form>
  );
}

export default EditExerciseForm;
