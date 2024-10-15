import { BrowserRouter, Route, Routes } from "react-router-dom"; // Importa solo lo necesario
import Home from "../pages/Home";
import Login from "../pages/Login";
import AuthProvider from "../provider/authProvider";
import { PrivateRoute } from "./privateRoute";

export function RoutesComponent() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
