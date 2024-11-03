import ExerciseCard from "./components/cards/ExerciseCard";
import { getExercises } from "@/services/exerciseService";
import { useQuery } from "@tanstack/react-query";
import { Exercise } from "@/interfaces/exercise.interface";
import SectionHeader from "@/components/header/SectionHeader";
import { ActionModal } from "@/components/modal/ActionModal";
import ExerciseForm from "./components/ExerciseForm";

export default function ExercisesPage() {
  const { data: exercises } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => getExercises(),
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Ejercicios"
          createButton={
            <ActionModal
              title="Nuevo Ejercicio"
              dialogTitle="Crear Nuevo Ejercicio"
            >
              <ExerciseForm />
            </ActionModal>
          }
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises?.data.map((exercise: Exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </main>
    </div>
  );
}
