import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, LogOut, Home, Users, Dumbbell, Puzzle } from "lucide-react";
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

const navItems: NavItem[] = [
  { title: "Inicio", href: "/dashboard", icon: Home },
  { title: "Clientes", href: "/dashboard/clients", icon: Users },
  { title: "Ejercicios", href: "/dashboard/exercises", icon: Dumbbell },
  {
    title: "Planes",
    href: "/dashboard/categoryPlans",
    icon: Puzzle,
  },
];

export function Navbar() {
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
                src="/img/logo.png"
                alt="Gym Logo"
                className="h-10 w-[4.3rem] -mr-1 rounded-full"
              />
              <span className="text-xl font-bold text-primary-foreground hidden sm:inline">
                Fitness Center
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex hover:text-white items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:hover:bg-muted  hover:bg-white/90 ${
                  pathname === item.href
                    ? " text-white dark:bg-muted bg-white/90"
                    : "text-primary-foreground/80"
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={handleLogout}
              className="justify-start bg-primary hidden md:flex transition-colors dark:hover:bg-muted hover:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                  aria-label="Menu"
                >
                  <Menu className="h-6 w-6 text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-primary"
              >
                <SheetHeader>
                  <SheetTitle className="text-primary-foreground">
                    Menú
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex hover:text-white items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors dark:hover:bg-muted hover:bg-white/90 ${
                        pathname === item.href
                          ? "dark:bg-muted bg-white/90"
                          : "text-primary-foreground/80"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  ))}
                  <Button
                    size="sm"
                    onClick={handleLogout}
                    className="justify-start hover:text-white dark:hover:bg-muted"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
