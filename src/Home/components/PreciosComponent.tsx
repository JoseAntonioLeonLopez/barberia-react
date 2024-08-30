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
      img: "https://img.freepik.com/foto-gratis/peluqueria-profesional-modelando-barba-barberia-cerca-foto_613910-18422.jpg?t=st=1725008459~exp=1725012059~hmac=d20c037bc8b87d02273c39c76c243b3dc75320a2ff3f14f688b2b59ca62246c2&w=996", // Imagen ilustrativa de afeitado
      price: "€10.00",
    },
    {
      title: "Tinte de Barba",
      img: "https://img.freepik.com/foto-gratis/peinando-canas-cliente-senior-barberia_23-2148181900.jpg?t=st=1725008498~exp=1725012098~hmac=657f697e621ad78321f9d387dff62160ac14c3afe2df5f4cb1ceea79f8b1465d&w=996", // Imagen ilustrativa de tinte de barba
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
      img: "https://img.freepik.com/foto-gratis/nino-cortandose-pelo-vista-frontal_23-2149870361.jpg?t=st=1725008531~exp=1725012131~hmac=e42a9b79eac7cbc10a48aa4bee347683ddd20fc6f329e14268b99aad616caf47&w=996", // Imagen ilustrativa de corte infantil
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
