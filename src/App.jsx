import "./style/reset.css";
import "./style/global.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import GamePage from "./pages/Game";
import NoPage from "./pages/NoPage";
import ThemeProvider from "./utils/Theme/Theme";
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
    background: ${({ theme }) => theme.color.bg.main};
    color: ${({ theme }) => theme.color.main.main};

    ${({ theme }) => theme.textStyle.text};
  }

  h1, .h1 {
    ${({ theme }) => theme.textStyle.title};
    ${({ theme }) => theme.textSize.h1};
  }

  h2, .h2 {
    ${({ theme }) => theme.textStyle.title};
    ${({ theme }) => theme.textSize.h2};
  }

  h3, .h3 {
    ${({ theme }) => theme.textStyle.title};
    ${({ theme }) => theme.textSize.h3};
  }

  h4, .h4, .lead {
    ${({ theme }) => theme.textStyle.lead};
    ${({ theme }) => theme.textSize.lead};
  }

  button, a {
    ${({ theme }) => theme.textStyle.ui}
    ${({ theme }) => theme.textSize.ui};
  }

  .caption {
    ${({ theme }) => theme.textStyle.caption};
    ${({ theme }) => theme.textSize.caption};
  }
`;

export default App;
