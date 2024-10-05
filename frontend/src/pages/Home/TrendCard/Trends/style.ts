import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem;
  cursor: pointer;
  width: 18rem;
  &:hover {
    background-color: #f3f3f3;
  }
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InfoUserContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6rem;
  juistify-content: space-between;
`;
