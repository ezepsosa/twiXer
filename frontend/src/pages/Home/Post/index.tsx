import { useState } from "react";
import {
  Container,
  ErrorContainer,
  IconsContainer,
  InnerContainer,
  InputText,
} from "./style";
import { AiOutlinePicture } from "react-icons/ai";
import { MdOutlineGifBox } from "react-icons/md";
import { MdOutlinePoll } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { ErrorSpan, Image, LinkPost } from "../../../styles/style";
import { interfacePostProps } from "./types";
import { TweetRequest } from "../../../components/types";

export default function Post({
  addPostAndUpdateLocalList,
}: interfacePostProps) {
  const [inputPostValue, setInputPostValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  async function prepareToPost() {
    const post: TweetRequest = {
      text: inputPostValue,
    };
    setError(!(await addPostAndUpdateLocalList(post)));
    if (!error) {
      setInputPostValue("");
    }
  }
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
        <LinkPost onClick={prepareToPost} width="10%">
          Post
        </LinkPost>
      </InnerContainer>
      <ErrorContainer>
        {error ? (
          <ErrorSpan>There was an error trying to post it ...</ErrorSpan>
        ) : null}
      </ErrorContainer>
    </Container>
  );
}
