import { useState } from "react";
import { Nav, StyledLinkTopMenu } from "./style";
import { Props } from "./types";
import { menuOption } from "../types";

export default function TopMenu({ menuOptions, setSelectedSubMenu }: Props) {
  const [selectedOption, setSelectedComponent] = useState<string>(
    menuOptions[0]?.name
  );

  function handleChange(menuOption: menuOption) {
    setSelectedComponent(menuOption.name);
    setSelectedSubMenu(menuOption);
  }
  return (
    <Nav>
      {menuOptions.map((menuOption) => (
        <StyledLinkTopMenu
          $isactive={menuOption.name === selectedOption}
          key={menuOption.name}
          onClick={() => handleChange(menuOption)}
        >
          {menuOption.name}
        </StyledLinkTopMenu>
      ))}
    </Nav>
  );
}
