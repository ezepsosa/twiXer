import { getTrends } from "../../../components/api";
import { Loading } from "../../../components/Loading";
import { Trend } from "../../../components/types";
import { TitleCard } from "../../../styles/style";
import { Container, InnerContainer, ShowMoreLink } from "./style";
import { Trends } from "./Trends";
import { useEffect, useState } from "react";

export function TrendCard() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadTrends() {
      try {
        setTrends(await getTrends());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTrends();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <TitleCard>Spain trends</TitleCard>
      <InnerContainer>
        <Trends trends={trends} />
      </InnerContainer>
      <ShowMoreLink>Show more</ShowMoreLink>
    </Container>
  );
}
