import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Dumbbell } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginFormData) => signIn(data),
    onSuccess: () => {
      toast.success("Inicio de sesión exitoso");
      navigate("/dashboard");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.error || "Error al iniciar sesión";
      toast.error(errorMessage);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat bg-black/55 bg-blend-multiply">
      <div className="w-full max-w-md bg-background/80 backdrop-blur-lg p-8 rounded-lg shadow-lg">
        <div className="mb-8 text-center">
          <Dumbbell className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold text-foreground mt-4">
            Nombre de Gym
          </h1>
          <p className="text-muted-foreground">Inicia sesión para acceder</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="Email"
              className="mt-2"
              disabled={isPending}
              {...register("email", {
                required: "El email es requerido",
              })}
            />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="mt-2"
                disabled={isPending}
                {...register("password", {
                  required: "La contraseña es requerida",
                })}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.password && (
              <p className="text-destructive text-sm mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : (
              "Ingresar"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
