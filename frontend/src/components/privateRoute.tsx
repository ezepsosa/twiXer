import { Navigate, Outlet } from "react-router-dom";
import { Container, Header, Main } from "../styles/style";
import Sidemenu from "./SideMenu";

export const PrivateRoute = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  if (!isAuthenticated) {
    console.log("toLogin");
    return <Navigate to={"/login"}></Navigate>;
  }
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
};
