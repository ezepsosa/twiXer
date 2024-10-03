import styled from "styled-components";

export const InputText = styled.input`
  height: 2.5rem;
  width: 70%;
  border: none;
  background-color: #f3f3f3;
  border-radius: 2rem;
  outline: none;
  margin: 0.25rem;
  padding: 0 2rem;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-style: normal;

  &:focus {
    background-color: #ffffff;
    outline: 1.4px solid #1d9bf0;
  }
`;

export const Container = styled.div`
  position: relative;
  display: inline-block;
  width: 15rem;
`;

export const IconContainer = styled.div`
  position: absolute;
  left: 0.7rem; /* Ajusta la distancia del ícono al borde derecho */
  top: 55%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none; /* Evita que el ícono interfiera con la entrada de texto */
`;
