import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
              <p className="text-sm md:text-xl text-muted-foreground">
                Aquí están tus rutinas asignadas por tu profesor
              </p>
            </div>

            <h2 className="text-base md:text-2xl font-semibold mb-4">
              Tus Rutinas Asignadas
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {client?.routines?.map(
                (routine) =>
                  routine.routineExercises.length > 0 && (
                    <Card
                      key={routine.day}
                      className="transition-all duration-300 border border-primary/20 hover:border-primary hover:shadow-lg bg-card/50 backdrop-blur-sm"
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between text-2xl">
                          <span className="flex items-center space-x-3">
                            <Calendar className="h-6 w-6 text-primary" />
                            <span className="capitalize">{routine.day}</span>
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                          {routine.routineExercises.map(
                            (routineExercise, index) => (
                              <AccordionItem
                                key={index}
                                value={`item-${index}`}
                              >
                                <AccordionTrigger className="uppercase">
                                  {routineExercise.exercise.name}
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="mt-2 space-y-2">
                                    {routineExercise.reps && (
                                      <p className="text-sm text-muted-foreground">
                                        Repeticiones: {routineExercise.reps}
                                      </p>
                                    )}

                                    {routineExercise.sets && (
                                      <p className="text-sm text-muted-foreground">
                                        Series: {routineExercise.sets}
                                      </p>
                                    )}

                                    {routineExercise.comment && (
                                      <p className="text-sm text-primary">
                                        Nota del profesor:{" "}
                                        {routineExercise.comment}
                                      </p>
                                    )}
                                    <div className="relative w-full h-48 mt-4">
                                      <img
                                        src={
                                          routineExercise.exercise.image ||
                                          "https://app-media.fitbod.me/v2/102/images/landscape/0_960x540.jpg"
                                        }
                                        alt={routineExercise.exercise.name}
                                        className="w-full h-48 object-cover rounded-lg shadow-md"
                                      />
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            )
                          )}
                        </Accordion>
                      </CardContent>
                    </Card>
                  )
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
