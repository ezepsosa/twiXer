import { LoginRequest, LoginResponse, Tweet, User } from "./types";
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = `http://localhost:8080/api/v1/`;

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

// Función para obtener usuarios
export async function getUsers(): Promise<User[]> {
  try {
    const res: AxiosResponse<User[]> = await apiService.get("user/all", {
      headers: authHeader(),
    });
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

// Función para obtener posts
export async function getPosts(): Promise<Tweet[]> {
  try {
    const res: AxiosResponse<Tweet[]> = await apiService.get("post/all", {
      headers: authHeader(),
    });
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
        message: "An unexpected error occurred autheticating",
        statusText: "Unkown Error",
        status: 500,
      };
    }
  }
}

export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("site") || "");
  if (user != "" && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
