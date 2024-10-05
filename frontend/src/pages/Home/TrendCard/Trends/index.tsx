import { PrimarySpan, SecondarySpan } from "../../../../styles/style";
import { Container, TextContainer } from "./style";
import { Props } from "./types";
import { Fragment } from "react"; // Agregar Fragment para uso correcto en el JSX

export function Trends({ trends }: Props) {
  return (
    <Fragment>
      {trends?.length > 0 ? (
        trends.map((trend, index) => (
          <Container key={index}>
            <TextContainer>
              <SecondarySpan>
                {index + 1} - {trend.type} · Trending
              </SecondarySpan>
            </TextContainer>
            <TextContainer>
              <PrimarySpan>{trend.trendName}</PrimarySpan>
            </TextContainer>
            <TextContainer>
              <SecondarySpan>{trend.count} posts</SecondarySpan>
            </TextContainer>
          </Container>
        ))
      ) : (
        <p>No trends available</p>
      )}
    </Fragment>
  );
}
