import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  align-items: flex-start;
  gap: 1rem;
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
  font-size: 1.1rem;
  cursor: pointer;
`;

export const StyledLinkMenu = styled(StyledLink)`
  background-color: white;

  &:hover {
    background-color: #efeeee;
    transition: 0.5s;
  }
`;

export const StyledLinkPost = styled(StyledLink)`
  background-color: #1d9bf0;
  color: white;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  &:hover {
    background-color: #1b85cd;
    transition: 0.5s;
  }
`;
