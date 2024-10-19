import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { cartService } from '../../services/cartService';

const CartContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
`;

const ItemInfo = styled.div`
  flex-grow: 1;
`;

const ItemPrice = styled.div`
  font-weight: bold;
  margin: 0 20px;
`;

const CartSummary = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 4px;
`;

const CheckoutButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  font-size: 1.1em;

  &:hover {
    background: #218838;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin: 10px 0;
`;

/**
 * Componente para mostrar el contenido del carrito de compras del usuario.
 * 
 * Este componente permite al usuario visualizar los productos agregados al carrito, 
 * su cantidad, precio individual y precio total. 
 * También brinda opciones para realizar el checkout y vaciar el carrito (no implementado en este ejemplo).
 */

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Efecto secundario para obtener los datos del carrito al cargar el componente.
   */

  useEffect(() => {
    fetchCart();
  }, []);

  /**
   * Función para obtener los datos del carrito del servidor.
   * 
   * Actualiza el estado `cart` con los datos del carrito recuperados.
   * 
   * @async
   * @throws {Error} Si ocurre un error al obtener los datos del carrito.
   */

  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar el carrito');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Manejador del evento de click en el botón de checkout.
   * 
   * Realiza el proceso de checkout del carrito y redirige al usuario a la página de productos
   * o muestra un mensaje de error si ocurre un problema.
   * 
   * @async
   * @throws {Error} Si ocurre un error durante el proceso de checkout.
   */

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await cartService.checkout();
      alert('¡Compra realizada con éxito!');
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al procesar la compra');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!cart || cart.items.length === 0) {
    return <CartContainer>El carrito está vacío</CartContainer>;
  }

  const total = cart.items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  return (
    <CartContainer>
      <h2>Mi Carrito</h2>
      {cart.items.map((item) => (
        <CartItem key={item.id}>
          <ItemInfo>
            <h3>{item.product.title}</h3>
            <p>Cantidad: {item.quantity}</p>
          </ItemInfo>
          <ItemPrice>
            ${(item.product.price * item.quantity).toFixed(2)}
          </ItemPrice>
        </CartItem>
      ))}
      
      <CartSummary>
        <h3>Resumen de la compra</h3>
        <p><strong>Total de productos:</strong> {cart.items.length}</p>
        <p><strong>Total a pagar:</strong> ${total.toFixed(2)}</p>
      </CartSummary>

      <CheckoutButton 
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? 'Procesando...' : 'Realizar Compra'}
      </CheckoutButton>
    </CartContainer>
  );
}

export default Cart;