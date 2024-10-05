import styled from "styled-components";
import { GridContainerProps } from "./types";

export const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-bottom: 1px solid #eeeeee;

  &:hover {
    background-color: #f3f3f3;
    cursor: pointer;
  }
`;

export const InfoUserContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 0.3rem;
  align-items: center;
`;

export const InfoTweetContainer = styled.div``;

export const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  margin-top: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  gap: 0.4rem;
  box-sizing: border-box;

  grid-template-columns: ${({ $mediaNumber }) => {
    if ($mediaNumber == 1) {
      return "100%";
    } else if ($mediaNumber > 1) {
      return "50% 50%";
    } else {
      return `33% 33% 33%`;
    }
  }};
`;

export const GridItem = styled.div`
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 0.5rem;
  padding: 0 1rem;
`;

export const SingleIconContainer = styled.div`
  &:hover {
    background-color: #bbe1ff;
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 1rem;
  }
`;
