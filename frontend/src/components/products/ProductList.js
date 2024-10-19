// // src/components/products/ProductList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { productService } from '../../services/api';
import { cartService } from '../../services/cartService';

// Improved styling for ProductGrid
const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); // Adjust column width for better responsiveness
  gap: 25px; /* Increased gap for better spacing */
  padding: 30px; /* Added padding for better layout */
  background-color: #f5f5f5; /* Light background for better contrast */
`;

// Improved styling for ProductCard
const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
  display: flex;
  flex-direction: column;
  background-color: #fff; /* White background for better readability */
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px; /* Increased height for better image presentation */
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 15px; /* Adjusted margin for better spacing */
`;

const ProductInfo = styled.div`
  flex-grow: 1; /* Allow content to fill remaining space */
  padding: 10px; /* Added padding for better content containment */
`;

// Improved styling for Button
const Button = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px; /* Increased padding for better visual weight */
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold; /* Added bold text for emphasis */

  &:hover {
    background-color: #218838;
  }

  &[disabled] {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// Improved styling for ErrorMessage
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin: 20px 0; /* Increased margin for better prominence */
  font-size: 1.2rem; /* Increased font size for better readability */
`;

/**
 * Componente para mostrar la lista de productos disponibles en la librería.
 * 
 * Este componente permite a los usuarios visualizar todos los productos 
 * agregados a la base de datos. 
 * Cada producto se muestra en una tarjeta con su imagen, título, autor, editorial, precio, 
 * stock disponible y un botón para agregarlo al carrito de compras. 
 * El botón se muestra deshabilitado si el producto se encuentra sin stock.
 * 
 * Solo los usuarios autenticados pueden agregar productos al carrito. 
 * Si el usuario no está autenticado, se le redirige a la página de login al intentar 
 * agregar un producto.
 */

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

   /**
   * Función para obtener la lista de productos del servidor.
   * 
   * Actualiza el estado `products` con la lista de productos recuperados.
   * 
   * @async
   * @throws {Error} Si ocurre un error al obtener la lista de productos.
   */

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await productService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Manejador del click en el botón "Agregar al carrito".
   * 
   * Intenta agregar el producto seleccionado al carrito del usuario.
   * Si el usuario no está autenticado, redirige al login.
   * 
   * @param {number} productId - Identificador del producto a agregar.
   * @async
   * @throws {Error} Si ocurre un error al agregar el producto al carrito.
   */

  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await cartService.addToCart(productId, 1);
      alert('Producto agregado al carrito exitosamente');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al agregar al carrito');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard key={product.id}>
          <ProductImage 
            src={product.imageUrl || '/placeholder-book.jpg'} 
            alt={product.title} 
          />
          <ProductInfo>
            <h3>{product.title}</h3>
            <p><strong>Autor:</strong> {product.author}</p>
            <p><strong>Editorial:</strong> {product.editorial}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <p><strong>Stock:</strong> {product.stock} unidades</p>
          </ProductInfo>
          <Button 
            onClick={() => handleAddToCart(product.id)}
            disabled={product.stock <= 0}
          >
            {product.stock <= 0 ? 'Sin stock' : 'Agregar al carrito'}
          </Button>
        </ProductCard>
      ))}
    </ProductGrid>
  );
}

export default ProductList;