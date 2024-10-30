import { BrowserRouter, Route, Routes } from "react-router-dom"; // Importa solo lo necesario
import Home from "../pages/Home";
import Login from "../pages/Login";
import { PrivateRoute } from "./privateRoute";
import { useEffect, useState } from "react";
import { CheckConnection } from "./api";
import Test from "../pages/TEST";
import { Loading } from "./Loading";

export function RoutesComponent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await CheckConnection();
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route
          path="/login"
          element={<Login isAuthenticated={isAuthenticated} />}
        />
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
