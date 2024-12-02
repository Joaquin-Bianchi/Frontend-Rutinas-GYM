import { Users, Dumbbell, Puzzle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomeAdminPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 sm:mb-8 sm:mt-4">
          <h1 className="text-xl md:text-4xl font-bold mb-2">
            Bienvenido/a de nuevo 👋
          </h1>
          <p className="mx-2 sm:mx-0 text-sm md:text-xl text-muted-foreground">
            Administra y organiza tus clientes, ejercicios y planes en un solo
            lugar.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              to: "/dashboard/clients",
              icon: Users,
              title: "Clientes",
              description:
                "Gestiona tus clientes y sus rutinas personalizadas.",
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
              to: "/dashboard/categoryPlans",
              icon: Puzzle,
              title: "Planes",
              description: "Explora y administra tu catálogo de planes.",
              imageUrl: "img/gym-planes.jpeg",
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
                <CardContent className="flex flex-col h-full">
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.description}
                  </p>
                  <div className="mt-4 aspect-[16/9] w-full">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
