import { Outlet } from "react-router-dom";
import { Container, Header, Main } from "../styles/style";
import Sidemenu from "./SideMenu";

export function Layout() {
  return (
    <Container>
      <Header>
        <Sidemenu />
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
}
