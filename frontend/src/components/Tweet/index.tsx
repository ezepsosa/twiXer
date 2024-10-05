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
      {tweets.map((tweet) => (
        <Container>
          <Image src={tweet.user.profileImage} />
          <InfoTweetContainer>
            <InfoUserContainer>
              <PrimarySpan>{tweet.user.username}</PrimarySpan>
              <UserUniqueNameText>{tweet.user.name}</UserUniqueNameText>
            </InfoUserContainer>
            <PrimaryText>{tweet.text}</PrimaryText>
            <GridContainer $mediaNumber={tweet.media.length}>
              {tweet.media.map((image) => (
                <GridItem>
                  <Media src={image}></Media>
                </GridItem>
              ))}
            </GridContainer>
            <IconsContainer>
              <SingleIconContainer>
                <SecondarySpan>
                  <FaRegComment /> {tweet.comments ? tweet.comments?.length : 0}
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
