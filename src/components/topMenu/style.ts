import styled from "styled-components";
import { StyledLinkProps } from "./types";

export const Nav = styled.nav`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: normal;
  cursor: pointer;
`;

export const StyledLink = styled.div<StyledLinkProps>`
  padding: 1rem 5rem;
  text-decoration: none;
  color: #333333;
  transition: 0.5s;
  &:hover {
    background-color: #d8d8d8;
  }
  &.active {
    border-bottom: 2px solid #000000; /* Línea debajo del enlace activo */
    font-weight: bold; /* Puedes hacer el texto en negrita o cambiar color */
  }
  ${({ $isactive }) =>
    $isactive &&
    `
    border-bottom: 3px solid #1d9bf0;
    font-weight: bold;
  `}
`;
//TODO bottom line when isactive must be shorter
