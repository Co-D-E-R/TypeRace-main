import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import TypeProvider from "../context/TypeProvider.jsx";
import SocketProvider from "../context/SocketProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TypeProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </TypeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
