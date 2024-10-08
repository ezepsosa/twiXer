import { FaRegComment, FaRetweet } from "react-icons/fa";
import {
  PrimarySpan,
  UserUniqueNameText,
  Image,
  PrimaryText,
  Media,
} from "../../styles/style";
import {
  Container,
  InfoUserContainer,
  InfoTweetContainer,
  GridContainer,
  GridItem,
  IconsContainer,
  SingleIconContainer,
} from "./style";
import { Props } from "./types";
import { SecondarySpan } from "../../styles/style";
import { IoIosHeart } from "react-icons/io";

export default function TweetPost({ tweets }: Props) {
  return (
    <div>
      {tweets.map((tweet, index) => (
        <Container
          key={index}
          onClick={() => console.log(tweet.user.profilePictureUrl)}
        >
          <Image src={tweet.user.profilePictureUrl} />
          <InfoTweetContainer>
            <InfoUserContainer>
              <PrimarySpan>{tweet.user.name}</PrimarySpan>
              <UserUniqueNameText>@{tweet.user.username}</UserUniqueNameText>
            </InfoUserContainer>
            <PrimaryText>{tweet.text}</PrimaryText>
            <GridContainer $mediaNumber={tweet.media.length}>
              {tweet.media.map((image, index) => (
                <GridItem key={index}>
                  <Media src={image}></Media>
                </GridItem>
              ))}
            </GridContainer>
            <IconsContainer>
              <SingleIconContainer>
                <SecondarySpan>
                  <FaRegComment /> {tweet.text ? tweet.text?.length : 0}
                </SecondarySpan>
              </SingleIconContainer>
              <SingleIconContainer>
                <SecondarySpan>
                  <FaRetweet /> {tweet.reposts}
                </SecondarySpan>
              </SingleIconContainer>
              <SingleIconContainer>
                <SecondarySpan>
                  <IoIosHeart /> {tweet.likes}
                </SecondarySpan>
              </SingleIconContainer>
            </IconsContainer>
          </InfoTweetContainer>
        </Container>
      ))}
    </div>
  );
}
