import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Exercise } from "@/interfaces/exercise.interface";
import { deleteExerciseById } from "@/services/exerciseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ActionModal } from "@/components/modal/ActionModal";
import EditExerciseForm from "../forms/EditExerciseForm";

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const queryClient = useQueryClient();

  const deleteExerciseMutation = useMutation({
    mutationFn: deleteExerciseById,
    mutationKey: ["deleteExercise"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      toast.success("Ejercicio eliminado correctamente");
    },
    onError: (error) => {
      toast.error(error.message || "Error al eliminar el ejercicio");
    },
  });

  const handleDelete = () => {
    deleteExerciseMutation.mutate(exercise.id);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col ">
      <CardHeader>
        <CardTitle className="text-xl capitalize">{exercise.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground flex gap-2">
            {exercise.muscleGroups.map((muscle) => (
              <span
                className="bg-primary px-2 p-0.5 text-secondary font-semibold capitalize rounded-md"
                key={muscle}
              >
                {muscle}{" "}
              </span>
            ))}
          </div>
          <img
            src={
              exercise.image ||
              "https://app-media.fitbod.me/v2/102/images/landscape/0_960x540.jpg"
            }
            alt={exercise.name}
            className="rounded-md"
          />
          <div className="flex gap-2 mb-10">
            {/* <Button variant="outline" size="sm">
              Editar
            </Button> */}
            <ActionModal title="Editar" dialogTitle="Editar Ejercicio">
              <EditExerciseForm exercise={exercise}/>
            </ActionModal>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={deleteExerciseMutation.isPending}
            >
              {deleteExerciseMutation.isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ExerciseCard;
