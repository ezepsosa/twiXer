import { FormEvent, useState } from "react";
import { LoginRequest } from "../../../components/types";
import {
  ErrorSpan,
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
  LoginFormContainer,
} from "./style";
import { FormError } from "./types";
import { Login } from "../../../components/api";

export default function LoginForm({ closeModal }: { closeModal: () => void }) {
  //useState definition
  const [nextStepLogin, setNextStepLogin] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormError>({
    usernameError: false,
    passwordError: false,
    authenticationError: false,
  });
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    username: "",
    password: "",
  });

  //Form funtions
  async function handleLogin(
    event: FormEvent<HTMLButtonElement>
  ): Promise<void> {
    event.preventDefault();
    if (loginRequest.password == "" || loginRequest.password == null) {
      setErrors({
        ...errors,
        passwordError: true,
      });
    } else {
      setErrors({
        ...errors,
        passwordError: false,
      });
      try {
        await Login(loginRequest);
        window.location.href = "/";
      } catch {
        setErrors({
          ...errors,
          authenticationError: true,
        });
      }
    }
  }
  function NextStepForm(event: FormEvent<HTMLButtonElement>): void {
    event.preventDefault();
    if (loginRequest.username == "" || loginRequest.username == null) {
      setErrors({
        ...errors,
        usernameError: true,
      });
    } else {
      setErrors({
        ...errors,
        usernameError: false,
      });
      setNextStepLogin((prev) => !prev);
    }
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
        <LoginFormContainer>
          {!nextStepLogin ? (
            <MiddleInnerContainer>
              <PrimarySpan $fontSize="1.25rem" $color="white">
                Sign in to X
              </PrimarySpan>
              <InputText
                placeholder="Phone, email address, or username"
                autoComplete="username"
                required
                name="username-hidden"
                value={loginRequest.username}
                onChange={(event) =>
                  setLoginRequest({
                    username: event?.target.value,
                    password: loginRequest.password,
                  })
                }
              />
              {errors.usernameError ? (
                <ErrorSpan>Username can't be empty</ErrorSpan>
              ) : null}
              <PrimaryButton
                type="submit"
                $backgrdoundColor="#EFF3F4"
                $color="black"
                $borderLine="1px solid #eee"
                $hoverBackgroundColor="#D7DBDC"
                onClick={NextStepForm}
              >
                Next
              </PrimaryButton>
              <PrimaryButton
                type="submit"
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
                name="username-hidden"
                value={loginRequest.username}
                disabled={true}
                $color="gray"
              ></InputText>
              <InputText
                placeholder="Password"
                type="password"
                autoComplete="current-password"
                name="password"
                value={loginRequest.password}
                required
                onChange={(event) =>
                  setLoginRequest({
                    username: loginRequest.username,
                    password: event?.target.value,
                  })
                }
              />
              {errors.passwordError ? (
                <ErrorSpan>Password can't be empty</ErrorSpan>
              ) : null}
              <StyledLinkLogin to={"#"}>Forgot password?</StyledLinkLogin>
              <PrimaryButton
                type="submit"
                $backgrdoundColor="#EFF3F4"
                $color="black"
                $borderLine="1px solid #eee"
                $hoverBackgroundColor="#D7DBDC"
                onClick={handleLogin}
              >
                Log in
              </PrimaryButton>
              {errors.authenticationError ? (
                <ErrorSpan>Invalid credentials</ErrorSpan>
              ) : null}
            </MiddleInnerContainer>
          )}
        </LoginFormContainer>
        <BottomInnerContainer>
          <SecondarySpan>Don't you have an account?</SecondarySpan>
          <StyledLinkLogin to={"#"}>Register</StyledLinkLogin>
        </BottomInnerContainer>
      </Container>
    </Overlay>
  );
}
