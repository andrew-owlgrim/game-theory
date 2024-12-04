import "./style/reset.css";
import "./style/global.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import GamePage from "./pages/Game";
import NoPage from "./pages/NoPage";
import ThemeProvider from "./utils/Theme/Theme";
import { LocaleProvider } from "./utils/localization/localization";
import { createGlobalStyle, css } from "styled-components";

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

// Style

const globalCss = ({ theme }) => {
  return css`
    body {
      background: ${theme.color.bg.main};
      color: ${theme.color.main.main};

      ${theme.textStyle.text};
    }

    h1,
    .h1 {
      ${theme.textStyle.title};
      ${theme.textSize.h1};
    }

    h2,
    .h2 {
      ${theme.textStyle.title};
      ${theme.textSize.h2};
    }

    h3,
    .h3 {
      ${theme.textStyle.title};
      ${theme.textSize.h3};
    }

    h4,
    .h4,
    .lead {
      ${theme.textStyle.lead};
      ${theme.textSize.lead};
    }

    button {
      ${theme.textStyle.ui}
      ${theme.textSize.ui};
    }

    .caption {
      ${theme.textStyle.caption};
      ${theme.textSize.caption};
    }
  `;
};

const GlobalStyle = createGlobalStyle`
  ${globalCss}
`;

export default App;
