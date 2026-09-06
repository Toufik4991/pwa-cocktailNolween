import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./theme/theme.css";
import { chargerPolices } from "./theme/fonts.js";

chargerPolices();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
