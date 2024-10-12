import { useState } from "react";
import { LoginRequest } from "../../../components/types";
import {
  Image,
  InputText,
  PrimaryButton,
  PrimarySpan,
  SecondarySpan,
} from "../../../styles/style";
import {
  MiddleInnerContainer,
  CloseButtonContainer,
  Container,
  ImageContainer,
  Overlay,
  TopInnerContainer,
  BottomInnerContainer,
  StyledLinkLogin,
} from "./style";
import { Login } from "../../../components/api";

// LoginForm Modal Component
export default function LoginForm({ closeModal }: { closeModal: () => void }) {
  const [nextStepLogin, setNextStepLogin] = useState<boolean>(false);
  const [userName, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleLogin() {
    const loginRequest: LoginRequest = {
      username: userName,
      password: password,
    };
    const data = await Login(loginRequest);
    console.log(data.accessToken);
  }

  return (
    <Overlay>
      <Container>
        <TopInnerContainer>
          <CloseButtonContainer>
            <PrimarySpan onClick={closeModal} $color="white">
              X
            </PrimarySpan>
          </CloseButtonContainer>
          <ImageContainer>
            <Image src="/src/assets/LargeTwixer.svg" $filter={true}></Image>
          </ImageContainer>
        </TopInnerContainer>

        {!nextStepLogin ? (
          <MiddleInnerContainer>
            <PrimarySpan $fontSize="1.25rem" $color="white">
              Sign in to X
            </PrimarySpan>
            <InputText
              placeholder="Phone, email address, or username"
              value={userName}
              onChange={(event) => setUsername(event?.target.value)}
            ></InputText>
            <PrimaryButton
              $backgrdoundColor="#EFF3F4"
              $color="black"
              $borderLine="1px solid #eee"
              $hoverBackgroundColor="#D7DBDC"
              onClick={() => setNextStepLogin((prev) => !prev)}
            >
              Next
            </PrimaryButton>
            <PrimaryButton
              $hoverBackgroundColor="#DBF3F41A"
              $color="white"
              $borderLine="1px solid #eee"
              $backgrdoundColor="black"
            >
              Forgot password?
            </PrimaryButton>
          </MiddleInnerContainer>
        ) : (
          <MiddleInnerContainer>
            <PrimarySpan $fontSize="1.25rem" $color="white">
              Enter your password
            </PrimarySpan>
            <InputText
              placeholder="Phone, email address, or username"
              value={userName}
              disabled={true}
              $color="gray"
            ></InputText>
            <InputText
              placeholder="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event?.target.value)}
            ></InputText>
            <StyledLinkLogin to={"#"}>Forgot password?</StyledLinkLogin>
            <PrimaryButton
              $backgrdoundColor="#EFF3F4"
              $color="black"
              $borderLine="1px solid #eee"
              $hoverBackgroundColor="#D7DBDC"
              onClick={handleLogin}
            >
              Log in
            </PrimaryButton>
          </MiddleInnerContainer>
        )}
        <BottomInnerContainer>
          <SecondarySpan>Don't you have an account?</SecondarySpan>
          <StyledLinkLogin to={"#"}>Register</StyledLinkLogin>
        </BottomInnerContainer>
      </Container>
    </Overlay>
  );
}
