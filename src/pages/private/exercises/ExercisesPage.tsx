import { useQuery } from "@tanstack/react-query";
import SectionHeader from "@/components/header/SectionHeader";
import { ActionModal } from "@/components/modal/ActionModal";
import { getExercises } from "@/services/exerciseService";
import CreateExerciseForm from "./components/forms/CreateExerciseForm";
import ExerciseCard from "./components/cards/ExerciseCard";
import ExercisesSkeletonLoader from "@/components/loaders/ExercisesSkeletonLoader";
import ErrorDisplay from "@/components/erros/ErrorDisplay";
import { SearchContext } from "@/context/SearchContext";
import { useContext, useState } from "react";
import { filteExercicesByName } from "@/utils/searchFilters/filterExerciesByName";
import { Button } from "@/components/ui/button";

export default function ExercisesPage() {
  const [page, setPage] = useState(1);
  const limit = 12;

  const {
    data: exercises,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["exercises", page],
    queryFn: () => getExercises({ page, limit }),
  });
  const { searchText } = useContext(SearchContext);

  console.log(exercises);

  const filteredExercises = filteExercicesByName(
    exercises?.exercises || [],
    searchText
  );

  const totalPages = exercises ? Math.ceil(exercises.total / limit) : 0;

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
          <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pb-5">
              {filteredExercises?.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
            <div className="pagination flex items-center justify-center gap-5 mt-4">
              <Button
                size={"sm"}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`btn ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Anterior
              </Button>
              <span>
                Página {page} de {totalPages}
              </span>
              <Button
                size={"sm"}
                onClick={() =>
                  setPage((prev) => (prev < totalPages ? prev + 1 : prev))
                }
                disabled={page === totalPages}
                className={`btn ${
                  page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
