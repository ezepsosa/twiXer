export interface menuOption {
  name: string;
  link: string;
}

export interface TextProps {
  $fontSize?: string;
  $color?: string;
}

export interface styledLinkPostProps {
  width?: string;
}

export interface Tweet {
  id: number;
  user: User;
  text: string;
  reposts: number;
  likes: number;
  media: string[];
  date: string;
}

export interface User {
  id: number;
  profilePictureUrl: string;
  username: string;
  name: string;
  email: string;
  signUpDate: string;
  password: string;
}

export interface ImgProps {
  $filter?: boolean;
}

export interface PrimaryButtonProps {
  $color?: string;
  $hoverBackgroundColor?: string;
  $backgrdoundColor?: string;
  $borderLine?: string;
}

//requests

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}
