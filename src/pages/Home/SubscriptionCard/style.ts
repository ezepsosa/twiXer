import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #eeeeee;
  border-radius: 1rem;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TitleCard = styled.h1`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  margin: 1rem;
`;

export const ShowMoreLink = styled.a`
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  text-align: center;
  padding: 1rem;
  display: flex;
  align-items: center;
  font-family: "Syne", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 0.9rem;
  cursor: pointer;
  color: #1d9bf0;

    &:hover {
    background-color: #f3f3f3;
`;
