import { Dumbbell } from "lucide-react";

const HomeClientPage = () => {
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat bg-black/75 bg-blend-multiply">
      <div className="container mx-auto px-4 py-12  ">
        <div className="flex flex-col items-center justify-center">
          <Dumbbell className="h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-2">
            Nombre de Gym
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90 text-center">
            Bienvenido NOMBRE
          </h2>
          <p className="mb-8">Revisa tus rutinas</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-background/80 backdrop-blur-lg rounded-lg shadow-lg p-6 mb-8">
            
          </div>

          {/* <div className="bg-background/80 backdrop-blur-lg rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Rutinas Disponibles
            </h3>
            <div className="text-white/90">
              lista de rutinas
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HomeClientPage;
