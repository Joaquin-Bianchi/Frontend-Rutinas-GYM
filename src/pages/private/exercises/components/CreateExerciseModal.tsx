import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ExerciseForm from "./ExerciseForm";

export function CreateExerciseModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="" variant="default" size="default">
          <Plus className="h-4 w-4 mr-2 " />
          Nuevo Ejercicio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Ejercicio</DialogTitle>
        </DialogHeader>
        {/* Formulario para crear un ejercicio */}
        <ExerciseForm />
      </DialogContent>
    </Dialog>
  );
}
