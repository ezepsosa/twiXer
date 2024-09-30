import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  align-items: flex-start;
  gap: 1rem;
`;

export const Enlace = styled.a`
  background-color: white;
  border: 0 solid black;
  text-align: center;
  border-radius: 2rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Syne", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-size: 1.1rem;
  cursor: pointer;

  &:hover {
    background-color: #efeeee;
    transition: 0.5s;
  }
`;
