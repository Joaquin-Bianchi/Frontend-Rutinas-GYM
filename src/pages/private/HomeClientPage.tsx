import { Calendar, Dumbbell } from "lucide-react";
import { ClientNavbar } from "@/components/navigation/ClientNavbar";
import { getClientById } from "@/services/clientService";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@/interfaces/client.interface";
import { isAuthenticated } from "@/services/authService";
import ErrorDisplay from "@/components/erros/ErrorDisplay";
import { HomeClientSkeletonLoader } from "@/components/loaders/HomeClientSkeletonLoader";

export default function HomeClientPage() {
  const { userId } = isAuthenticated();

  const {
    data: client,
    isLoading,
    isError,
    error,
  } = useQuery<Client>({
    queryKey: ["client"],
    queryFn: () => getClientById(userId as string),
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 text-foreground">
      <ClientNavbar />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <HomeClientSkeletonLoader />
        ) : isError ? (
          <div className="space-y-4">
            <ErrorDisplay message={error.message} />
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-xl md:text-4xl font-bold mb-2">
                Bienvenido/a {client?.name} 👋
              </h1>
              <p className="mx-2 sm:mx-0 text-sm md:text-xl text-muted-foreground">
                Aquí están tus rutinas asignadas por tu profesor.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {client?.routines?.map(
                (routine) =>
                  routine.routineExercises.length > 0 && (
                    <div
                      key={routine.day}
                      className="bg-card/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="bg-primary/10 p-4">
                        <h2 className="flex items-center text-xl font-semibold">
                          <Calendar className="h-5 w-5 mr-2 text-primary" />
                          <span className="capitalize">{routine.day}</span>
                        </h2>
                      </div>
                      <div className="p-4">
                        {routine.routineExercises.map(
                          (routineExercise, index) => (
                            <>
                              <div key={index} className="mb-5 last:mb-0">
                                <div className="flex items-center mb-2">
                                  <Dumbbell className="h-4 w-4 mr-2 text-primary" />
                                  <h3 className="font-medium text-lg">
                                    {routineExercise.exercise.name}
                                  </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                                  <img
                                    src={
                                      routineExercise.exercise.image ||
                                      "https://app-media.fitbod.me/v2/102/images/landscape/0_960x540.jpg"
                                    }
                                    alt={routineExercise.exercise.name}
                                    className="w-full h-32 object-cover rounded-md shadow-sm"
                                  />
                                  <div>
                                    {routineExercise.sets && (
                                      <p className="text-muted-foreground">
                                        Series:{" "}
                                        <span className="font-semibold text-foreground">
                                          {routineExercise.sets}
                                        </span>
                                      </p>
                                    )}
                                    {routineExercise.reps && (
                                      <p className="text-muted-foreground">
                                        Repeticiones:{" "}
                                        <span className="font-semibold text-foreground">
                                          {routineExercise.reps}
                                        </span>
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {routineExercise.comment && (
                                  <p className="text-sm text-primary-foreground bg-primary/20 p-2 rounded-md mt-2 text-gray-100">
                                    <span className="font-medium text-white">Nota:</span>{" "}
                                    {routineExercise.comment}
                                  </p>
                                )}
                              </div>
                              <span className="flex h-[2px] rounded-full bg-zinc-900 mb-4"></span>
                            </>
                          )
                        )}
                      </div>
                    </div>
                  )
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
