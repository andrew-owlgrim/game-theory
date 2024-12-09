import "./style/reset.css";
import "./style/fonts.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import GamePage from "./pages/Game/GamePage";
import NoPage from "./pages/NoPage";
import ThemeProvider from "./utils/Theme/Theme";
import { LocaleProvider } from "./utils/localization/localization";
import { createGlobalStyle, css } from "styled-components";
import GlobalStyle from "./style/globalStyle";

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </LocaleProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
