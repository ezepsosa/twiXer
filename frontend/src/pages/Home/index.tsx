import { useEffect, useState } from "react";
import { getAllPostsOrderedByDate } from "../../components/api";
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
  const [post, setPost] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getAllPostsOrderedByDate();
        setPost(data);
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
        <TopMenu menuOptions={options} />
        <Post />
        {loading ? <p>loading</p> : null}

        {post ? <TweetPost tweets={post} /> : null}
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
