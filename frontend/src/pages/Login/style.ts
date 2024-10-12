import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  background-color: black;
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 65%;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 35%;
  gap: 2rem;
`;

export const BigLogo = styled.img`
  filter: invert(1);
  max-width: 70%;
  max-height: 70%;
`;
