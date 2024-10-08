export interface menuOption {
  name: string;
  link: string;
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
