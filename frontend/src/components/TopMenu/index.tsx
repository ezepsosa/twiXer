import { useState } from "react";
import { Nav, StyledLinkTopMenu } from "./style";
import { Props } from "./types";

export default function TopMenu({ menuOptions }: Props) {
  const [selectedOption, setSelectedComponent] = useState<string>(
    menuOptions[0]?.name
  );
  return (
    <Nav>
      {menuOptions.map((menuOption) => (
        <StyledLinkTopMenu
          $isactive={menuOption.name === selectedOption}
          key={menuOption.name}
          onClick={() => setSelectedComponent(menuOption.name)}
        >
          {menuOption.name}
        </StyledLinkTopMenu>
      ))}
    </Nav>
  );
}
