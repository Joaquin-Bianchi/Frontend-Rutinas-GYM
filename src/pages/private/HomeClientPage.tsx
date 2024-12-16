import {
  Calendar,
  Dumbbell,
  User,
  ChevronRight,
  BicepsFlexed,
} from "lucide-react";
import { ClientNavbar } from "@/components/navigation/ClientNavbar";
import { getClientById } from "@/services/clientService";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@/interfaces/client.interface";
import { isAuthenticated } from "@/services/authService";
import ErrorDisplay from "@/components/erros/ErrorDisplay";
import { HomeClientSkeletonLoader } from "@/components/loaders/HomeClientSkeletonLoader";
import { Button } from "@/components/ui/button";

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

  const formatDayName = (day: string) => {
    switch (day) {
      case "miercoles":
        return "Miércoles";
      case "sabado":
        return "Sábado";
      default:
        return day.charAt(0).toUpperCase() + day.slice(1);
    }
  };

  const scrollToDay = (day: string) => {
    const element = document.getElementById(day);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      element.classList.add("highlight");
      setTimeout(() => element.classList.remove("highlight"), 2000);
    }
  };

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
            <div className="text-center mb-4 mt-2 sm:mb-8 sm:mt-8 lg:text-start">
              <h1 className="flex text-lg md:text-4xl font-bold justify-center gap-1 md:items-center md:mb-2 lg:justify-start ">
                <User className="hidden text-primary md:block" size={40} />
                <User className="text-primary md:hidden" />
                Bienvenido/a a tu perfil online
              </h1>
              <p className="mx-2 sm:mx-0 text-sm md:text-xl text-muted-foreground">
                Aquí tienes tus rutinas personalizadas asignadas por tu profesor
              </p>
            </div>

            <div className="flex gap-2 mb-1 justify-center md:justify-start">
              <BicepsFlexed className="text-primary" size={20}/>
              <p className="text-sm md:text-base text-muted-foreground">
                Seleccione la rutina del dia de hoy y a entrenar!
              </p>
            </div>

            <div className="w-full overflow-x-auto rounded-md border mb-8">
              <div className="flex w-max space-x-4 p-4">
                {client?.routines?.map(
                  (routine) =>
                    routine.routineExercises.length > 0 && (
                      <Button
                        key={routine.day}
                        variant="outline"
                        onClick={() => scrollToDay(routine.day)}
                        className="flex items-center"
                      >
                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                        {formatDayName(routine.day)}
                        <ChevronRight className="ml-2 h-4 w-4 text-primary" />
                      </Button>
                    )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {client?.routines?.map(
                (routine) =>
                  routine.routineExercises.length > 0 && (
                    <div
                      id={routine.day}
                      key={routine.day}
                      className="bg-card/30 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg"
                    >
                      <div className="bg-cyan-950 p-4 text-white ">
                        <h2 className="flex items-center text-xl font-semibold">
                          <Calendar className="h-5 w-5 mr-2 text-primary" />
                          <span className="capitalize">
                            {formatDayName(routine.day)}
                          </span>
                        </h2>
                      </div>
                      <div className="p-4 flex flex-col">
                        {routine.routineExercises.map(
                          (routineExercise, index) => (
                            <div key={index} className="mb-7 last:mb-0">
                              <div className="flex items-center mb-3">
                                <Dumbbell className="h-4 w-4 mr-2 text-primary" />
                                <h3 className="font-medium text-lg capitalize">
                                  {routineExercise.exercise.name}
                                </h3>
                              </div>
                              <div className="grid grid-cols-1 gap-3 text-sm mb-2">
                                <div className="rounded-md overflow-hidden w-full max-h-[310px]">
                                  <img
                                    src={
                                      routineExercise.exercise.image ||
                                      "https://res.cloudinary.com/djdcj4v1j/image/upload/v1733853813/ejercicios/no-imagen_jjzdgf.jpg"
                                    }
                                    alt={routineExercise.exercise.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  {routineExercise.sets ? (
                                    <p className="text-muted-foreground">
                                      Series:{" "}
                                      <span className="font-semibold text-foreground">
                                        {routineExercise.sets}
                                      </span>
                                    </p>
                                  ) : (
                                    <p className="text-muted-foreground">
                                      Series:{" "}
                                      <span className="font-semibold text-muted-foreground">
                                        -
                                      </span>
                                    </p>
                                  )}
                                  {routineExercise.reps ? (
                                    <p className="text-muted-foreground">
                                      Repeticiones:{" "}
                                      <span className="font-semibold text-foreground">
                                        {routineExercise.reps}
                                      </span>
                                    </p>
                                  ) : (
                                    <p className="text-muted-foreground">
                                      Repeticiones:{" "}
                                      <span className="font-semibold text-muted-foreground">
                                        -
                                      </span>
                                    </p>
                                  )}
                                  {routineExercise.time ? (
                                    <p className="text-muted-foreground">
                                      Tiempo:{" "}
                                      <span className="font-semibold text-foreground">
                                        {routineExercise.time}
                                      </span>
                                    </p>
                                  ) : (
                                    <p className="text-muted-foreground">
                                      Tiempo:{" "}
                                      <span className="font-semibold text-muted-foreground">
                                        -
                                      </span>
                                    </p>
                                  )}
                                  {routineExercise.comment ? (
                                    <p className="text-primary">
                                      Nota:{" "}
                                      <span className="font-semibold text-foreground">
                                        {routineExercise.comment}
                                      </span>
                                    </p>
                                  ) : (
                                    <p className="text-primary">
                                      Nota:{" "}
                                      <span className="font-semibold text-muted-foreground">
                                        -
                                      </span>
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
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
