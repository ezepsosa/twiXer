import { Nav, Enlace, Container } from "./styles";
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

export default function Sidemenu() {
  return (
    <Nav>
      <Container>
        <Enlace>
          <RiTwitterXFill />
        </Enlace>
        <Enlace>
          <IoHomeOutline /> Home
        </Enlace>
        <Enlace>
          <HiMagnifyingGlass />
          Explore
        </Enlace>
        <Enlace>
          <IoMdNotificationsOutline />
          Notifications
        </Enlace>
        <Enlace>
          <MdOutlineBookmarks />
          Bookmarks
        </Enlace>
        <Enlace>
          <FiMessageSquare />
          Messages
        </Enlace>
        <Enlace>
          <CgCommunity />
          Communities
        </Enlace>
        <Enlace>
          <MdOutlineWorkspacePremium />
          Premium
        </Enlace>
        <Enlace>
          <FaRegUser />
          Profile
        </Enlace>
        <Enlace>
          <CiCircleMore />
          More
        </Enlace>
      </Container>
    </Nav>
  );
}
