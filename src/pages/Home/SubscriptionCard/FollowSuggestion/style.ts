import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f3f3f3;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6rem;
  juistify-content: space-between;
`;
