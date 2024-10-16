import { createContext } from "react";
import { AuthContextType } from "./types";

// Crear el contexto con un valor inicial de tipo `AuthContextType | undefined`
const AuthContext = createContext<AuthContextType>({
  token: "",
  loginAction: async () => {
    return;
  },
  logOut: () => {},
});

export default AuthContext;
