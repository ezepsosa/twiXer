import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../components/types";
import { Login } from "../components/api";
import { AuthProviderProps } from "./types";
import AuthContext from "./authContext";

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

export default AuthProvider;
