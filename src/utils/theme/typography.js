import { css } from "styled-components";
import { baseUnit } from "./size";
import { objectMap } from "../common";

// Config

const textStyle = {};

textStyle.title = css`
  font-family: "Clash Grotesk", "Onest", sans-serif;
  text-transform: capitalize;
  font-weight: 550;
  --font-scale: 1;
`;

textStyle.lead = css`
  font-weight: 450;
  --font-scale: 0.8;
`;

textStyle.text = css`
  font-weight: 350;
  --font-scale: 0.75;
`;

textStyle.ui = css`
  letter-spacing: 0.02em;
  font-weight: 550;
  --font-scale: 0.75;
`;

textStyle.uiCaps = css`
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-weight: 600;
  --font-scale: 0.666;
`;

// Size

const getTextSizes = (sizes) => {
  return objectMap(sizes, (v) => getTextSize(v));
};

const getTextSize = (size) => {
  return css`
    line-height: ${size * baseUnit}px;
    font-size: calc(${size * baseUnit}px * var(--font-scale));
  `;
};

// Export

export { textStyle, getTextSize, getTextSizes };
