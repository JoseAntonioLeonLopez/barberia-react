import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

const NotFoundComponent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-dark-mode-bg font-barber">
      {/* Fondo visualmente atractivo */}
      <div className="absolute inset-0">
        <img
          src="https://st4.depositphotos.com/16318796/24451/i/450/depositphotos_244516218-stock-photo-vertical-shot-handsome-professional-barber.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-5xl md:text-8xl font-bold text-barber-primary">
            404
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-dark-mode-text">
            Lo sentimos, la página que buscas no se encuentra.
          </p>
        </div>

        <Button
          radius="full"
          size="lg"
          onClick={() => navigate('/')}
          className="mt-4 bg-barber-primary dark:bg-barber-primary"
        >
          Volver a la página de inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFoundComponent;
