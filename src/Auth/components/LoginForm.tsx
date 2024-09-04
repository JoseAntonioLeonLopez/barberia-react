import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getRoleFromToken } from "../../Service/AuthService";
import { API_URL } from "../../Service/Url";
import { useAuth } from "../context/AuthContext"; // Importar el hook de autenticación

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { updateAuth } = useAuth(); // Obtener la función updateAuth para actualizar el contexto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);
    formData.append("grant_type", "password");

    try {
      const response = await axios.post(
        `${API_URL}security/oauth/token`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic ZnJvbnRlbmQ6MTIzNDU=", // Credenciales base64 codificadas de cliente (clientId:clientSecret)
          },
        }
      );

      const { access_token } = response.data;
      sessionStorage.setItem("access_token", access_token);

      // Actualizar la autenticación después de guardar el token
      updateAuth();

      // Decodifica el JWT y obtiene el rol
      const role = getRoleFromToken(access_token);

      // Redirige según el rol
      switch (role) {
        case "ADMIN":
          navigate("/dashboard");
          break;
        case "BARBER":
          navigate("/barber");
          break;
        case "CLIENT":
          navigate("/");
          break;
        default:
          navigate("/");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      setError("Credenciales incorrectas. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        isRequired
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="underlined"
      />
      <Input
        isRequired
        type="password"
        label="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="underlined"
      />
      <br />
      {error && (
        <p style={{ color: "red" }} className="mb-2">
          {error}
        </p>
      )}
      <Button
        type="submit"
        className="w-full bg-barber-primary"
        disabled={loading}
      >
        {loading ? "Iniciando..." : "Iniciar Sesión"}
      </Button>
    </form>
  );
};

export default LoginForm;
