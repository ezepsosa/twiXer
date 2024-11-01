import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  justify-content: space-between;
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
  gap: 0.5rem;
`;
