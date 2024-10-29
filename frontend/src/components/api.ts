import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  Tweet,
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
          return (window.location.href = "/login");
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
    const res: AxiosResponse<User[]> = await apiService.get("user/all");
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

// Method to fetch every post
export async function getPosts(): Promise<Tweet[]> {
  try {
    const res: AxiosResponse<Tweet[]> = await apiService.get("post/all");
    return res.data; // Devuelve la lista de posts
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: "Failed to fetch posts",
        statusText: error.response?.statusText || "Network Error",
        status: error.response?.status || 500,
      };
    } else {
      throw {
        message: "An unexpected error occurred fetching post",
        statusText: "Unknown Error",
        status: 500,
      };
    }
  }
}

// Method to fetch every post ordered by Date
export async function getAllPostsOrderedByDate(): Promise<Tweet[]> {
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
