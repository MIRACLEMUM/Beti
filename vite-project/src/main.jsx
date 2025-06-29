// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BetProvider } from "./context/BetContext.jsx"; // 👈 add this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BetProvider>
      <App />
    </BetProvider>
  </React.StrictMode>
);
