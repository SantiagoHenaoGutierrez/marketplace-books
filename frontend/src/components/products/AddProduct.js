// // src/components/products/AddProduct.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { productService } from '../../services/api';
import styled from 'styled-components';

const CreateProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    outline: 1px solid #28a745;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;   

  font-weight: bold;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

function CreateProduct() {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const [author, setAuthor] = useState('');
  const [editorial, setEditorial] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();   


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const productData = {
        isbn,
        title,
        price: parseFloat(price),
        author,
        editorial,
        imageUrl,
        stock: parseInt(stock),
      };

      await productService.createProduct(productData);
      alert('Producto creado exitosamente');
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirigir a login si no está autenticado
    }
  }, [user, navigate]);

  return (
    <CreateProductContainer>
      <Title>Agrega un nuevo libro a la librería</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="isbn">ISBN</Label>
        <Input type="text" id="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        <Label htmlFor="title">Título</Label>   

        <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Label htmlFor="price">Precio</Label>   

        <Input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <Label htmlFor="author">Autor</Label>
        <Input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <Label htmlFor="editorial">Editorial</Label>
        <Input type="text" id="editorial" value={editorial} onChange={(e) => setEditorial(e.target.value)} required />
        <Label htmlFor="imageUrl">Imagen del Libro (URL)</Label>
        <Input type="url" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <Label htmlFor="stock">Cantidad en Stock</Label>
        <Input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
        <Button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Agregar Producto'}
        </Button>
      </Form>
    </CreateProductContainer>
  );
}



export default CreateProduct;