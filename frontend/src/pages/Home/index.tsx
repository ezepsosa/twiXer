import { useEffect, useRef, useState } from "react";
import { SearchBar } from "../../components/SearchBar";
import TopMenu from "../../components/TopMenu";
import { menuOption, Tweet, TweetRequest } from "../../components/types";
import { SubscriptionCard } from "./FollowSuggestionCard";
import Post from "./Post";
import { Container, InnerContainer } from "./style";
import TweetPost from "../../components/Tweet";
import {
  addNewPost,
  getAllFollowingPostsOrderedByDate,
  getAllRandomPostsOrderedByDate,
} from "../../components/api";
import { Loading } from "../../components/Loading";
import { TrendCard } from "./TrendCard";

const options: menuOption[] = [
  { link: "/", name: "For you" },
  { link: "/following", name: "Following" },
];

function Home() {
  const [posts, setPosts] = useState<Tweet[]>([]);
  const [allPost, setAllPosts] = useState<Tweet[]>([]);
  const [optionSelected, setOptionSelected] = useState<string>(options[0].name);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

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
        setInitialLoading(true);
        const data =
          optionSelected === options[0].name
            ? await getAllRandomPostsOrderedByDate()
            : await getAllFollowingPostsOrderedByDate();

        setAllPosts(data);
        setPosts(data.slice(0, 20));
      } catch (err) {
        console.log(err);
      } finally {
        setInitialLoading(false);
      }
    }
    loadPosts();
  }, [optionSelected]);

  useEffect(() => {
    const loadItems = () => {
      if (loading || posts.length >= allPost.length) return;
      setLoading(true);

      const newItems = allPost.slice(posts.length, posts.length + 5);
      setPosts((prevItems) => [...prevItems, ...newItems]);
      setLoading(false);
    };

    const loadMore = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        loadItems();
      }
    };

    observer.current = new IntersectionObserver(loadMore, {
      rootMargin: "100px",
    });

    const lastItem = document.getElementById("last-item");
    if (lastItem && observer.current) {
      observer.current.observe(lastItem);
    }

    return () => observer.current?.disconnect();
  }, [posts, allPost]);

  return (
    <Container>
      <InnerContainer $width="34rem" $gap="0rem">
        <TopMenu
          menuOptions={options}
          setSelectedSubMenu={setSelectedSubMenu}
        />
        <Post addPostAndUpdateLocalList={addPostAndUpdateLocalList} />
        {initialLoading ? <Loading /> : <TweetPost tweets={posts} />}
        <div id="last-item"></div>
        {loading && <Loading />}
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
