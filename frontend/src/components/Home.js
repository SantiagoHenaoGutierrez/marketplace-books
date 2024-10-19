import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;   

  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  background-image: url('/images/biblioteca.jpg');   

  background-size: cover;
  background-position: center;
  font-family: 'Montserrat', sans-serif;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.8); /* Fondo blanco semitransparente */
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  // ...
`;

const Subtitle = styled.h2`
  // ...
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 1rem;
  margin-top: 2rem;
`;

const StyledLink = styled(Link)`
  // ...
`;

function Home() {
  return (
    <HomeContainer>
      <ContentContainer>
        <Title>Bienvenido a tu librería</Title>
        <Subtitle>Explora, compra y disfruta</Subtitle>
        <ButtonContainer>
          <StyledLink to="/products">Ver productos</StyledLink>
          <StyledLink to="/login">Iniciar sesión</StyledLink>
        </ButtonContainer>
      </ContentContainer>
    </HomeContainer>
  );
}

export default Home;