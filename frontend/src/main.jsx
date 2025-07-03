// main.jsx or index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeContextProvider } from "./hooks/ThemeContext.jsx";
import { UserContextProvider } from "./hooks/UserContext.jsx";
import "./index.css";
import { CategoryContextProvider } from "./hooks/CategoryContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <ThemeContextProvider>
        <UserContextProvider>
          <CategoryContextProvider>
            <App />
          </CategoryContextProvider>
        </UserContextProvider>
      </ThemeContextProvider>
    </Router>
  </React.StrictMode>
);
