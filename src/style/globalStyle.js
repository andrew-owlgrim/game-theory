import { createGlobalStyle, css } from "styled-components";

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

export default GlobalStyle;
