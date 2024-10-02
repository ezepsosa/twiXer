import { Nav, Container } from "./styles";
import { IoHomeOutline } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineBookmarks } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { CgCommunity } from "react-icons/cg";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { StyledLinkMenu, StyledLinkPost } from "../../styles/style";

export default function Sidemenu() {
  return (
    <Nav>
      <Container>
        <StyledLinkMenu>
          <RiTwitterXFill />
        </StyledLinkMenu>
        <StyledLinkMenu>
          <IoHomeOutline /> Home
        </StyledLinkMenu>
        <StyledLinkMenu>
          <HiMagnifyingGlass />
          Explore
        </StyledLinkMenu>
        <StyledLinkMenu>
          <IoMdNotificationsOutline />
          Notifications
        </StyledLinkMenu>
        <StyledLinkMenu>
          <MdOutlineBookmarks />
          Bookmarks
        </StyledLinkMenu>
        <StyledLinkMenu>
          <FiMessageSquare />
          Messages
        </StyledLinkMenu>
        <StyledLinkMenu>
          <CgCommunity />
          Communities
        </StyledLinkMenu>
        <StyledLinkMenu>
          <MdOutlineWorkspacePremium />
          Premium
        </StyledLinkMenu>
        <StyledLinkMenu>
          <FaRegUser />
          Profile
        </StyledLinkMenu>
        <StyledLinkMenu>
          <CiCircleMore />
          More
        </StyledLinkMenu>
        <StyledLinkPost>Post</StyledLinkPost>
        {/* TODO: Add profile picture and logging options*/}
      </Container>
    </Nav>
  );
}
