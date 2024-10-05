export interface menuOption {
  name: string;
  link: string;
}

export interface styledLinkPostProps {
  width?: string;
}

export interface Tweet {
  user: User;
  text: string;
  reposts: number;
  likes: number;
  comments?: Tweet[];
  media: string[];
  date: number;
}

export interface User {
  name: string;
  username: string;
  profileImage: string;
}
