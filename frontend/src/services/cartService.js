import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const cartService = {
  // Obtener el carrito actual
  getCart: async () => {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },

  // Agregar producto al carrito
  addToCart: async (productId, quantity) => {
    const response = await axios.post(
      `${API_URL}/cart/add`,
      { productId, quantity },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  },

  // Realizar el checkout
  checkout: async () => {
    const response = await axios.post(
      `${API_URL}/cart/checkout`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  }
};