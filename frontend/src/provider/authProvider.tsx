import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../components/types";
import { Login } from "../components/api";
import { AuthContextType, AuthProviderProps } from "./types";

// Crear el contexto con un valor inicial de tipo `AuthContextType | undefined`
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("site") || ""
  );
  const navigate = useNavigate();

  const loginAction = async (loginRequest: LoginRequest) => {
    const data = await Login(loginRequest);
    if (data) {
      setToken(data.accessToken);
      localStorage.setItem("site", JSON.stringify(data));
      navigate("/");
      return;
    }
  };
  const logOut = () => {
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default AuthProvider;
