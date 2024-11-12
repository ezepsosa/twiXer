import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  Tweet,
  TweetRequest,
  User,
} from "./types";
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = `http://localhost:8080/api/v1/`;

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const apiCheckService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await RefreshToken();
          return apiService(originalRequest);
        } catch {
          if (window.location.pathname != "/login") {
            return (window.location.href = "/login");
          }
        } finally {
          isRefreshing = false;
        }
      }
    }
    return Promise.reject(error);
  }
);

// Función para obtener usuarios
export async function getUsers(): Promise<User[]> {
  try {
    const res: AxiosResponse<User[]> = await apiService.get("user");
    return res.data; // Devuelve la lista de usuarios
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: "Failed to fetch users",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred fetching users",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

// Method to fetch every post ordered by Date
export async function getAllRandomPostsOrderedByDate(): Promise<Tweet[]> {
  try {
    const res: AxiosResponse<Tweet[]> = await apiService.get("post/recent");
    return res.data; // Devuelve la lista de posts
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: "Failed to fetch posts ordered by date",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred fetching post ordered by date",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

// Method to fetch every post ordered by Date from following users
export async function getAllFollowingPostsOrderedByDate(): Promise<Tweet[]> {
  try {
    const res: AxiosResponse<Tweet[]> = await apiService.get("post/following");
    return res.data; // Devuelve la lista de posts
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: "Failed to fetch posts ordered by date",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred fetching post ordered by date",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

// Method to add a new Post
export async function addNewPost(post: TweetRequest): Promise<Tweet> {
  try {
    const res: AxiosResponse<Tweet> = await apiService.post("post", post);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: "Failed to add post",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred adding a post",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

export async function getFollowingSuggestions(): Promise<User[]> {
  try {
    const res: AxiosResponse<User[]> = await apiService.get(
      "user/following/suggestions"
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: "Failed to fetch users to follow",
        statusText: error.response?.statusText || "Network error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error ocurred fetchin users to follow",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

export async function Login(login: LoginRequest): Promise<LoginResponse> {
  try {
    const res: AxiosResponse<LoginResponse> = await apiService.post(
      "auth/signin",
      login
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: "Failed to authenticate",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred authenticating",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

export async function RefreshToken() {
  try {
    const res: AxiosResponse<RefreshTokenResponse> = await apiCheckService.post(
      "auth/refreshtoken"
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: "Failed to refresh token",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred authenticating",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}
export async function CheckConnection() {
  try {
    const res: AxiosResponse = await apiService.get("user/check/session");
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw {
        message: "Failed checking connection",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred authenticating",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

export async function followUser(userId: number) {
  try {
    const res: AxiosResponse = await apiService.post(
      `user/following/${userId}`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw {
        message: "Failed following user",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred following user",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

export async function unfollowUser(userId: number) {
  try {
    const res: AxiosResponse = await apiService.delete(
      `user/following/${userId}`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw {
        message: "Failed unfollowing user",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred unfollowing user",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

export async function getFavorite(): Promise<Tweet[]> {
  try {
    const res: AxiosResponse = await apiService.get(`post/favorite`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw {
        message: "Failed adding favorite post",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred adding a favorite post",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

export async function postFavorite(postId: number) {
  try {
    const res: AxiosResponse = await apiService.post(`post/favorite/${postId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw {
        message: "Failed adding favorite post",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred adding a favorite post",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

export async function deleteFavorite(postId: number) {
  try {
    const res: AxiosResponse = await apiService.delete(
      `post/favorite/${postId}`
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw {
        message: "Failed deleting favorite post",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred deleting a favorite post",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

export async function getReposts(): Promise<Tweet[]> {
  try {
    const res: AxiosResponse = await apiService.get(`post/repost`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw {
        message: "Failed adding favorite post",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred adding a favorite post",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

export async function postRepost(postId: number) {
  try {
    const res: AxiosResponse = await apiService.post(`post/repost/${postId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw {
        message: "Failed reposting",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred reposting",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

export async function deleteRepost(postId: number) {
  try {
    const res: AxiosResponse = await apiService.delete(`post/repost/${postId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw {
        message: "Failed deleting favorite",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred deleting favorite",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}
