import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Exercise } from "@/interfaces/exercise.interface";
import { ActionModal } from "@/components/modal/ActionModal";
import EditExerciseForm from "../forms/EditExerciseForm";
import ButtonDelete from "@/components/buttons/ButtonDelete";
import { deleteExerciseById } from "@/services/exerciseService";

interface Props {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: Props) {
  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col">
      <CardHeader className="p-0 px-6 pt-6 pb-4 space-y-0">
        <CardTitle className="text-xl">
          {exercise.name.charAt(0).toLocaleUpperCase() + exercise.name.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div className="text-sm flex gap-2">
            {exercise.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="bg-sky-200/10 text-sky-500 text-xs font-semibold px-2 py-1 rounded-md capitalize"
              >
                {muscle}
              </span>
            ))}
          </div>
          <div className="rounded-md overflow-hidden h-[300px]">
            <img
              src={
                exercise.image ||
                "https://res.cloudinary.com/djdcj4v1j/image/upload/v1733853813/ejercicios/no-imagen_jjzdgf.jpg"
              }
              alt={exercise.name}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <ActionModal title="Editar" dialogTitle="Editar Ejercicio">
            {(closeModal) => (
              <EditExerciseForm exercise={exercise} closeModal={closeModal} />
            )}
          </ActionModal>
          <ButtonDelete
            id={exercise.id}
            deleteFn={deleteExerciseById}
            nameMutationKey="deleteExercise"
            nameQueryKey="exercises"
            textObjectDelete="Ejercicio"
          />
        </div>
      </CardContent>
    </Card>
  );
}
