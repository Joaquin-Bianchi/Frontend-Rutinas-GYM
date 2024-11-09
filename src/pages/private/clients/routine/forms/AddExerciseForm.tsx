import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useForm, Control, Controller } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Exercise } from "@/interfaces/exercise.interface";
import { cn } from "@/lib/utils";

interface Props {
  exercises: Exercise[];
}

function AddExerciseForm({ exercises }: Props) {
  const { control, handleSubmit } = useForm<Exercise>();
  const [openExercise, setOpenExercise] = useState(false);

  return (
    <form className="grid grid-cols-3 gap-4 py-4">
      <div className="col-span-3">
        <Controller
          name="exerciseId"
          control={control}
          rules={{ required: "Debes seleccionar un ejercicio" }}
          render={({ field }) => (
            <Popover open={openExercise} onOpenChange={setOpenExercise}>
              <Label htmlFor="exercise">Ejercicio</Label>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openExercise}
                  className="w-full capitalize justify-between"
                >
                  {field.value
                    ? exercises.find((exercise) => exercise.id === field.value)
                        ?.name
                    : "Buscar ejercicio..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder="Buscar ejercicio..." />
                  <CommandList>
                    <CommandEmpty>Ejercicio no encontrado</CommandEmpty>
                    <ScrollArea className="h-48 overflow-auto">
                      <CommandGroup>
                        {exercises.map((exercise) => (
                          <CommandItem
                            key={exercise.id}
                            className="capitalize"
                            value={exercise.name}
                            onSelect={() => {
                              field.onChange(exercise.id);
                              setOpenExercise(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === exercise.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {exercise.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </ScrollArea>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
      </div>

      <div className="col-span-2 flex items-end space-x-2">
        <div className="flex-1">
          <FormField
            name="sets"
            label="Series"
            control={control}
            placeholder="Series"
            type="number"
          />
        </div>

        <div className="flex items-center justify-center pb-2">
          <span className="text-lg font-bold">x</span>
        </div>

        <div className="flex-1">
          <FormField
            name="reps"
            label="Repeticiones"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            placeholder="Repeticiones"
            type="number"
          />
        </div>
      </div>

      <div className="col-span-1">
        <FormField
          name="time"
          label="Tiempo"
          control={control}
          placeholder="Tiempo"
          type="number"
        />
      </div>

      <div className="col-span-3">
        <FormField
          name="comment"
          label="Comentario"
          control={control}
          placeholder="Comentario"
        />
      </div>

      <div className="col-span-2">
        <Button type="submit" className="w-full"></Button>
      </div>
    </form>
  );
}

export default AddExerciseForm;
