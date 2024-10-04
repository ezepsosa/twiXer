import styled from "styled-components";
import { InnerContainerProps } from "./types";

export const Container = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const InnerContainer = styled.div<InnerContainerProps>`
  border: ${({ $border }) => $border || "1px solid #eeeeee"};
  width: ${({ $width }) => $width || ""};
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${({ $toHide }) =>
    $toHide &&
    `
    @media (max-width: 768px) {
      display: none;
}`}
`;
