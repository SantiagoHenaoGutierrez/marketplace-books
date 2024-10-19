// src/services/api.js
import axios from 'axios';

/**
 * URL base de la API
 *
 * Se obtiene del entorno de desarrollo (process.env.REACT_APP_API_URL) o se utiliza una URL por defecto si no está definida.
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Cliente HTTP basado en Axios
 *
 * Se crea una instancia de Axios para realizar peticiones HTTP a la API. La URL base se establece en `API_URL`.
 */

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use((config) => {

    /**
   * Verificación del token de localStorage
   *
   * Se recupera el token de localStorage.
   * Si existe un token, se agrega al encabezado de autorización de la petición con el formato `Bearer <token>`.
   */

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    /**
     * Manejo de errores 401 (No autorizado)
     *
     * Si la respuesta del servidor tiene un código de estado 401 (No autorizado), se realizan las siguientes acciones:
     *  - Elimina el token del localStorage.
     *  - Redirige al usuario a la página de login.
     */
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Servicio de autenticación
 *
 * Este objeto contiene funciones relacionadas con la autenticación del usuario:
 *  - login: Iniciar sesión (email y password).
 *  - register: Registrar un nuevo usuario (datos del usuario).
 *  - registerProfile: Completar el perfil de un usuario registrado (datos del usuario).
 *  - verifyToken: Verificar la validez del token de autenticación (opcional).
 */

export const authService = {
  login: async (email, password) => {
    try {
         /**
       * Petición POST a /auth/login
       *
       * Se envía una petición POST a la API con la ruta `/auth/login`.
       * El cuerpo de la petición contiene el email y password del usuario.
       */
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      console.error('Error en login:', error.response || error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error.response || error);
      throw error;
    }
  },

  registerProfile: async (userData) => {
    try {
      const response = await api.post('/auth/registerProfile', userData);
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error.response || error);
      throw error;
    }
  },

  // Método para verificar si el token es válido
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const productService = {
    getProducts: async () => {
      try {
        const response = await api.get('/products');
        return response.data;
      } catch (error) {
        console.error('Error al obtener la lista de productos:', error.response || error);
        throw error;
      }
    },
  
    createProduct: async (bookData) => {
      try {
        const response = await api.post('/products', bookData);
        return response.data;
      } catch (error) {
        console.error('Error al agregar libro:', error.response || error);
        throw error;
      }
    }
  };

  export const cartService = async (productId) => {
    try {
      const response = await api.post('/cart/add', { productId });
      return response.data;
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      throw error;
    }
  };

export default api;