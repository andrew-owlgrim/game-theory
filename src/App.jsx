import "./style/reset.css";
import "./style/global.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import GamePage from "./pages/Game";
import NoPage from "./pages/NoPage";
import ThemeProvider from "./utils/theme";
import { LocaleProvider } from "./utils/localization";
import { createGlobalStyle } from "styled-components";

function App() {
  return (
    <ThemeProvider>
      <>
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
      </>
    </ThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    ${({ theme }) => theme.typography.text};
  }

  h1, .h1 {
    ${({ theme }) => theme.typography.h1};
  }

  h2, .h2 {
    ${({ theme }) => theme.typography.h2};
  }

  h3, .h3 {
    ${({ theme }) => theme.typography.h3};
  }

  h4, .h4, .lead {
    ${({ theme }) => theme.typography.lead};
  }

  button, a {
    ${({ theme }) => theme.typography.ui};
  }

  .caption {
    ${({ theme }) => theme.typography.caption};
  }
`;

export default App;
