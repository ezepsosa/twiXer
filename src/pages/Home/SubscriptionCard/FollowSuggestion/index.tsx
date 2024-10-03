import {
  Image,
  PrimaryBtn,
  PrimarySpan,
  UserUniqueNameText,
} from "../../../../styles/style";
import { Container, InfoUserContainer, TextContainer } from "./style";
import { Props } from "./types";

export function FollowSuggestion({ name, username, profileImage }: Props) {
  return (
    <Container>
      <Image src={profileImage} />
      <InfoUserContainer>
        <TextContainer>
          <PrimarySpan>{name}</PrimarySpan>
          <UserUniqueNameText>@{username}</UserUniqueNameText>
        </TextContainer>
        <PrimaryBtn>Follow</PrimaryBtn>
      </InfoUserContainer>
    </Container>
  );
}
