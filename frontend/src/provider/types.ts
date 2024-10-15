import { ReactNode } from "react";
import { LoginRequest } from "../components/types";

// Definir la estructura del contexto de autenticación
export interface AuthContextType {
  token: string;
  logOut: () => void;
  loginAction: (loginRequest: LoginRequest) => Promise<void>;
}
// Definir el tipo de las props del AuthProvider
export interface AuthProviderProps {
  children: ReactNode;
}
