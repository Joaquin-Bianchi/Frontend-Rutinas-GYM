import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Printer } from "lucide-react";
import { Routine } from "@/interfaces/routine.interface";
import { ActionModalUserRutine } from "@/components/modal/ActionModalUserRutine";
import AddExerciseForm from "../forms/AddExerciseForm";
import ButtonIconDelete from "@/components/buttons/ButtonIconDelete";
import { deleteRoutinExercise } from "@/services/routineExerciseService";
import { Button } from "@/components/ui/button";
import { Client } from "@/interfaces/client.interface";

interface Props {
  routine: Routine;
  exercises?: any;
  client: Client;
}

export default function CardRoutines({ routine, exercises, client }: Props) {
  console.log(client.categoryPlans);

  const handlePrint = (id: string) => {
    const cardElement = document.getElementById(`card-${id}`);

    console.log(cardElement);

    if (cardElement) {
      cardElement.classList.add("print-only");
      window.print();
      cardElement.classList.remove("print-only");
    }
  };

  return (
    <Card
      key={routine.id}
      id={`card-${routine.id}`}
      className="card shadow-lg print:shadow-none print:border-none print:bg-white"
    >
      <CardHeader className="print:pb-0">
        <CardTitle className="flex justify-between items-center">
          <div className="capitalize flex justify-between items-baseline">
            <div className="flex items-baseline">
              <Calendar className="mr-2 h-4 w-4 print:text-black" />
              <span className="capitalize text-lg font-bold print:text-3xl print:text-black">
                {routine.day === "miercoles"
                  ? "Miércoles"
                  : routine.day === "sabado"
                  ? "Sábado"
                  : routine.day}
              </span>
            </div>
            <p className="hidden print:text-black print:block">
              &nbsp;- {client.name}
            </p>
          </div>
          <div className="flex items-center space-x-2 print:hidden">
            {routine.routineExercises?.length > 0 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePrint(routine.id)}
                className="print-only-card"
              >
                <Printer className="h-4 w-4" />
              </Button>
            )}

            <div className="">
              <ActionModalUserRutine dialogTitle="Asignar Rutina">
                {(closeModal) => (
                  <AddExerciseForm
                    exercises={exercises.exercises}
                    routineId={routine.id}
                    closeModal={closeModal}
                  />
                )}
              </ActionModalUserRutine>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="print:pt-4">
        {routine.routineExercises?.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 print:grid-cols-1">
            {routine.routineExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-secondary/10 rounded-lg p-4 shadow-sm print:shadow-none print:border-b print:border-gray-300 print:pb-6"
              >
                <div className="flex flex-col sm:flex-row gap-4 h-full">
                  <div className="sm:w-[100px] aspect-video sm:aspect-square print:w-[120px] print:h-[120px]">
                    <img
                      src={
                        exercise.exercise.image ||
                        "https://app-media.fitbod.me/v2/102/images/landscape/0_960x540.jpg"
                      }
                      alt={exercise.exercise.name}
                      className="rounded-md w-full h-full object-cover object-center print:object-contain"
                    />
                  </div>

                  <div className="flex flex-col w-full sm:w-2/3 justify-between flex-grow">
                    <div>
                      <span className="font-semibold text-md mb-2 block uppercase print:text-xl print:text-black">
                        {exercise.exercise.name}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {exercise.sets !== null ? (
                          <Badge className="print:bg-gray-200 print:text-black print:border-none">
                            {exercise.sets} Series
                          </Badge>
                        ) : null}
                        {exercise.reps !== null ? (
                          <Badge className="print:bg-gray-200 print:text-black print:border-none">
                            {exercise.reps} Reps
                          </Badge>
                        ) : null}
                        {exercise.time !== null ? (
                          <Badge className="print:bg-gray-200 print:text-black print:border-none">
                            {exercise.time} Minutos
                          </Badge>
                        ) : null}
                      </div>
                      <div>
                        {exercise.comment !== null && (
                          <p className="text-xs text-gray-200 font-medium print:text-gray-600 print:text-sm">
                            <span className="text-primary print:text-blue-600">
                              Nota:
                            </span>{" "}
                            {exercise.comment}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="self-end print:hidden">
                    <ButtonIconDelete
                      id={exercise.id}
                      deleteFn={deleteRoutinExercise}
                      nameMutationKey="deleteRoutineExercise"
                      nameQueryKey="client"
                      textObjectDelete="Ejercicio"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No hay rutina asignada para este día.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
