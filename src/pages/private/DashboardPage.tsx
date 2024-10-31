import { Users, Dumbbell, ClipboardList, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b bg-primary shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl text-primary-foreground font-bold">
              Sección Administrativa
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <User className=" h-4 w-4" />
                Modo Cliente
              </Button>
              <Button variant="destructive" size="sm">
                <LogOut className=" h-4 w-4" />
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold mb-8 text-primary">
          Opciones Principales
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              to: "/dashboard/clients",
              icon: Users,
              title: "Clientes",
              description:
                "Gestiona tus clientes, revisa sus perfiles y seguimiento.",
            },
            {
              to: "/dashboard/exercises",
              icon: Dumbbell,
              title: "Ejercicios",
              description: "Explora y administra tu catálogo de ejercicios.",
            },
            {
              to: "/dashboard/routines",
              icon: ClipboardList,
              title: "Rutinas",
              description:
                "Crea y modifica rutinas de entrenamiento para tus clientes.",
            },
          ].map((item) => (
            <Link key={item.to} to={item.to} className="block group">
              <Card className="transition-all duration-300 h-full border border-black/40 hover:border-primary hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl  ">
                    <item.icon className="h-8 w-8 text-primary" />
                    <span>{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-2xl text-primary">
                Resumen de Actividad
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                Aquí puedes ver un resumen de tu actividad reciente y
                estadísticas importantes.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
