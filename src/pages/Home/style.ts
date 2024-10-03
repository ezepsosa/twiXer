import styled from "styled-components";
import { InnerContainerProps } from "./types";

export const Container = styled.div`
  display: flex;
`;

export const InnerContainer = styled.div<InnerContainerProps>`
  border: ${({ $border }) => $border || "1px solid #eeeeee"};
  margin: 0 1rem;
`;
