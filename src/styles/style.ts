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
  width: ${({ width }) => width || "11rem"};
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

export const Image = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2rem;
`;

export const PrimaryBtn = styled.button`
  border: 0 solid black;
  border-radius: 2rem;
  height: 2rem;
  padding: 0 1rem;
  font-weight: 700;
  font-style: normal;
  font-size: 0.875rem;
  cursor: pointer;
  color: #ffff;
  background-color: #0f1419;
  &:hover {
    background-color: #272c30;
    transition: 0.5s;
  }
`;

export const UserNameText = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  margin: 0;
`;

export const UserUniqueNameText = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
  font-style: italic;
  color: #536471;
  margin: 0;
`;
