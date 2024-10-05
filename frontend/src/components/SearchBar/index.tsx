import { HiMagnifyingGlass } from "react-icons/hi2";
import { Container, IconContainer, InputText } from "./style";

export const SearchBar = (): JSX.Element => (
  <Container>
    <InputText type="text" placeholder="Search" />
    <IconContainer>
      <HiMagnifyingGlass />
    </IconContainer>
  </Container>
);
