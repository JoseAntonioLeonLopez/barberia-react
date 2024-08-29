import { Input, Button } from '@nextui-org/react';
import { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  // Validaciones y lógica de autenticación
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  };

  const variant = "underlined";

  return (
    <form onSubmit={handleSubmit}>
      <Input
        isRequired
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant={variant}
      />
      <Input
        isRequired
        type="password"
        label="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant={variant}
      />
      <br/>
      <Button type="submit" className="w-full bg-barber-primary">
        Iniciar Sesión
      </Button>
    </form>
  );
};

export default LoginForm;
