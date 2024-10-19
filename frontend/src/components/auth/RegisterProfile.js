
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #0067cc;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: green;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

/**
 * Componente de registro de perfil para completar la información de un usuario recién creado.
 * 
 * Este componente permite a los usuarios recién registrados ingresar su nombre completo, dirección, URL de la foto de perfil 
 * además de los datos básicos de correo electrónico y contraseña (que posiblemente se hayan obtenido en otro paso).
 * Al enviar el formulario, se valida la información y se envía una solicitud al servidor para registrar 
 * el perfil completo del usuario.
 */

function RegisterProfile() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
    photoUrl: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  /**
   * Manejador del envío del formulario de registro de perfil.
   * 
   * Valida la información del formulario y envía una solicitud al servidor para registrar el perfil del usuario.
   * 
   * @param {Event} e - El evento de envío del formulario.
   * @async
   * @throws {Error} Si ocurre un error durante el proceso de registro del perfil.
   */
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await authService.registerProfile(formData);
      console.log('Usuario registrado exitosamente:', response.data);
      navigate('/Products'); // Or your desired route after registration
      // Display success message
    } catch (error) {
      setError(error.response?.data?.message || 'Error al registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Registro de Perfil</h2>
      <Input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="name"
        placeholder="Nombre completo"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="address"
        placeholder="Dirección"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="photoUrl"
        placeholder="URL de la foto"
        value={formData.photoUrl}
        onChange={handleChange}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar'}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}

    </Form>
  );
}

export default RegisterProfile;