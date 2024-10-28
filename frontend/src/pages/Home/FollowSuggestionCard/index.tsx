import { getFollowingSuggestions } from "../../../components/api";
import { User } from "../../../components/types";
import { TitleCard } from "../../../styles/style";
import { Container, InnerContainer, ShowMoreLink } from "./style";
import { FollowSuggestion } from "./UserSuggestion";
import { useEffect, useState } from "react";

export function SubscriptionCard() {
  const [usersToFollow, setUsersToFollow] = useState<User[]>([]);
  useEffect(() => {
    async function loadUsersToFollow() {
      try {
        const data = await getFollowingSuggestions();
        setUsersToFollow(data);
      } catch (err) {
        console.log(err);
      }
    }
    loadUsersToFollow();
  }, []);
  return (
    <Container>
      <TitleCard>Who to follow</TitleCard>
      <InnerContainer>
        {usersToFollow.slice(0, 3).map((user) => (
          <FollowSuggestion key={user.id} user={user} />
        ))}
      </InnerContainer>
      <ShowMoreLink>Show more</ShowMoreLink>
    </Container>
  );
}
