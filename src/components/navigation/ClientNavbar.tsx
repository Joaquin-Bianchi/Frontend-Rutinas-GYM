import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, User, LogOut, Home, Users, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

export function ClientNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <img
                src="/img/logo.jpeg"
                alt="Gym Logo"
                className="h-8 w-auto rounded-full"
              />
              <span className="text-xl font-bold text-primary-foreground hidden sm:inline">
                Nombre Gym
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            <h2>Bienvenido CLiente</h2>
          </nav>
          <div className="flex items-center space-x-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
