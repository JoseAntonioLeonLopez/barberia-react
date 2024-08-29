import React, { useState } from 'react';
import { Input } from '@nextui-org/react';
import { EyeFilledIcon } from '../icons/EyeFilledIcon';
import { EyeSlashFilledIcon } from '../icons/EyeSlashFilledIcon';

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pattern?: RegExp;
  errorMessage?: string;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  name,
  value,
  onChange,
  pattern,
  errorMessage
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Verifica si el valor de la contraseña cumple con el patrón
  const isPatternValid = pattern ? pattern.test(value) : true;

  // Solo mostrar el mensaje de error si el campo no está vacío
  const shouldShowError = value.length > 0 && !isPatternValid;

  return (
    <div className="relative">
      <Input
        isRequired
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? 'text' : 'password'}
        variant="underlined"
        errorMessage={shouldShowError && errorMessage}
        isInvalid={shouldShowError || !!errorMessage}
      />
    </div>
  );
};

export default PasswordField;
