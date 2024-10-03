import { TitleCard } from "../../../styles/style";
import { FollowSuggestion } from "./FollowSuggestion";
import { Container, InnerContainer, ShowMoreLink } from "./style";

export function SubscriptionCard() {
  return (
    <Container>
      <TitleCard>Who to follow</TitleCard>
      <InnerContainer>
        <FollowSuggestion
          name="WickedZequi"
          username="WickedZequi"
          profileImage="\src\assets\defaultimage.png"
        />
        <FollowSuggestion
          name="WickedZequi"
          username="WickedZequi"
          profileImage="\src\assets\defaultimage.png"
        />
        <FollowSuggestion
          name="WickedZequi"
          username="WickedZequi"
          profileImage="\src\assets\defaultimage.png"
        />
      </InnerContainer>
      <ShowMoreLink>Show more</ShowMoreLink>
    </Container>
  );
}
