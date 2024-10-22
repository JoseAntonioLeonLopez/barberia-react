import React, { useState, useEffect } from "react";
import { Card, CardHeader, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const ServiciosComponent: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);
    const handleChange = (event: MediaQueryListEvent) => setIsDarkMode(event.matches);
    darkModeQuery.addEventListener("change", handleChange);
    return () => darkModeQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className={`w-full min-h-screen ${isDarkMode ? 'bg-dark-mode-bg text-white' : 'bg-light-mode-bg text-black'} relative font-barber`}>
      {/* Fondo visualmente atractivo */}
      <div className="absolute inset-0">
        <img
          src="https://st4.depositphotos.com/16318796/24451/i/450/depositphotos_244516218-stock-photo-vertical-shot-handsome-professional-barber.jpg"
          alt="Barber Background"
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8">
        <div className="text-center mb-8">
          <h1 className="mt-5 text-4xl md:text-6xl font-bold text-barber-primary">
            Nuestros Servicios
          </h1>
          <p className="mt-4 text-lg md:text-2xl">
            Descubre nuestros servicios para mantenerte siempre a la moda.
          </p>
        </div>

        {/* Botón de reservar cita */}
        <Button
          className="mb-6"
          radius="full"
          size="lg"
          onClick={() => navigate("/booking")}
        >
          Reserva una cita
        </Button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          {/* Servicio 1 */}
          <Card className="h-[300px] relative overflow-hidden">
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} flex items-center justify-center`}>
              <Image
                removeWrapper
                alt="Corte Clásico"
                className="w-full h-full object-cover"
                src="src/Home/img/Corte Clásico.jpg"
                style={{ opacity: 0.3 }}
              />
            </div>
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny uppercase font-bold">Corte Clásico</p>
              <h4 className="font-bold text-2xl">Un estilo para cualquier ocasión</h4>
            </CardHeader>
          </Card>

          {/* Servicio 2 */}
          <Card className="h-[300px] relative overflow-hidden">
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} flex items-center justify-center`}>
              <Image
                removeWrapper
                alt="Barba & Afeitado"
                className="w-full h-full object-cover"
                src="src\Home\img\Barba & Afeitado.jpg"
                style={{ opacity: 0.3 }}
              />
            </div>
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny uppercase font-bold">Barba & Afeitado</p>
              <h4 className="font-bold text-2xl">Cuidado profesional de barba</h4>
            </CardHeader>
          </Card>

          {/* Servicio 3 */}
          <Card className="h-[300px] relative overflow-hidden">
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} flex items-center justify-center`}>
              <Image
                removeWrapper
                alt="Corte de Precisión"
                className="w-full h-full object-cover"
                src="src\Home\img\Corte de Precisión.jpg"
                style={{ opacity: 0.3 }}
              />
            </div>
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny uppercase font-bold">Corte de Precisión</p>
              <h4 className="font-bold text-2xl">Los detalles importan</h4>
            </CardHeader>
          </Card>

          {/* Servicio 4 */}
          <Card isFooterBlurred className="h-[300px] relative overflow-hidden">
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} flex items-center justify-center`}>
              <Image
                removeWrapper
                alt="Tintura"
                className="w-full h-full scale-125 -translate-y-6 object-cover"
                src="src\Home\img\Tintura.jpg"
                style={{ opacity: 0.3 }}
              />
            </div>
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny uppercase font-bold">Tintes</p>
              <h4 className="font-bold text-2xl">Renueva tu estilo con color</h4>
            </CardHeader>
          </Card>

          {/* Servicio 5 */}
          <Card isFooterBlurred className="h-[300px] sm:col-span-2 lg:col-span-1 relative overflow-hidden mb-6">
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} flex items-center justify-center`}>
              <Image
                removeWrapper
                alt="Faciales & Relax"
                className="w-full h-full object-cover"
                src="src\Home\img\Faciales & Relax.avif"
                style={{ opacity: 0.3 }}
              />
            </div>
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny uppercase font-bold">Faciales & Relax</p>
              <h4 className="font-bold text-2xl">Relájate con nuestros tratamientos</h4>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiciosComponent;
