import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import Home from "../pages/Home/Home";

export function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
