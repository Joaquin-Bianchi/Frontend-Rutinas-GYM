import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClientNavbar } from "@/components/navigation/ClientNavbar";

// Datos de ejemplo para las rutinas
const routines = [
  {
    day: "Lunes",
    exercises: [
      { name: "Sentadillas", reps: 12, sets: 3, imageUrl: "/img/squat.jpg" },
      {
        name: "Press de banca",
        reps: 10,
        sets: 4,
        imageUrl: "/img/bench-press.jpg",
      },
    ],
  },
  {
    day: "Lunes",
    exercises: [
      { name: "Sentadillas", reps: 12, sets: 3, imageUrl: "/img/squat.jpg" },
      {
        name: "Press de banca",
        reps: 10,
        sets: 4,
        imageUrl: "/img/bench-press.jpg",
      },
    ],
  },
  {
    day: "Lunes",
    exercises: [
      { name: "Sentadillas", reps: 12, sets: 3, imageUrl: "/img/squat.jpg" },
      {
        name: "Press de banca",
        reps: 10,
        sets: 4,
        imageUrl: "/img/bench-press.jpg",
      },
    ],
  },
  {
    day: "Lunes",
    exercises: [
      { name: "Sentadillas", reps: 12, sets: 3, imageUrl: "/img/squat.jpg" },
      {
        name: "Press de banca",
        reps: 10,
        sets: 4,
        imageUrl: "/img/bench-press.jpg",
      },
    ],
  },
  {
    day: "Miércoles",
    exercises: [
      { name: "Peso muerto", reps: 8, sets: 4, imageUrl: "/img/deadlift.jpg" },
      { name: "Dominadas", reps: 8, sets: 3, imageUrl: "/img/pull-ups.jpg" },
    ],
  },
  {
    day: "Viernes",
    exercises: [
      {
        name: "Prensa de piernas",
        reps: 12,
        sets: 3,
        imageUrl: "/img/leg-press.jpg",
      },
      {
        name: "Curl de bíceps",
        reps: 12,
        sets: 3,
        imageUrl: "/img/bicep-curl.jpg",
      },
    ],
  },
];

export default function HomeClientPage() {
  return (
    <>
      <ClientNavbar />

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold mb-8 text-primary">
            Rutina Semanal
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {routines.map((routine) => (
              <Card
                key={routine.day}
                className="transition-all duration-300 border border-black/40 hover:border-primary hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calendar className="h-8 w-8 text-primary" />
                    <span>{routine.day}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {routine.exercises.map((exercise, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{exercise.name}</AccordionTrigger>
                        <AccordionContent>
                          <div className="mt-2 space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Repeticiones: {exercise.reps} | Series:{" "}
                              {exercise.sets}
                            </p>
                            <img
                              src={exercise.imageUrl}
                              alt={exercise.name}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
