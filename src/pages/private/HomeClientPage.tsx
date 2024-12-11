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
            <div className="text-center mb-6 sm:mb-14 sm:mt-6">
              <h1 className="text-xl w-[90%] m-auto md:text-4xl font-bold mb-2">
                Bienvenido/a a tu perfil online {client?.name} 👋
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
                      className="bg-card/30 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg"
                    >
                      <div className="bg-white/95 p-4 text-black">
                        <h2 className="flex items-center text-xl font-semibold">
                          <Calendar className="h-5 w-5 mr-2" />
                          <span className="capitalize">
                            {routine.day === "miercoles"
                              ? "Miércoles"
                              : routine.day === "sabado"
                              ? "Sábado"
                              : routine.day}
                          </span>
                        </h2>
                      </div>
                      <div className="p-4">
                        {routine.routineExercises.map(
                          (routineExercise, index) => (
                            <>
                              <div key={index} className="mb-5 last:mb-0">
                                <div className="flex items-center mb-3">
                                  <Dumbbell className="h-4 w-4 mr-2 text-primary" />
                                  <h3 className="font-medium text-lg">
                                    {routineExercise.exercise.name}
                                  </h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm mb-2">
                                  <div className="rounded-md overflow-hidden h-[220px]">
                                    <img
                                      src={
                                        routineExercise.exercise.image ||
                                        "https://res.cloudinary.com/djdcj4v1j/image/upload/v1733853813/ejercicios/no-imagen_jjzdgf.jpg"
                                      }
                                      alt={routineExercise.exercise.name}
                                      className="rounded-md shadow-sm w-full h-full object-cover object-center bg-white p-3"
                                    />
                                  </div>
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
                                    {routineExercise.time && (
                                      <p className="text-muted-foreground">
                                        Tiempo:{" "}
                                        <span className="font-semibold text-foreground">
                                          {routineExercise.time}m
                                        </span>
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {routineExercise.comment && (
                                  <p className="text-sm text-primary-foreground bg-primary/20 p-2 rounded-md mt-2 text-white">
                                    <span className="font-medium text-white">
                                      Nota:
                                    </span>{" "}
                                    {routineExercise.comment}
                                  </p>
                                )}
                              </div>
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
