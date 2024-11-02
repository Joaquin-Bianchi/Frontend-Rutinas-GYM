import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DumbbellIcon, Plus } from "lucide-react";
import ExerciseForm from "../ExerciseForm";
import { useState } from "react";

export function CreateExerciseModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="default">
          <Plus />
          <p className="font-bold">Nuevo Ejercicio</p>
          <DumbbellIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Ejercicio</DialogTitle>
        </DialogHeader>
        {/* Formulario para crear un ejercicio */}
        <ExerciseForm onSuccess={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
