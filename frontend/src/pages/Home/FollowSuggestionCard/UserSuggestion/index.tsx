import { useState } from "react";
import { followUser, unfollowUser } from "../../../../components/api";
import {
  Image,
  PrimaryBtn,
  PrimarySpan,
  UserUniqueNameText,
} from "../../../../styles/style";
import { Container, InfoUserContainer, TextContainer } from "./style";
import { Props } from "./types";

export function FollowSuggestion({ user }: Props) {
  const [followed, setFollowed] = useState<boolean>(false);
  const [actionText, setActionText] = useState<string>("Follow");

  async function handleButtonBehaviour() {
    setFollowed((value) => !value);
    if (followed) {
      await unfollowUser(user.id);
      setActionText("Follow");
    } else {
      await followUser(user.id);
      setActionText("Unfollow");
    }
  }

  return (
    <Container>
      <InfoUserContainer>
        <Image src={user.profilePictureUrl} />
        <TextContainer>
          <PrimarySpan $shouldBeShortened={true}>{user.name}</PrimarySpan>
          <UserUniqueNameText>@{user.username}</UserUniqueNameText>
        </TextContainer>
      </InfoUserContainer>
      <PrimaryBtn
        $backgroundColor={followed ? "white" : "#0f1419"}
        $color={followed ? "black" : "#ffff"}
        $hoverColor={followed ? "#f4212e" : "#ffff"}
        $hoverBackgroundColor={followed ? "#fcbbbf" : "#272c30"}
        $hoverBorder={followed ? "1px solid red" : "1px solid gray"}
        onMouseEnter={() => (followed ? setActionText("Unfollow") : null)}
        onMouseLeave={() => setActionText(followed ? "Following" : "Follow")}
        onClick={() => handleButtonBehaviour()}
      >
        {actionText}
      </PrimaryBtn>
    </Container>
  );
}
