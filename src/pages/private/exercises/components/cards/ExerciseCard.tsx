import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Exercise } from "@/interfaces/exercise.interface";
import { ActionModal } from "@/components/modal/ActionModal";
import EditExerciseForm from "../forms/EditExerciseForm";
import ButtonDelete from "@/components/buttons/ButtonDelete";
import { deleteExerciseById } from "@/services/exerciseService";

interface Props {
  exercise: Exercise;
}

function ExerciseCard({ exercise }: Props) {
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
                className="bg-primary px-2 p-0.5 text-white font-semibold capitalize rounded-md"
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
            <ActionModal title="Editar" dialogTitle="Editar Ejercicio">
              <EditExerciseForm exercise={exercise} />
            </ActionModal>
            <ButtonDelete
              id={exercise.id}
              deleteFn={deleteExerciseById}
              nameMutationKey="deleteExercise"
              nameQueryKey="exercises"
              textObjectDelete="Ejercicio"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ExerciseCard;
