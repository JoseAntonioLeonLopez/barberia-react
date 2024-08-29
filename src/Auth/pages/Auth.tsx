import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import ThemeToggle from "../../Global Components/ThemeToggle";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {/* Componente para cambiar el tema */}
      <ThemeToggle />

      <div className="min-h-screen flex items-center justify-center bg-barber-bg dark:bg-dark-mode-bg px-4">
        <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-dark-mode-bg2 w-full max-w-sm md:max-w-md lg:max-w-lg">
          {/* Sección de bienvenida */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold font-barber text-barber-primary dark:text-barber-primary-dark">
              Bienvenido a nuestra barbería
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Por favor, inicia sesión o regístrate para continuar.
            </p>
          </div>

          {/* Formulario de inicio de sesión o registro */}
          {isLogin ? <LoginForm /> : <RegisterForm />}

          {/* Botones para cambiar entre login y registro */}
          <div className="mt-3 text-center space-y-2 ">
            {isLogin ? (
              <p>
                ¿No tienes cuenta? <br />
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-barber-primary underline"
                >
                  Regístrate
                </button>
              </p>
            ) : (
              <p>
                ¿Ya tienes cuenta? <br />
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-barber-primary underline"
                >
                  Inicia sesión
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
