import styled from "styled-components";
import { styledLinkPostProps } from "../components/types";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const StyledLink = styled.a`
  border: 0 solid black;
  text-align: center;
  border-radius: 2rem;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Syne", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
  font-size: 1.2rem;
  cursor: pointer;
`;

export const StyledLinkMenu = styled(StyledLink)`
  background-color: #0000;

  &:hover {
    background-color: #efeeee;
    transition: 0.5s;
  }
`;

export const StyledLinkPost = styled(StyledLink)<styledLinkPostProps>`
  background-color: #1d9bf0;
  color: white;
  width: ${({ width }) => width || "100%"};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1rem;

  &:hover {
    background-color: #1b85cd;
    transition: 0.5s;
  }
`;
