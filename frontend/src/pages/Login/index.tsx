import { BigLogo, Container, LeftContainer, RightContainer } from "./style";
import { PrimaryButton, PrimarySpan } from "../../styles/style";
import { useState } from "react";
import LoginForm from "./LoginForm";

export default function Login() {
  const [openLoginForm, setOpenLoginForm] = useState<boolean>(false);

  function changeLoginFormBehaviour() {
    setOpenLoginForm((previousValue) => !previousValue);
  }

  return (
    <Container>
      {openLoginForm ? (
        <LoginForm closeModal={changeLoginFormBehaviour} />
      ) : null}
      <LeftContainer>
        <BigLogo src="/src/assets/LargeTwixer.svg"></BigLogo>
      </LeftContainer>
      <RightContainer>
        <PrimarySpan $fontSize="4.25rem" $color="white">
          Happening now
        </PrimarySpan>
        <PrimarySpan $fontSize="4.25rem" $color="white">
          Join today.
        </PrimarySpan>
        <PrimarySpan $fontSize="1rem" $color="white">
          Already have an account?
        </PrimarySpan>
        <PrimaryButton onClick={changeLoginFormBehaviour}>
          Sign in
        </PrimaryButton>
      </RightContainer>
    </Container>
  );
}
