import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { themesOptions } from "../styles/Themes.jsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import { GlobalStyles } from "../styles/GlobalStyles.jsx";
import MultiPlayer from "./pages/MultiPlayer.jsx";

const App = () => {
  const [theme, setTheme] = useState(() => {
    return themesOptions[0].value;
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/multiplayer" element={<MultiPlayer />}></Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
