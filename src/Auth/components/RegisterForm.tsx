import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import PasswordField from './PasswordField';
import ConfirmPasswordField from './ConfirmPasswordField';
import axios from 'axios';

// Patrón de validación para la contraseña
const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const RegisterForm = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });

  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'telefono') {
      const phoneNumber = value.replace(/^\+34\s*/, '').replace(/\s+/g, '');
      setForm((prev) => ({ ...prev, [name]: phoneNumber }));

      if (!validatePhoneNumber(`+34 ${phoneNumber}`)) {
        setPhoneError('Número de teléfono no válido');
      } else {
        setPhoneError('');
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));

      if (name === 'password') {
        if (!PASSWORD_PATTERN.test(value)) {
          setPasswordError('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.');
        } else {
          setPasswordError('');
        }
      }

      if (name === 'confirmPassword') {
        if (value !== form.password) {
          setConfirmPasswordError('Las contraseñas no coinciden');
        } else {
          setConfirmPasswordError('');
        }
      }
    }
  };

  const validatePhoneNumber = (number: string) => {
    const PHONE_NUMBER_PATTERN = /^\+34\s[6789]\d{8}$/;
    return PHONE_NUMBER_PATTERN.test(number);
  };

  
  // Validaciones y lógica de autenticación
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar si hay errores antes de enviar
    if (phoneError || passwordError || confirmPasswordError) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí puedes hacer la solicitud POST a la API
      const response = await axios.post('/api/register', form);

      // Manejar la respuesta de la API
      console.log('Registro exitoso:', response.data);
    } catch (error) {
      console.error('Error al registrar:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        isRequired
        label="Nombre"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        variant="underlined"
      />
      <Input
        isRequired
        label="Primer Apellido"
        name="apellido1"
        value={form.apellido1}
        onChange={handleChange}
        variant="underlined"
      />
      <Input
        label="Segundo Apellido"
        name="apellido2"
        value={form.apellido2}
        onChange={handleChange}
        variant="underlined"
      />
      <Input
        isRequired
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        variant="underlined"
      />
      <Input
        isRequired
        label="Teléfono"
        name="telefono"
        value={`+34 ${form.telefono}`}
        onChange={handleChange}
        isInvalid={!!phoneError}
        errorMessage={phoneError}
        variant="underlined"
      />
      <PasswordField
        label="Contraseña"
        name="password"
        value={form.password}
        onChange={handleChange}
        pattern={PASSWORD_PATTERN}
        errorMessage={passwordError}
      />
      <ConfirmPasswordField
        label="Confirmar Contraseña"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
        password={form.password}
        errorMessage={confirmPasswordError}
      />
      <Button
        type="submit"
        className="w-full bg-barber-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Registrarse'}
      </Button>
    </form>
  );
};

export default RegisterForm;
