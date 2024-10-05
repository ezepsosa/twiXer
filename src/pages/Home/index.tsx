import { SearchBar } from "../../components/SearchBar";
import TopMenu from "../../components/TopMenu";
import TweetPost from "../../components/Tweet";
import { menuOption, Tweet, User } from "../../components/types";
import { SubscriptionCard } from "./FollowSuggestionCard";
import Post from "./Post";
import { Container, InnerContainer } from "./style";
import { TrendCard } from "./TrendCard";

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

const user: User = {
  name: "WickedZequi",
  username: "WickedZequi",
  profileImage: "\\src\\assets\\defaultimage.png",
};

const tweets: Tweet[] = [
  {
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi obcaecati voluptate perferendis, illum esse ad at. Iusto hic ut cum.",
    media: [
      "\\src\\assets\\defaultimage.png",
      "\\src\\assets\\defaultimage.png",
    ],
    date: Date.now(),
    likes: 12,
    reposts: 43,
    user: user,
  },
];

function Home() {
  return (
    <Container>
      <InnerContainer $width="34rem" $gap="0rem">
        <TopMenu menuOptions={options} />
        <Post />
        <TweetPost tweets={tweets} />
        <TweetPost tweets={tweets} />
        <TweetPost tweets={tweets} />
        <TweetPost tweets={tweets} />
        <TweetPost tweets={tweets} />
        <TweetPost tweets={tweets} />
        <TweetPost tweets={tweets} />
        <TweetPost tweets={tweets} />
        <TweetPost tweets={tweets} />
        <TweetPost tweets={tweets} />
        <TweetPost tweets={tweets} />
        <TweetPost tweets={tweets} />
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
