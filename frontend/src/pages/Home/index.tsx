import { useEffect, useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import TopMenu from "../../components/TopMenu";
import { menuOption, Tweet, TweetRequest } from "../../components/types";
import { SubscriptionCard } from "./FollowSuggestionCard";
import Post from "./Post";
import { Container, InnerContainer } from "./style";
import { TrendCard } from "./TrendCard";
import TweetPost from "../../components/Tweet";
import {
  addNewPost,
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
  const [posts, setPosts] = useState<Tweet[]>([]);
  const [optionSelected, setOptionSelected] = useState<string>(options[0].name);
  const [loading, setLoading] = useState<boolean>(true);

  function setSelectedSubMenu(menuOption: menuOption) {
    setOptionSelected(menuOption.name);
  }

  async function addPostAndUpdateLocalList(post: TweetRequest) {
    try {
      const postToCreate = await addNewPost(post);
      setPosts((prevPosts) => [postToCreate, ...prevPosts]);
      return true;
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    async function loadPosts() {
      try {
        const data =
          optionSelected === options[0].name
            ? await getAllRandomPostsOrderedByDate()
            : await getAllFollowingPostsOrderedByDate();
        setPosts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [optionSelected]);
  return (
    <Container>
      <InnerContainer $width="34rem" $gap="0rem">
        <TopMenu
          menuOptions={options}
          setSelectedSubMenu={setSelectedSubMenu}
        />
        <Post addPostAndUpdateLocalList={addPostAndUpdateLocalList} />
        {loading ? <Loading /> : null}
        <TweetPost tweets={posts} />
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
