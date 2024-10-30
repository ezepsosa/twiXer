import { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import TopMenu from "../../components/TopMenu";
import { menuOption, Tweet } from "../../components/types";
import { SubscriptionCard } from "./FollowSuggestionCard";
import Post from "./Post";
import { Container, InnerContainer } from "./style";
import { TrendCard } from "./TrendCard";
import TweetPost from "../../components/Tweet";
import {
  getAllFollowingPostsOrderedByDate,
  getAllRandomPostsOrderedByDate,
} from "../../components/api";
import { Loading } from "../../components/Loading";

const options: menuOption[] = [
  {
    link: "/",
    name: "For you",
  },
  {
    link: "/following",
    name: "Following",
  },
];

function Home() {
  const [followedPost, setFollowedPost] = useState<Tweet[]>([]);
  const [randomPost, setRandomPost] = useState<Tweet[]>([]);
  const [optionSelected, setOptionSelected] = useState<string>("Following");

  const [loading, setLoading] = useState<boolean>(true);

  function setSelectedSubMenu(menuOption: menuOption) {
    setOptionSelected(menuOption.name);
  }

  useEffect(() => {
    async function loadPosts() {
      try {
        const dataRandomPosts = await getAllRandomPostsOrderedByDate();
        const dataFollowedPosts = await getAllFollowingPostsOrderedByDate();
        setFollowedPost(dataFollowedPosts);
        setRandomPost(dataRandomPosts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <Container>
      <InnerContainer $width="34rem" $gap="0rem">
        <TopMenu
          menuOptions={options}
          setSelectedSubMenu={setSelectedSubMenu}
        />
        <Post />
        {loading ? <Loading /> : null}

        {optionSelected == options[0].name ? (
          <TweetPost tweets={randomPost} />
        ) : (
          <TweetPost tweets={followedPost} />
        )}
      </InnerContainer>
      <InnerContainer $border="none" $toHide={true}>
        <SearchBar />
        <SubscriptionCard />
        <TrendCard />
      </InnerContainer>
    </Container>
  );
}

export default Home;

/*
import { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import TopMenu from "../../components/TopMenu";
import { menuOption, Tweet } from "../../components/types";
import { SubscriptionCard } from "./FollowSuggestionCard";
import Post from "./Post";
import { Container, InnerContainer } from "./style";
import { TrendCard } from "./TrendCard";
import TweetPost from "../../components/Tweet";
import {
  getAllFollowingPostsOrderedByDate,
  getAllRandomPostsOrderedByDate,
} from "../../components/api";
import { Loading } from "../../components/Loading";

const options: menuOption[] = [
  {
    link: "/",
    name: "For you",
  },
  {
    link: "/following",
    name: "Following",
  },
];

function Home() {
  const [followedPost, setFollowedPost] = useState<Tweet[]>([]);
  const [randomPost, setRandomPost] = useState<Tweet[]>([]);
  const [optionSelected, setOptionSelected] = useState<string>("Following");

  const [loading, setLoading] = useState<boolean>(true);

  function setSelectedSubMenu(menuOption: menuOption) {
    setOptionSelected(menuOption.name);
  }
  console.log("sd");

  useEffect(() => {
    async function loadPosts() {
      try {
        const dataRandomPosts = await getAllRandomPostsOrderedByDate();
        const dataFollowedPosts = await getAllFollowingPostsOrderedByDate();
        setFollowedPost(dataFollowedPosts);
        setRandomPost(dataRandomPosts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <Container>
      <InnerContainer $width="34rem" $gap="0rem">
        <TopMenu
          menuOptions={options}
          setSelectedSubMenu={setSelectedSubMenu}
        />
        <Post />
        {loading ? <Loading /> : null}

        {optionSelected == "Following" ? (
          <TweetPost tweets={followedPost} />
        ) : (
          <TweetPost tweets={randomPost} />
        )}
      </InnerContainer>
      <InnerContainer $border="none" $toHide={true}>
        <SearchBar />
        <SubscriptionCard />
        <TrendCard />
      </InnerContainer>
    </Container>
  );
}

export default Home;
*/
