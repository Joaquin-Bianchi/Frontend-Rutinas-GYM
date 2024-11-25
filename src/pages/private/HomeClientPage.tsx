import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClientNavbar } from "@/components/navigation/ClientNavbar";
import { useLocation } from "react-router-dom";
import { getClientById } from "@/services/clientService";
import { useQuery } from "@tanstack/react-query";
import { Client } from "@/interfaces/client.interface";

export default function HomeClientPage() {
  const location = useLocation();
  const userId = location.state;

  const {
    data: client,
    isLoading,
    isError,
    error,
  } = useQuery<Client>({
    queryKey: ["client"],
    queryFn: () => getClientById(userId as string),
  });

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(client);

  return (
    <>
      <ClientNavbar />

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl text-center md:text-3xl font-semibold mb-2 text-white">
            Bienvenido {client?.name} 👋
          </h2>
          <h3 className="text-sm text-center md:text-xl font-semibold mb-8 text-white">
            Plan de entrenamiento:{" "}
            {client?.categoryPlans?.map((category) => (
              <span key={category.id} className="text-sm mx-1 px-1 bg-primary rounded md:text-base md:p-1">
                {category.categoryPlan?.name}
              </span>
            ))}
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {client?.routines?.map(
              (routine) =>
                routine.routineExercises.length > 0 && (
                  <Card
                    key={routine.day}
                    className="transition-all duration-300 border border-black/40 hover:border-primary hover:shadow-lg"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3 text-2xl">
                        <Calendar className="h-8 w-8 text-primary" />
                        <span className="capitalize">{routine.day}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {routine.routineExercises.map(
                          (routineExercise, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
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
                                      {routineExercise.comment}
                                    </p>
                                  )}
                                  <img
                                    src={
                                      routineExercise.exercise.image ||
                                      "https://app-media.fitbod.me/v2/102/images/landscape/0_960x540.jpg"
                                    }
                                    alt={routineExercise.exercise.name}
                                    className="w-full h-48 object-cover rounded-lg"
                                  />
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
        </main>
      </div>
    </>
  );
}
