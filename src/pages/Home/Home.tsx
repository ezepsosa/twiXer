import TopMenu from "../../components/topMenu";
import { menuOption } from "../../components/types";
import { Container } from "./style";

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
      <TopMenu menuOptions={options}></TopMenu>
    </Container>
  );
}

export default Home;
