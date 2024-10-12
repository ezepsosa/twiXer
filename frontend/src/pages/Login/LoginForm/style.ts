import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  padding: 0 1rem;
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  background-color: black;
  width: 25rem;
  text-align: center;
  flex-direction: column;
  display: flex;
  gap: 1rem;
  justify-content: space-around;
  height: 30rem;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #36363670;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const TopInnerContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const MiddleInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const BottomInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
`;

export const CloseButtonContainer = styled.div`
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
`;

export const StyledLinkLogin = styled(Link)`
  color: #1d9bf0;
  font-size: 0.75rem;
  cursor: pointer;
  text-decoration: none;
`;
