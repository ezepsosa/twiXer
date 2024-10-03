import {
  Image,
  PrimaryBtn,
  UserNameText,
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
          <UserNameText>{name}</UserNameText>
          <UserUniqueNameText>@{username}</UserUniqueNameText>
        </TextContainer>
        <PrimaryBtn>Follow</PrimaryBtn>
      </InfoUserContainer>
    </Container>
  );
}
