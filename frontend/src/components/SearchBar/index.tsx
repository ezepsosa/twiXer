import { HiMagnifyingGlass } from "react-icons/hi2";
import { Container, IconContainer, SearchInput } from "./style";

export const SearchBar = (): JSX.Element => (
  <Container>
    <SearchInput type="text" placeholder="Search" />
    <IconContainer>
      <HiMagnifyingGlass />
    </IconContainer>
  </Container>
);
