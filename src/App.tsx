import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Dumbbell, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Bienvenido a GymApp
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Área de Profesores</CardTitle>
            <CardDescription>
              Crea y gestiona rutinas para tus clientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dumbbell className="w-16 h-16 mx-auto text-primary" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button>Acceder</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Área de Clientes</CardTitle>
            <CardDescription>Visualiza tus rutinas asignadas</CardDescription>
          </CardHeader>
          <CardContent>
            <Users className="w-16 h-16 mx-auto text-primary" />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button>Acceder</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
