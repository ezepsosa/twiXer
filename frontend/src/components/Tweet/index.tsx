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
import {
  deleteFavorite,
  deleteRepost,
  getFavorite,
  getReposts,
  postFavorite,
  postRepost,
} from "../api";
import { useEffect, useState } from "react";
import { Tweet } from "../types";

export default function TweetPost({ tweets }: Props) {
  const [reposts, setReposts] = useState<number[]>([]);
  const [likes, setLikes] = useState<number[]>([]);

  useEffect(() => {
    async function loadFavoritesAndReposts() {
      let data: Tweet[] = await getReposts();
      setReposts(data.map((tweet) => tweet.id));
      data = await getFavorite();
      setLikes(data.map((tweet) => tweet.id));
    }
    loadFavoritesAndReposts();
  }, []);

  async function handleFavorite(postId: number) {
    if (likes.includes(postId)) {
      await deleteFavorite(postId);
      tweets = tweets.filter((tweet) =>
        tweet.id === postId ? (tweet.favorites -= 1) : null
      );
      setLikes((prevLikes) => prevLikes.filter((id) => id !== postId));
    } else {
      await postFavorite(postId);
      tweets = tweets.filter((tweet) =>
        tweet.id === postId ? (tweet.favorites += 1) : null
      );
      setLikes((prevLikes) => [...prevLikes, postId]);
    }
  }

  async function handleRepost(postId: number) {
    if (reposts.includes(postId)) {
      await deleteRepost(postId);
      tweets = tweets.filter((tweet) =>
        tweet.id === postId ? (tweet.reposts -= 1) : null
      );
      setReposts((prevRepost) => prevRepost.filter((id) => id !== postId));
    } else {
      await postRepost(postId);
      tweets = tweets.filter((tweet) =>
        tweet.id === postId ? (tweet.reposts += 1) : null
      );
      setReposts((prevReposts) => [...prevReposts, postId]);
    }
  }
  return (
    <div>
      {tweets.map((tweet, index) => (
        <Container key={index}>
          <Image src={tweet.user.profilePictureUrl} />
          <InfoTweetContainer>
            <InfoUserContainer>
              <PrimarySpan>{tweet.user.name}</PrimarySpan>
              <UserUniqueNameText>@{tweet.user.username}</UserUniqueNameText>
            </InfoUserContainer>
            <PrimaryText>{tweet.text}</PrimaryText>
            <GridContainer $mediaNumber={tweet.media?.length}>
              {tweet.media
                ? tweet.media.map((image, index) => (
                    <GridItem key={index}>
                      <Media src={image}></Media>
                    </GridItem>
                  ))
                : null}
            </GridContainer>

            <IconsContainer>
              <SingleIconContainer>
                <SecondarySpan>
                  <FaRegComment /> {tweet.text ? tweet.text?.length : 0}
                </SecondarySpan>
              </SingleIconContainer>
              <SingleIconContainer onClick={() => handleFavorite(tweet.id)}>
                <SecondarySpan>
                  <FaRetweet
                    color={likes.includes(tweet.id) ? "green" : "gray"}
                  />
                  {tweet.favorites}
                </SecondarySpan>
              </SingleIconContainer>
              <SingleIconContainer onClick={() => handleRepost(tweet.id)}>
                <SecondarySpan>
                  <IoIosHeart
                    color={reposts.includes(tweet.id) ? "red" : "gray"}
                  />
                  {tweet.reposts}
                </SecondarySpan>
              </SingleIconContainer>
            </IconsContainer>
          </InfoTweetContainer>
        </Container>
      ))}
    </div>
  );
}
