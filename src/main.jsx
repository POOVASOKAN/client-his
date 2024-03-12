import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import HisProvider from "./HisContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HisProvider>
        <App />
      </HisProvider>
    </BrowserRouter>
  </React.StrictMode>
);
