// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Contexto de autenticación para la aplicación.
 *
 * Este contexto proporciona información y funciones relacionadas con el estado de autenticación del usuario.
 * Los componentes de la aplicación pueden acceder a estos datos y funciones a través del hook `useAuth`.
 */

const AuthContext = createContext(null);

/**
 * Proveedor de contexto de autenticación.
 *
 * Este componente envolverá la aplicación y proporcionará el contexto de autenticación a sus hijos.
 * Gestiona el estado de autenticación del usuario (incluyendo datos de usuario y token) y expone funciones para iniciar sesión, cerrar sesión y verificar el estado de carga.
 *
 * @param {object} props - Propiedades del componente, incluyendo los hijos a los que se les brindará el contexto.
 * @returns {React.ReactElement} El componente del proveedor de contexto.
 */

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Limpiar el token al iniciar la aplicación
    localStorage.removeItem('token');
    setLoading(false);
  }, []);

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar la aplicación
    const token = localStorage.getItem('token');
    if (token) {
      // Verificar si el token es válido decodificándolo
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        // Verificar si el token no ha expirado
        if (payload.exp * 1000 > Date.now()) {
          setUser({ token, ...payload });
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

/**
   * Función para iniciar sesión de un usuario.
   *
   * Actualiza el estado del usuario con los datos proporcionados y almacena el token en localStorage.
   *
   * @param {object} userData - Objeto con los datos del usuario (incluyendo token)
   */

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
  };

  /**
   * Función para cerrar la sesión del usuario actual.
   *
   * Elimina los datos del usuario del estado y el token de localStorage. Redirige a la página de login.
   */
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};