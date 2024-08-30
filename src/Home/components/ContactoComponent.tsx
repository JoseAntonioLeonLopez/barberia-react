import React from "react";

const ContactoComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-barber-bg dark:bg-dark-mode-bg py-12 px-6 font-barber">
      <h1 className="text-4xl font-bold text-barber-primary text-center mb-12">
        Contáctanos
      </h1>
      
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Formulario de contacto */}
        <div className="bg-white dark:bg-dark-mode-bg2 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-barber-secondary dark:text-dark-mode-text">
            Envíanos un mensaje
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-barber-secondary dark:text-dark-mode-text">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full p-3 rounded-lg border border-gray-300 dark:bg-dark-mode-bg2 dark:border-gray-600 dark:text-dark-mode-text focus:outline-none focus:ring-2 focus:ring-barber-primary"
              />
            </div>
            <div>
              <label className="block mb-2 text-barber-secondary dark:text-dark-mode-text">
                Correo electrónico
              </label>
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full p-3 rounded-lg border border-gray-300 dark:bg-dark-mode-bg2 dark:border-gray-600 dark:text-dark-mode-text focus:outline-none focus:ring-2 focus:ring-barber-primary"
              />
            </div>
            <div>
              <label className="block mb-2 text-barber-secondary dark:text-dark-mode-text">
                Mensaje
              </label>
              <textarea
                placeholder="Tu mensaje"
                className="w-full p-3 rounded-lg border border-gray-300 dark:bg-dark-mode-bg2 dark:border-gray-600 dark:text-dark-mode-text focus:outline-none focus:ring-2 focus:ring-barber-primary h-40 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-barber-primary text-white dark:bg-barber-secondary hover:bg-barber-secondary dark:hover:bg-barber-primary transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>

        {/* Información de contacto */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-dark-mode-bg2 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-barber-secondary dark:text-dark-mode-text mb-4">
              Información de contacto
            </h2>
            <p className="text-lg text-barber-secondary dark:text-dark-mode-text mb-2">
              <b>Teléfono:</b> +34 123 456 789
            </p>
            <p className="text-lg text-barber-secondary dark:text-dark-mode-text mb-2">
              <b>Email:</b> contacto@barberia.com
            </p>
            <p className="text-lg text-barber-secondary dark:text-dark-mode-text">
              <b>Dirección:</b> Calle Falsa 123, Sevilla, España
            </p>
          </div>

          {/* Mapa de Google */}
          <div className="bg-white dark:bg-dark-mode-bg2 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-barber-secondary dark:text-dark-mode-text mb-4">
              Nuestra ubicación
            </h2>
            <iframe
              title="Mapa de ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.2087516146845!2d-5.755347273266644!3d37.373479913907865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126ef2410f7f33%3A0x404893be6634f50!2sSevilla!5e0!3m2!1ses!2ses!4v1690123988897!5m2!1ses!2ses"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactoComponent;
