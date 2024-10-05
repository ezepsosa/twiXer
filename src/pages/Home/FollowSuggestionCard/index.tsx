import { User } from "../../../components/types";
import { TitleCard } from "../../../styles/style";
import { Container, InnerContainer, ShowMoreLink } from "./style";
import { FollowSuggestion } from "./UserSuggestion";

const user: User = {
  name: "WickedZequi",
  username: "WickedZequi",
  profileImage: "\\src\\assets\\defaultimage.png",
};

export function SubscriptionCard() {
  return (
    <Container>
      <TitleCard>Who to follow</TitleCard>
      <InnerContainer>
        <FollowSuggestion user={user} />
        <FollowSuggestion user={user} />
        <FollowSuggestion user={user} />
      </InnerContainer>
      <ShowMoreLink>Show more</ShowMoreLink>
    </Container>
  );
}
