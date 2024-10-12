import styled from "styled-components";

export const SearchInput = styled.input`
  height: 2.5rem;
  width: 80%;
  border: none;
  background-color: #f3f3f3;
  border-radius: 2rem;
  outline: none;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-style: normal;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  padding: 0 2rem;
  &:focus {
    background-color: #ffffff;
    outline: 1.4px solid #1d9bf0;
  }
`;

export const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;

  // Styles to mantain the navbar in the upper level
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: white;
`;

export const IconContainer = styled.div`
  position: absolute;
  left: 0.7rem; /* Ajusta la distancia del ícono al borde derecho */
  top: 43%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none; /* Evita que el ícono interfiera con la entrada de texto */
`;
