import { css } from "styled-components";
import { objectMap } from "../../common";
import { parseScreen } from "./size";
import cfg from "../Theme.cfg";

// Size

export const getTextSizes = (screen) => {
  const currentSizes = parseScreen(cfg.textSize, screen);
  return objectMap(currentSizes, (v) => getTextSize(v));
};

export const getTextSize = (size) => {
  return css`
    line-height: ${size * cfg.rem}px;
    font-size: calc(${size * cfg.rem}px * var(--font-scale));
  `;
};
