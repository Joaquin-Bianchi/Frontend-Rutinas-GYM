import { CreateExerciseModal } from "./components/modal/CreateExerciseModal";
import ExerciseCard from "./components/cards/ExerciseCard";
import { getExercises } from "@/services/exerciseService";
import { useQuery } from "@tanstack/react-query";
import { Exercise } from "@/interfaces/exercise.interface";
import SearchInput from "@/components/search/SearchInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExercisesPage() {
  const { data: exercises } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => getExercises(),
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* TODO: Crear title component */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-primary">Ejercicios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <SearchInput />
                <CreateExerciseModal />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises?.data.map((exercise: Exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </main>
    </div>
  );
}
