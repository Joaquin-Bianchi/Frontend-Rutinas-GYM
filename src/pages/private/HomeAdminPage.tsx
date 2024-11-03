import { Users, Dumbbell, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomeAdminPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold mb-8 text-primary">Inicio</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              to: "/dashboard/clients",
              icon: Users,
              title: "Clientes",
              description:
                "Gestiona tus clientes, revisa sus perfiles y seguimiento.",
              imageUrl: "img/gym-clientes.jpg",
            },
            {
              to: "/dashboard/exercises",
              icon: Dumbbell,
              title: "Ejercicios",
              description: "Explora y administra tu catálogo de ejercicios.",
              imageUrl: "img/gym-ejercicios.jpg",
            },
            {
              to: "/dashboard/routines",
              icon: ClipboardList,
              title: "Rutinas",
              description:
                "Crea y modifica rutinas de entrenamiento para tus clientes.",
              imageUrl: "img/gym-rutinas.jpg",
            },
          ].map((item) => (
            <Link key={item.to} to={item.to} className="block group">
              <Card className="transition-all duration-300 h-full border border-black/40 hover:border-primary hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <item.icon className="h-8 w-8 text-primary" />
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.description}
                  </p>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="mt-4 w-full h-80 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
