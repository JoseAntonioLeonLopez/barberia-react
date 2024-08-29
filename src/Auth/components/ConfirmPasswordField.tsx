import React from 'react';
import { Input } from '@nextui-org/react';

interface ConfirmPasswordFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password: string; // La contraseña principal para comparar
  errorMessage?: string; // Mensaje de error cuando las contraseñas no coinciden
}

const ConfirmPasswordField: React.FC<ConfirmPasswordFieldProps> = ({
  label,
  name,
  value,
  onChange,
  password,
  errorMessage
}) => {
  // Verifica en tiempo real si las contraseñas coinciden
  const isMatch = value === password;

  return (
    <div className="relative mb-4">
      <Input
        isRequired
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type="password"
        variant="underlined"
        errorMessage={errorMessage}
        isInvalid={!!errorMessage || !isMatch}
      />
    </div>
  );
};

export default ConfirmPasswordField;
