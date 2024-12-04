import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Printer } from "lucide-react";
import { Routine } from "@/interfaces/routine.interface";
import { ActionModalUserRutine } from "@/components/modal/ActionModalUserRutine";
import AddExerciseForm from "../forms/AddExerciseForm";
import ButtonIconDelete from "@/components/buttons/ButtonIconDelete";
import { deleteRoutinExercise } from "@/services/routineExerciseService";
import { Button } from "@/components/ui/button";

interface Props {
  routine: Routine;
  exercises?: any;
}

export default function CardRoutines({ routine, exercises }: Props) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Card
      key={routine.id}
      className="shadow-lg print:shadow-none print:border print:border-gray-300"
    >
      <CardHeader className="print:bg-white print:text-black">
        <CardTitle className="flex justify-between items-center">
          <div className="capitalize flex items-baseline">
            <Calendar className="mr-2 h-4 w-4 print:text-black" />
            <span className="capitalize">
              {routine.day === "miercoles"
                ? "Miércoles"
                : routine.day === "sabado"
                ? "Sábado"
                : routine.day}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrint}
              className="print:hidden"
            >
              <Printer className="h-4 w-4" />
            </Button>
            <div className="print:hidden">
              <ActionModalUserRutine dialogTitle="Asignar Rutina">
                {(closeModal) => (
                  <AddExerciseForm
                    exercises={exercises?.data}
                    routineId={routine.id}
                    closeModal={closeModal}
                  />
                )}
              </ActionModalUserRutine>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="print:bg-white print:text-black">
        {routine.routineExercises?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-8">
            {routine.routineExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-secondary/10 rounded-lg p-4 shadow-sm print:bg-white print:border print:border-gray-300 print:break-inside-avoid"
              >
                <div className="flex flex-col sm:flex-row gap-4 h-full">
                  <div className="sm:w-[100px] aspect-video sm:aspect-square">
                    <img
                      src={
                        exercise.exercise.image ||
                        "https://app-media.fitbod.me/v2/102/images/landscape/0_960x540.jpg"
                      }
                      alt={exercise.exercise.name}
                      className="rounded-md w-full h-full object-cover object-center print:filter print:grayscale"
                    />
                  </div>

                  <div className="flex flex-col w-full sm:w-2/3 justify-between flex-grow">
                    <div>
                      <span className="font-semibold text-md mb-2 block uppercase">
                        {exercise.exercise.name}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {exercise.sets !== null ? (
                          <Badge className="print:bg-white print:text-black print:border print:border-gray-300">
                            {exercise.sets} Series
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="print:bg-white print:text-black print:border print:border-gray-300"
                          >
                            <s>Series</s>
                          </Badge>
                        )}
                        {exercise.reps !== null ? (
                          <Badge className="print:bg-white print:text-black print:border print:border-gray-300">
                            {exercise.reps} Reps
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="print:bg-white print:text-black print:border print:border-gray-300"
                          >
                            <s>Reps</s>
                          </Badge>
                        )}
                        {exercise.time !== null ? (
                          <Badge className="print:bg-white print:text-black print:border print:border-gray-300">
                            {exercise.time} Minutos
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="print:bg-white print:text-black print:border print:border-gray-300"
                          >
                            <s>Minutos</s>
                          </Badge>
                        )}
                      </div>
                      <div>
                        {exercise.comment !== null && (
                          <p className="text-xs text-gray-200 font-medium print:text-gray-600">
                            <span className="text-primary print:text-black">
                              -
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
          <p className="text-muted-foreground print:text-gray-600">
            No hay rutina asignada para este día.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
