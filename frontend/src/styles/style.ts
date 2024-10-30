import styled from "styled-components";
import {
  ImgProps,
  PrimaryBtnProps,
  PrimaryButtonProps,
  TextProps,
  styledLinkPostProps,
} from "../components/types";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  height: 100%;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  overflow-y: auto;
`;

export const Main = styled.main`
  overflow-y: auto;
`;

const StyledLinkMenu = styled.a`
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

export const LinkMenu = styled(StyledLinkMenu)`
  background-color: #0000;
  &:hover {
    background-color: #efeeee;
    transition: 0.5s;
  }
`;

export const LinkPost = styled(StyledLinkMenu)<styledLinkPostProps>`
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

export const Image = styled.img<ImgProps>`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 2rem;
  filter: ${({ $filter }) => {
    if ($filter) {
      return "invert(1)";
    }
  }};
`;

export const PrimaryBtn = styled.button<PrimaryBtnProps>`
  border: 1px solid gray;
  border-radius: 2rem;
  height: 1.8rem;
  padding: 0 1.1rem;
  font-weight: 700;
  font-style: normal;
  font-size: 0.875rem;
  cursor: pointer;
  color: ${({ $color }) => $color || "#ffff"};
  background-color: ${({ $backgroundColor }) => $backgroundColor || "#0f1419"};
  &:hover {
    background-color: ${({ $hoverBackgroundColor }) =>
      $hoverBackgroundColor || "#272c30"};
    border: ${({ $hoverBorder }) => $hoverBorder || "0 solid black"};
    color: ${({ $hoverColor }) => $hoverColor || "#ffff"};
    transition: 0.5s;
  }
`;

export const PrimarySpan = styled.span<TextProps>`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: ${({ $fontSize }) => $fontSize || "0.8rem"};
  color: ${({ $color }) => $color || "black"};
`;
export const SecondarySpan = styled.span<TextProps>`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: ${({ $fontSize }) => $fontSize || "0.75rem"};
  color: ${({ $color }) => $color || "#616161"};
  display: flex;
  justify-content: center;
  gap: 0.3rem;
`;
export const UserUniqueNameText = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
  color: #536471;
  margin: 0;
`;

export const TitleCard = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 1rem;
`;

export const PrimaryText = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 0.85rem;
  font-style: normal;
  max-width: 100%;
  word-wrap: break-word;
  white-space: normal;
  margin: 0;
`;
export const Media = styled.img``;

export const PrimaryButton = styled.button<PrimaryButtonProps>`
  margin: 0.25rem 0;
  width: 18rem;
  height: 2.2rem;
  background-color: ${({ $backgrdoundColor }) => $backgrdoundColor || "black"};
  color: ${({ $color }) => $color || "#1d9bf0"};
  border: ${({ $borderLine }) => $borderLine || "1px solid #1d9bf0"};
  border-radius: 1rem;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  &:hover {
    background-color: ${({ $hoverBackgroundColor }) =>
      $hoverBackgroundColor || "#031018"};
  }
`;

export const InputText = styled.input<TextProps>`
  background-color: black;
  border: 1px solid #8d8d8d;
  height: 2rem;
  width: 15rem;
  padding: 0.4rem;
  border-radius: 0.25rem;
  color: ${({ $color }) => $color || "white"};
`;

export const StyledLink = styled.a``;

export const ErrorSpan = styled.span<TextProps>`
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: red;
  font-size: 0.8rem;
`;
