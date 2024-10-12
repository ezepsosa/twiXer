import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import Home from "../pages/Home";
import Login from "../pages/Login";

export function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
