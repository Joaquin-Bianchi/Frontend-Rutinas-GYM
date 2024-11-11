import { getClientById } from "@/services/clientService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Client } from "@/interfaces/client.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionModalUserRutine } from "@/components/modal/ActionModalUserRutine";
import AddExerciseForm from "./forms/AddExerciseForm";
import { getExercises } from "@/services/exerciseService";
import { Badge } from "@/components/ui/badge";

export default function ClientRoutinePage() {
  const { id } = useParams();

  const {
    data: client,
    isLoading,
    isError,
    error,
  } = useQuery<Client>({
    queryKey: ["client"],
    queryFn: () => getClientById(id as string),
  });

  const { data: exercises } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => getExercises(),
  });

  console.log("Cliente: ", client);

  if (isLoading) return <div>Cargando rutinas del cliente...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rutinas de {client?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {client?.routines?.map((routine) => (
          <Card key={routine.id} className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="capitalize">{routine.day}</span>
                <ActionModalUserRutine dialogTitle="Asignar Rutina">
                  <AddExerciseForm
                    exercises={exercises?.data}
                    routineId={routine.id}
                  />
                </ActionModalUserRutine>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {routine.routineExercises?.length > 0 ? (
                <div>
                  <h3 className="font-semibold mb-4 text-xl text-primary">
                    Ejercicios
                  </h3>
                  <ul className="space-y-4">
                    {routine.routineExercises.map((exercise) => (
                      <li
                        key={exercise.id}
                        className="bg-secondary/10 rounded-lg p-4 shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="font-semibold text-lg text-primary">
                            {exercise.exercise.name}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">
                              {exercise.sets} series
                            </Badge>
                            <Badge variant="secondary">
                              {exercise.reps} repeticiones
                            </Badge>
                            <Badge variant="secondary">
                              {exercise.time} min descanso
                            </Badge>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No hay rutina asignada para este día.
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
