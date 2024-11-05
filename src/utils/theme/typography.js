import { css } from "styled-components";
import { baseUnit } from "./size";

const headerStyle = css`
  font-family: "Clash Grotesk", "Onest", sans-serif;
  text-transform: capitalize;
  font-weight: 550;
`;

const leadStyle = css`
  font-weight: 450;
`;

const textStyle = css`
  font-weight: 350;
`;

const uiStyle = css`
  letter-spacing: 0.02em;
  font-weight: 550;
`;

// size determines line-height property in base units
// fontScale is for font-size property based on lineheights
const typographyConfig = {
  h1: {
    style: headerStyle,
    size: { mobile: 2, tablet: 2.5, default: 3 },
    fontScale: 1,
  },
  h2: {
    style: headerStyle,
    size: { mobile: 1.5, tablet: 1.75, default: 2 },
    fontScale: 1,
  },
  h3: {
    style: headerStyle,
    size: { mobile: 1.25, tablet: 1.5, default: 1.5 },
    fontScale: 1,
  },
  lead: { style: leadStyle, size: { default: 1.25 }, fontScale: 0.8 },
  text: { style: textStyle, size: { default: 1 }, fontScale: 0.75 },
  ui: { style: uiStyle, size: { default: 1 }, fontScale: 0.75 },
  caption: { style: textStyle, size: { default: 0.75 }, fontScale: 0.75 },
};

const mixin = (styleName, size = 1, weight) => {
  if (!typographyConfig[styleName]) return;
  const { style, fontScale } = typographyConfig[styleName];

  const lh = size * baseUnit;
  const fs = lh * fontScale;

  return css`
    ${style || ""}
    font-size: ${fs}px;
    line-height: ${lh}px;
    ${weight &&
    css`
      font-weight: ${weight};
    `}
  `;
};

const textSize = (size, style) => {
  const lh = size * baseUnit;
  const fs = lh * typographyConfig[style].fontScale || 1;

  return css`
    font-size: ${fs}px;
    line-height: ${lh}px;
  `;
};

const getTypography = (screen) => {
  const typography = {};
  for (let key in typographyConfig) {
    const sizeObj = typographyConfig[key].size;
    typography[key] = mixin(key, sizeObj[screen] || sizeObj.default);
  }
  return typography;
};

export default getTypography;
export { mixin as typographyMixin, textSize };
