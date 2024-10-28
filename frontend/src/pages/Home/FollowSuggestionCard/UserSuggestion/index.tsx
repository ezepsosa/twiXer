import {
  Image,
  PrimaryBtn,
  PrimarySpan,
  UserUniqueNameText,
} from "../../../../styles/style";
import { Container, InfoUserContainer, TextContainer } from "./style";
import { Props } from "./types";

export function FollowSuggestion({ user }: Props) {
  return (
    <Container>
      <Image src={user.profilePictureUrl} />
      <InfoUserContainer>
        <TextContainer>
          <PrimarySpan>{user.name}</PrimarySpan>
          <UserUniqueNameText>@{user.username}</UserUniqueNameText>
        </TextContainer>
        <PrimaryBtn>Follow</PrimaryBtn>
      </InfoUserContainer>
    </Container>
  );
}
