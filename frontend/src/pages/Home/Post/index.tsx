import { useState } from "react";
import { Container, IconsContainer, InnerContainer, InputText } from "./style";
import { AiOutlinePicture } from "react-icons/ai";
import { MdOutlineGifBox } from "react-icons/md";
import { MdOutlinePoll } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { Image, LinkPost } from "../../../styles/style";

export default function Post() {
  const [inputPostValue, setInputPostValue] = useState<string>("");
  return (
    <Container>
      <InnerContainer $padding="1rem">
        <Image src="/src/assets/profile.jpg" />
        <InputText
          value={inputPostValue}
          maxLength={240}
          $scrollHeight={inputPostValue.length}
          onChange={(event) => setInputPostValue(event?.target.value)}
          id="posttextarea"
          placeholder="What is happening?!"
        ></InputText>
      </InnerContainer>
      <InnerContainer
        $justifycontent="space-between"
        $alignitems="center"
        $margin="0 1rem"
      >
        <IconsContainer>
          <AiOutlinePicture color="#1d9bf0" />
          <MdOutlineGifBox color="#1d9bf0" />
          <MdOutlinePoll color="#1d9bf0" />
          <FaRegSmile color="#1d9bf0" />
          <RiCalendarScheduleLine color="#1d9bf0" />
        </IconsContainer>
        <LinkPost width="10%">Post</LinkPost>
      </InnerContainer>
    </Container>
  );
}
