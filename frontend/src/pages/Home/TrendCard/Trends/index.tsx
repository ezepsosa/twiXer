import { PrimarySpan, SecondarySpan } from "../../../../styles/style";
import { Container, TextContainer } from "./style";
import { Props } from "./types";
import { Fragment } from "react"; // Agregar Fragment para uso correcto en el JSX

export function Trends({ trends }: Props) {
  console.log(trends);
  return (
    <Fragment>
      {trends?.length > 0 ? (
        trends.slice(0, 10).map((trend, index) => (
          <Container key={index}>
            <TextContainer>
              <SecondarySpan>{index + 1} · Trending</SecondarySpan>
            </TextContainer>
            <TextContainer>
              <PrimarySpan>{trend.word}</PrimarySpan>
            </TextContainer>
            <TextContainer>
              <SecondarySpan>{trend.postCount} posts</SecondarySpan>
            </TextContainer>
          </Container>
        ))
      ) : (
        <p>No trends available</p>
      )}
    </Fragment>
  );
}
