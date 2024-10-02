import styled from "styled-components";
import { InnerContainerProps, InputTextProps } from "./types";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 1rem;
`;

export const InnerContainer = styled.div<InnerContainerProps>`
  display: flex;

  justify-content: ${({ $justifycontent }) => $justifycontent || "flex-start"};
  align-items: ${({ $alignitems }) => $alignitems || "flex-start"};
  padding: ${({ $padding }) => $padding || "0"};
  margin: ${({ $margin }) => $margin || "0"};
  gap: 1rem;
`;

export const Image = styled.img`
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 2rem;
`;

export const InputText = styled.textarea<InputTextProps>`
  flex: 1;
  border: none;
  outline: none;

  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 1.25rem;
  font-style: normal;
  resize: none;
  overflow: hidden;
  border-bottom: ${({ $scrollHeight }) =>
    $scrollHeight == 0 ? "none" : "1px solid #eeeeee"};
  height: ${({ $scrollHeight }) => {
    if ($scrollHeight > 300) {
      return "300px";
    } else if ($scrollHeight < 50) {
      return "50px";
    }
    return `${$scrollHeight}px`;
  }};
`;

export const IconsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0 1rem;
`;
