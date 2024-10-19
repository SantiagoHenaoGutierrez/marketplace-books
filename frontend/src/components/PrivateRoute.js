// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Componente de ruta privada que protege rutas específicas de la aplicación.
 *
 * Este componente verifica si el usuario está autenticado antes de permitir el acceso a las rutas protegidas.
 * Si el usuario no está autenticado, se redirige a la página de inicio de sesión.
 *
 * @param {object} props - Propiedades del componente, incluyendo los hijos a renderizar.
 * @returns {React.ReactElement | null} El componente a renderizar o null si el usuario no está autenticado.
 */

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Puedes mostrar un spinner o loading indicator aquí
    return <div>Cargando...</div>;
  }

  if (!user) {
    // Redirigir a login y guardar la ubicación intentada
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;