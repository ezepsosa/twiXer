import { useState } from "react";
import { Nav, StyledLink } from "./style";
import { Props } from "./types";

export default function TopMenu({ menuOptions }: Props) {
  const [selectedOption, setSelectedComponent] = useState<string>(
    menuOptions[0]?.name
  );
  return (
    <Nav>
      {menuOptions.map((menuOption) => (
        <StyledLink
          $isactive={menuOption.name === selectedOption}
          key={menuOption.name}
          onClick={() => setSelectedComponent(menuOption.name)}
        >
          {menuOption.name}
        </StyledLink>
      ))}
    </Nav>
  );
}
