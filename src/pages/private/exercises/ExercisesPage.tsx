import { useQuery } from "@tanstack/react-query";
import SectionHeader from "@/components/header/SectionHeader";
import { ActionModal } from "@/components/modal/ActionModal";
import { getExercises } from "@/services/exerciseService";
import CreateExerciseForm from "./components/forms/CreateExerciseForm";
import ExerciseCard from "./components/cards/ExerciseCard";
import ExercisesSkeletonLoader from "@/components/loaders/ExercisesSkeletonLoader";
import ErrorDisplay from "@/components/erros/ErrorDisplay";
import { SearchContext } from "@/context/SearchContext";
import { useContext } from "react";
import { filteExercicesByName } from "@/utils/searchFilters/filterExerciesByName";

export default function ExercisesPage() {
  const {
    data: exercises,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => getExercises(),
  });
  const { searchText } = useContext(SearchContext);

  const filteredExercises = filteExercicesByName(exercises?.data, searchText);
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Ejercicios"
          createButton={
            <ActionModal
              title="Nuevo Ejercicio"
              dialogTitle="Crear Nuevo Ejercicio"
              showIcon={true}
            >
              {(closeModal) => <CreateExerciseForm closeModal={closeModal} />}
            </ActionModal>
          }
        />
        {isLoading ? (
          <ExercisesSkeletonLoader />
        ) : isError ? (
          <div className="space-y-4">
            <ErrorDisplay message={error.message} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredExercises?.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
