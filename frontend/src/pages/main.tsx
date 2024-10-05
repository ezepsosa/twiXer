import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import { RoutesComponent } from "../components/routes.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RoutesComponent />
  </StrictMode>
);
