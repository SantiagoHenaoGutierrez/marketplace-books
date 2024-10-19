// // // src/components/Navbar.js
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { useAuth } from '../context/AuthContext';

// const Nav = styled.nav`
//   background-color: #333;
//   padding: 1rem;
//   margin-bottom: 2rem;
// `;

// const NavContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const NavBrand = styled(Link)`
//   color: white;
//   text-decoration: none;
//   font-size: 1.5rem;
//   font-weight: bold;
// `;

// const NavLinks = styled.div`
//   display: flex;
//   gap: 1rem;
// `;

// const NavLink = styled(Link)`
//   color: white;
//   text-decoration: none;
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #555;
//   }
// `;

// const NavButton = styled.button`
//   color: white;
//   background: none;
//   border: 1px solid white;
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: all 0.3s;

//   &:hover {
//     background-color: white;
//     color: #333;
//   }
// `;

// function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <Nav>
//       <NavContainer>
//         <NavBrand to="/">Mi Tienda</NavBrand>
//         <NavLinks>
//           <NavLink to="/products">Productos</NavLink>
//           {user ? (
//             <>
//               <NavLink to="/cart">Carrito</NavLink>
//               <NavLink to="/add-product">Agregar Producto</NavLink>
//               <NavLink to="/profile">perfil</NavLink>
//               <NavButton onClick={handleLogout}>Cerrar Sesión</NavButton>
//             </>
//           ) : (
//             <>
//               <NavLink to="/login">Iniciar Sesión</NavLink>
//               <NavLink to="/register">Registrarse</NavLink>
//             </>
//           )}
//         </NavLinks>
//       </NavContainer>
//     </Nav>
//   );
// }

// export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext'; // Añade esta importación

const Nav = styled.nav`
  background-color: #333;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavBrand = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const NavButton = styled.button`
  color: white;
  background: none;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    color: #333;
  }
`;

function Navbar() {
  const { user, logout } = useAuth(); // Ahora useAuth está disponible
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Nav>
      <NavContainer>
        <NavBrand to="/">Mi Tienda</NavBrand>
        <NavLinks>
          <NavLink to="/products">Productos</NavLink>
          {user ? (
            <>
              <NavLink to="/cart">Carrito</NavLink>
              <NavLink to="/add-product">Agregar Producto</NavLink>
              <NavLink to="/registerProfile">Perfil</NavLink>
              <NavButton onClick={handleLogout}>Cerrar Sesión</NavButton>
            </>
          ) : (
            <>
              <NavLink to="/login">Iniciar Sesión</NavLink>
              <NavLink to="/register">Registrarse</NavLink>
            </>
          )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}

export default Navbar;