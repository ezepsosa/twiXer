import styled, { keyframes } from "styled-components";

const l1 = keyframes`
  100% {
    box-shadow: 0 0 0 30px #0000;
  }
`;

export const Loader = styled.div`
  width: 1rem;
  height: 1rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #000;
  box-shadow: 0 0 0 0 #0004;
  animation: ${l1} 1s infinite;
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
