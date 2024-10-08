import { useEffect, useState } from "react";
import { getPosts } from "../../components/api";
import { SearchBar } from "../../components/SearchBar";
import TopMenu from "../../components/TopMenu";
import { menuOption, Tweet } from "../../components/types";
import { SubscriptionCard } from "./FollowSuggestionCard";
import Post from "./Post";
import { Container, InnerContainer } from "./style";
import { TrendCard } from "./TrendCard";
import TweetPost from "../../components/Tweet";

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
  const [usePost, setUsePost] = useState<Tweet[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setUsePost(data);
      } catch (err) {
        console.log(err);
      }
    }
    loadPosts();
  }, []);

  return (
    <Container>
      <InnerContainer $width="34rem" $gap="0rem">
        <TopMenu menuOptions={options} />
        <Post />
        {usePost ? <TweetPost tweets={usePost} /> : null}
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
