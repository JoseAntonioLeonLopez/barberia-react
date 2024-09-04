import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import PasswordField from './PasswordField';
import ConfirmPasswordField from './ConfirmPasswordField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../Service/Url';

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
  const [apiError, setApiError] = useState(''); // Para mostrar los errores del backend

  const navigate = useNavigate(); // Hook para redirigir al usuario

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verificar si hay errores antes de enviar
    if (phoneError || passwordError || confirmPasswordError) {
      return;
    }

    setIsSubmitting(true);
    setApiError(''); // Limpiar los errores previos

    try {
      // Aquí haces la solicitud POST a la API para registrar al usuario
      await axios.post(`${API_URL}users`, {
        email: form.email,
        password: form.password,
        name: form.nombre,
        firstSurname: form.apellido1,
        secondSurname: form.apellido2,
        phoneNumber: form.telefono,
        roleId: 2, // El rol por defecto, puede ser CLIENT (2) o según cómo lo manejes
      });

      // Si el registro es exitoso, inicia sesión automáticamente
      const loginFormData = new URLSearchParams();
      loginFormData.append('username', form.email);
      loginFormData.append('password', form.password);
      loginFormData.append('grant_type', 'password');

      const loginResponse = await axios.post(
        `${API_URL}security/oauth/token`,
        loginFormData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ZnJvbnRlbmQ6MTIzNDU=', // Credenciales base64 codificadas de cliente (clientId:clientSecret)
          },
        }
      );

      const { access_token } = loginResponse.data;
      sessionStorage.setItem('access_token', access_token);
      navigate('/');
    } catch (error: any) {
      // Maneja los errores de la API y los muestra
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message || 'Error al registrar el usuario.';
        setApiError(errorMessage);
      } else {
        setApiError('Error en la red. Por favor, inténtalo de nuevo.');
      }
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

      {apiError && <p className="text-red-500 mb-2">{apiError}</p>} {/* Mostrar errores del backend */}

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
