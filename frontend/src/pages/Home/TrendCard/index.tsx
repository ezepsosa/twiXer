import { TitleCard } from "../../../styles/style";
import { Container, InnerContainer, ShowMoreLink } from "./style";
import { Trends } from "./Trends";
import { Trend } from "./Trends/types";

const trends: Trend[] = [
  { count: 293432, trendName: "Lille", type: "Sports" },
  { count: 459823, trendName: "Tokyo", type: "News" },
  { count: 345621, trendName: "Paris Fashion Week", type: "Fashion" },
  { count: 982341, trendName: "Barcelona", type: "Sports" },
  { count: 123489, trendName: "Oscars 2024", type: "Entertainment" },
  { count: 784567, trendName: "New York", type: "Politics" },
  { count: 239874, trendName: "AI Summit", type: "Technology" },
  { count: 627348, trendName: "Climate Change", type: "Environment" },
  { count: 891234, trendName: "Super Bowl", type: "Sports" },
  { count: 567893, trendName: "K-pop Comeback", type: "Music" },
];

export function TrendCard() {
  return (
    <Container>
      <TitleCard>Spain trends</TitleCard>
      <InnerContainer>
        <Trends trends={trends} />
      </InnerContainer>
      <ShowMoreLink>Show more</ShowMoreLink>
    </Container>
  );
}
