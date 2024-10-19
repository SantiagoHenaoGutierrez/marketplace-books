
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RegisterProfile from './components/auth/RegisterProfile';
import ProductList from './components/products/ProductList';
import Cart from './components/cart/Cart';
import AddProduct from './components/products/AddProduct';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';


const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

function App() {

  return (
    <Router>
       {/* Proveedor de contexto de autenticación */}
      <AuthProvider>
        <AppContainer>
          <Navbar />
          <Routes>
             {/* Rutas protegidas: solo accesibles si el usuario está autenticado */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registerProfile" element={<RegisterProfile />} />
            <Route path="/products" element={<ProductList />} />
            <Route 
              path="/cart" 
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/add-product" 
              element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              } 
            />
            {/* Ruta por defecto para rutas no encontradas */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppContainer>
      </AuthProvider>
    </Router>
  );
}

export default App;