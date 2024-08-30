import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const PreciosComponent: React.FC = () => {
  const services = [
    {
      title: "Corte de Cabello",
      img: "https://images.pexels.com/photos/3993443/pexels-photo-3993443.jpeg", // Imagen ilustrativa de corte de cabello
      price: "€15.00",
    },
    {
      title: "Afeitado Clásico",
      img: "https://www.elaristocrata.com/wp-content/uploads/2022/10/Fot1.jpeg", // Imagen ilustrativa de afeitado
      price: "€10.00",
    },
    {
      title: "Tinte de Barba",
      img: "https://www.alpel.es/i/u/como-hacer-afeitado-clasico.jpg", // Imagen ilustrativa de tinte de barba
      price: "€12.50",
    },
    {
      title: "Tratamiento Capilar",
      img: "https://images.pexels.com/photos/3992870/pexels-photo-3992870.jpeg", // Imagen ilustrativa de tratamiento capilar
      price: "€20.00",
    },
    {
      title: "Lavado y Peinado",
      img: "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg", // Imagen ilustrativa de lavado y peinado
      price: "€8.00",
    },
    {
      title: "Corte Infantil",
      img: "https://static.2x3cdn.com/assets/seo-keywords/mobile_square/jpeg/MdZZu7FDEq0Z.jpeg", // Imagen ilustrativa de corte infantil
      price: "€10.00",
    }
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
      {/* Imagen de fondo difuminada */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3993443/pexels-photo-3993443.jpeg"
          alt="Background"
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
      </div>

      {/* Contenido de precios */}
      <div className="relative z-10 gap-4 grid grid-cols-2 sm:grid-cols-4 p-4">
        {services.map((item, index) => (
          <Card
            key={index}
            shadow="sm"
            isPressable
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[140px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b className="text-lg md:text-xl desktop:text-2xl">{item.title}</b>
              <p className="text-default-500 text-lg md:text-xl desktop:text-2xl">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PreciosComponent;
