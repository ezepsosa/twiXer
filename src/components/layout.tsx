import { Outlet } from "react-router-dom";
import { Container } from "../styles/style";
import Sidemenu from "./SideMenu";

export function Layout() {
  return (
    <Container>
      <Sidemenu />
      <Outlet />
    </Container>
  );
}
