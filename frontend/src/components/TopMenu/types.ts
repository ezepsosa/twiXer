import { menuOption } from "../types";

export type Props = {
  className?: string;
  menuOptions: menuOption[];
  setSelectedSubMenu: (menuOption: menuOption) => void;
};

export interface StyledLinkProps {
  $isactive: boolean;
}
