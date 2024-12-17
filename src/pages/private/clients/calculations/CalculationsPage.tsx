"use client";

import { useState } from "react";
import { ClientNavbar } from "@/components/navigation/ClientNavbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Activity, Utensils, Dumbbell } from "lucide-react";
import { toast } from "sonner";

export default function HealthCalculatorPage() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [goal, setGoal] = useState("maintain");
  const [imc, setIMC] = useState<number | null>(null);
  const [calories, setCalories] = useState<number | null>(null);
  const [protein, setProtein] = useState<number | null>(null);

  const calculateHealth = (e: React.FormEvent) => {
    e.preventDefault();

    const ageNum = parseFloat(age);
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (
      isNaN(ageNum) ||
      isNaN(heightNum) ||
      isNaN(weightNum) ||
      heightNum === 0
    ) {
      toast.error(
        "Por favor, ingrese valores válidos para edad, altura y peso."
      );
      return;
    }

    // Cálculo del IMC
    const heightInMeters = heightNum / 100;
    const imcValue = weightNum / (heightInMeters * heightInMeters);
    setIMC(parseFloat(imcValue.toFixed(2)));

    // Cálculo de calorías
    let bmr;
    if (gender === "male") {
      bmr = 88.362 + 13.397 * weightNum + 4.799 * heightNum - 5.677 * ageNum;
    } else {
      bmr = 447.593 + 9.247 * weightNum + 3.098 * heightNum - 4.33 * ageNum;
    }

    let tdee;
    switch (activityLevel) {
      case "sedentary":
        tdee = bmr * 1.2;
        break;
      case "light":
        tdee = bmr * 1.375;
        break;
      case "moderate":
        tdee = bmr * 1.55;
        break;
      case "active":
        tdee = bmr * 1.725;
        break;
      case "very-active":
        tdee = bmr * 1.9;
        break;
      default:
        tdee = bmr * 1.2;
    }

    let targetCalories;
    switch (goal) {
      case "lose":
        targetCalories = tdee - 500;
        break;
      case "gain":
        targetCalories = tdee + 500;
        break;
      default:
        targetCalories = tdee;
    }

    setCalories(Math.round(targetCalories));

    // Cálculo de proteínas (1.6g por kg de peso corporal)
    const proteinAmount = weightNum * 1.6;
    setProtein(Math.round(proteinAmount));
  };

  const getIMCInterpretation = (imc: number) => {
    if (imc < 18.5) return "Bajo peso";
    if (imc < 25) return "Peso normal";
    if (imc < 30) return "Sobrepeso";
    return "Obesidad";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 text-foreground">
      <ClientNavbar />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 mt-2 sm:mb-8 sm:mt-8">
          <h1 className="flex text-lg md:text-4xl font-bold justify-center gap-1 md:items-center md:mb-2">
            <Calculator className="hidden text-primary md:block" size={40} />
            <Calculator className="text-primary md:hidden  text-lg md:text-xl" />
            Calculadora de Salud
          </h1>
          <p className="mx-2  sm:mx-0 text-xs md:text-xl text-muted-foreground">
            Calcula tu IMC (índice de masa corporal), calorías diarias
            recomendadas y proteínas
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Ingrese sus datos</CardTitle>
              <CardDescription>
                Proporcione su información personal para obtener resultados
                personalizados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateHealth} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="age">Edad</Label>
                    <Input
                      id="age"
                      placeholder="Ingrese su edad"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Género</Label>
                    <RadioGroup
                      value={gender}
                      onValueChange={setGender}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Masculino</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Femenino</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      placeholder="Ingrese su altura en centímetros"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      placeholder="Ingrese su peso en kilogramos"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="activity">Nivel de Actividad</Label>
                    <Select
                      value={activityLevel}
                      onValueChange={setActivityLevel}
                    >
                      <SelectTrigger id="activity">
                        <SelectValue placeholder="Seleccione su nivel de actividad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentario</SelectItem>
                        <SelectItem value="light">
                          Ligeramente activo
                        </SelectItem>
                        <SelectItem value="moderate">
                          Moderadamente activo
                        </SelectItem>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="very-active">Muy activo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="goal">Objetivo</Label>
                    <Select value={goal} onValueChange={setGoal}>
                      <SelectTrigger id="goal">
                        <SelectValue placeholder="Seleccione su objetivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lose">Perder peso</SelectItem>
                        <SelectItem value="maintain">Mantener peso</SelectItem>
                        <SelectItem value="gain">Ganar peso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Calcular
                </Button>
              </form>
            </CardContent>
          </Card>

          {imc !== null || calories !== null || protein !== null ? (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl">Resultados</CardTitle>
                <CardDescription>
                  Sus resultados personalizados basados en la información
                  proporcionada.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="imc" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="imc">IMC</TabsTrigger>
                    <TabsTrigger value="calories">Calorías</TabsTrigger>
                    <TabsTrigger value="protein">Proteínas</TabsTrigger>
                  </TabsList>
                  <TabsContent value="imc">
                    <div className="text-center p-4">
                      <Activity className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <h3 className="text-2xl font-semibold mb-2">
                        Resultado IMC
                      </h3>
                      <p className="text-4xl font-bold mb-2">{imc}</p>
                      <p className="text-xl">{getIMCInterpretation(imc!)}</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="calories">
                    <div className="text-center p-4">
                      <Utensils className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <h3 className="text-2xl font-semibold mb-2">
                        Calorías Diarias
                      </h3>
                      <p className="text-4xl font-bold mb-2">{calories} kcal</p>
                      <p className="text-xl">
                        {goal === "lose"
                          ? "Para perder peso"
                          : goal === "gain"
                          ? "Para ganar peso"
                          : "Para mantener peso"}
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="protein">
                    <div className="text-center p-4">
                      <Dumbbell className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <h3 className="text-2xl font-semibold mb-2">
                        Proteínas Diarias
                      </h3>
                      <p className="text-4xl font-bold mb-2">{protein} g</p>
                      <p className="text-xl">
                        Cantidad recomendada de proteínas por día
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl">Resultados</CardTitle>
                <CardDescription>
                  Sus resultados personalizados estarán disponibles una vez
                  calculados sus datos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="imc" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="imc">IMC</TabsTrigger>
                    <TabsTrigger value="calories">Calorías</TabsTrigger>
                    <TabsTrigger value="protein">Proteínas</TabsTrigger>
                  </TabsList>
                  <TabsContent value="imc">
                    <div className="text-center p-4">
                      <Activity className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <h3 className="text-2xl font-semibold mb-2">
                        Resultado IMC
                      </h3>
                      <p className="text-4xl font-bold mb-2">{imc}</p>
                      <p className="text-xl">Sin resultado</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="calories">
                    <div className="text-center p-4">
                      <Utensils className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <h3 className="text-2xl font-semibold mb-2">
                        Calorías Diarias
                      </h3>
                      <p className="text-xl">Sin resultado</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="protein">
                    <div className="text-center p-4">
                      <Dumbbell className="h-12 w-12 mx-auto mb-2 text-primary" />
                      <h3 className="text-2xl font-semibold mb-2">
                        Proteínas Diarias
                      </h3>
                      <p className="text-xl">Sin resultado</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
