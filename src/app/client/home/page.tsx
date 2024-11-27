import { Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ClientNavbar } from "@/components/navigation/ClientNavbar"
import { getClientById } from "@/services/clientService"
import { useQuery } from "@tanstack/react-query"
import { Client } from "@/interfaces/client.interface"
import { isAuthenticated } from "@/services/authService"
import { HomeClientSkeletonLoader } from "@/components/loaders/HomeClientSkeletonLoader"
import { ErrorDisplay } from "@/components/errors/ErrorDisplay"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HomeClientPage() {
  const { userId } = isAuthenticated()

  const {
    data: client,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<Client>({
    queryKey: ["client"],
    queryFn: () => getClientById(userId as string),
  })

  const handleRetry = () => {
    refetch()
  }

  return (
    <>
      <ClientNavbar />
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <HomeClientSkeletonLoader />
          ) : isError ? (
            <div className="space-y-4">
              <ErrorDisplay message={error instanceof Error ? error.message : 'Ocurrió un error desconocido'} />
              <Button onClick={handleRetry}>Intentar de nuevo</Button>
            </div>
          ) : (
            <>
              <h2 className="text-xl text-center md:text-3xl font-semibold mb-2 text-white">
                Bienvenido {client?.name} 👋
              </h2>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {client?.routines?.map(
                  (routine) =>
                    routine.routineExercises.length > 0 && (
                      <Card
                        key={routine.day}
                        className="transition-all duration-300 border border-black/40 hover:border-primary hover:shadow-lg"
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-3 text-2xl">
                            <Calendar className="h-8 w-8 text-primary" />
                            <span className="capitalize">{routine.day}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible className="w-full">
                            {routine.routineExercises.map(
                              (routineExercise, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                  <AccordionTrigger className="uppercase">
                                    {routineExercise.exercise.name}
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="mt-2 space-y-2">
                                      {routineExercise.reps && (
                                        <p className="text-sm text-muted-foreground">
                                          Repeticiones: {routineExercise.reps}
                                        </p>
                                      )}

                                      {routineExercise.sets && (
                                        <p className="text-sm text-muted-foreground">
                                          Series: {routineExercise.sets}
                                        </p>
                                      )}

                                      {routineExercise.comment && (
                                        <p className="text-sm text-primary">
                                          {routineExercise.comment}
                                        </p>
                                      )}
                                      <div className="relative w-full h-48">
                                        <Image
                                          src={
                                            routineExercise.exercise.image ||
                                            "/placeholder.svg?height=192&width=384"
                                          }
                                          alt={routineExercise.exercise.name}
                                          layout="fill"
                                          objectFit="cover"
                                          className="rounded-lg"
                                        />
                                      </div>
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              )
                            )}
                          </Accordion>
                        </CardContent>
                      </Card>
                    )
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  )
}

