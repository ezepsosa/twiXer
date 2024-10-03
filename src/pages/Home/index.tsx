import { SearchBar } from "../../components/SearchBar";
import TopMenu from "../../components/TopMenu";
import { menuOption } from "../../components/types";
import Post from "./Post";
import { Container, InnerContainer } from "./style";
import { SubscriptionCard } from "./SubscriptionCard";
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

function Home() {
  return (
    <Container>
      <InnerContainer>
        <TopMenu menuOptions={options}></TopMenu>
        <Post />
      </InnerContainer>
      <InnerContainer $border="none">
        <SearchBar />
        <SubscriptionCard />
        <TrendCard />
      </InnerContainer>
    </Container>
  );
}

export default Home;
