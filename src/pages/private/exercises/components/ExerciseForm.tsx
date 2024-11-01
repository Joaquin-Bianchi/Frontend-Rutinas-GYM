import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MuscleGroup from "@/enums/muscleGroup.enum";

function ExerciseForm() {
  return (
    <form className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" placeholder="Press de banca..." />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image">URL de la imagen</Label>
        <Input id="image" placeholder="https://..." />
      </div>
      <div className="grid gap-2">
        <Label>Grupos musculares</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona grupo muscular" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(MuscleGroup).map((muscle) => (
              <SelectItem className="capitalize" key={muscle} value={muscle}>
                {muscle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Crear ejercicio</Button>
    </form>
  );
}

export default ExerciseForm;
