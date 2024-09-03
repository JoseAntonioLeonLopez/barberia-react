import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir
import { getRoleFromToken } from "../../Service/AuthService";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Inicializa useNavigate

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
        "http://localhost:8090/api/security/oauth/token",
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
