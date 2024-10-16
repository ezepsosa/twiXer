import { Navigate, Outlet } from "react-router-dom";
import { Container, Header, Main } from "../styles/style";
import Sidemenu from "./SideMenu";
import { useAuth } from "../provider/useAuth";

export const PrivateRoute = () => {
  const auth = useAuth();

  if (auth.token == "" || auth.token == null)
    return <Navigate to={"/login"}></Navigate>;
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
