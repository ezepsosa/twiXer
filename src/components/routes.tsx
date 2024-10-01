import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";

export function RoutesComponent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
