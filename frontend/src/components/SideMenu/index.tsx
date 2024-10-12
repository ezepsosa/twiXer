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
import { LinkMenu, LinkPost } from "../../styles/style";

export default function Sidemenu() {
  return (
    <Nav>
      <Container>
        <LinkMenu>
          <RiTwitterXFill />
        </LinkMenu>
        <LinkMenu>
          <IoHomeOutline /> Home
        </LinkMenu>
        <LinkMenu>
          <HiMagnifyingGlass />
          Explore
        </LinkMenu>
        <LinkMenu>
          <IoMdNotificationsOutline />
          Notifications
        </LinkMenu>
        <LinkMenu>
          <MdOutlineBookmarks />
          Bookmarks
        </LinkMenu>
        <LinkMenu>
          <FiMessageSquare />
          Messages
        </LinkMenu>
        <LinkMenu>
          <CgCommunity />
          Communities
        </LinkMenu>
        <LinkMenu>
          <MdOutlineWorkspacePremium />
          Premium
        </LinkMenu>
        <LinkMenu>
          <FaRegUser />
          Profile
        </LinkMenu>
        <LinkMenu>
          <CiCircleMore />
          More
        </LinkMenu>
        <LinkPost>Post</LinkPost>
        {/* TODO: Add profile picture and logging options*/}
      </Container>
    </Nav>
  );
}
