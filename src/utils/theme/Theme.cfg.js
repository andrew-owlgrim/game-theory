import { css } from "styled-components";
import { hsbToHex } from "./utils/color";

const themeCfg = {};

// Color

themeCfg.color = {
  white: hsbToHex(0, 0, 100),
  black: hsbToHex(0, 0, 12),
  gray: hsbToHex(230, 30, 50),
  lime: hsbToHex(80, 70, 80),
  green: hsbToHex(110, 70, 80),
  mint: hsbToHex(160, 70, 80),
  lightblue: hsbToHex(200, 70, 100),
  blue: hsbToHex(230, 70, 100),
  purple: hsbToHex(260, 60, 100),
  liliac: hsbToHex(290, 60, 100),
  pink: hsbToHex(320, 65, 100),
  red: hsbToHex(350, 70, 100),
  redDark: hsbToHex(350, 70, 100),
  orange: hsbToHex(15, 70, 100),
  yellow: hsbToHex(40, 70, 100),
  brown: hsbToHex(30, 70, 80),
};

themeCfg.color.bg = {
  light: themeCfg.color.white,
  dark: themeCfg.color.black,
};
themeCfg.color.main = {
  light: themeCfg.color.black,
  dark: themeCfg.color.white,
};
themeCfg.color.primary = themeCfg.color.pink;
themeCfg.color.danger = themeCfg.color.red;

themeCfg.colorRoles = {
  main: 1,
  primary: 0.9,
  active: 0.8,
  secondary: 0.5,
  tertiary: 0.32,
  border: 0.16,
  bg: 0.08,
  bbg: 0.04,
};

// Size

themeCfg.rem = 20;

themeCfg.textSize = {
  h1: { default: 3, tablet: 2.5, mobile: 2 },
  h2: { default: 2.2, mobile: 1.6 },
  h3: { default: 1.5, module: 1.25 },
  h4: { default: 1.25 },
  lead: { default: 1.25 },
  text: { default: 1 },
  ui: { default: 1 },
  caption: { default: 0.75 },
};

themeCfg.space = {
  xs: { default: 0.2 },
  s: { default: 0.4 },
  sm: { default: 0.6 },
  m: { default: 1 },
  ml: { default: 1.4, mobile: 1.2 },
  l: { default: 2, mobile: 1.6 },
  xl: { default: 4, tablet: 3, mobile: 2 },
};

themeCfg.radius = {
  xs: 0.1,
  s: 0.2,
  m: 0.4,
  l: 0.6,
  xl: 1,
};

themeCfg.grid = {
  gridWidth: { default: null, ultrawide: 1920 }, // null is for 100%
  cols: { default: 12, tablet: 8, mobile: 4 },
  margin: { default: 4, tablet: 2, mobile: 1 }, // values in rems
  gap: { default: 0.4 },
};

themeCfg.breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1200,
  ultrawide: 1920,
};

// Typography

themeCfg.textStyle = {};

themeCfg.textStyle.title = css`
  font-family: "Clash Grotesk", "Onest", sans-serif;
  text-transform: capitalize;
  font-weight: 550;
  --font-scale: 1;
`;

themeCfg.textStyle.lead = css`
  font-weight: 500;
  --font-scale: 0.8;
`;

themeCfg.textStyle.text = css`
  font-weight: 350;
  --font-scale: 0.75;
`;

themeCfg.textStyle.ui = css`
  letter-spacing: 0.02em;
  font-weight: 500;
  --font-scale: 0.75;
`;

themeCfg.textStyle.uiCaps = css`
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-weight: 550;
  --font-scale: 0.666;
`;

themeCfg.textStyle.inherit = css`
  text-transform: inherit;
  letter-spacing: inherit;
  font-weight: inherit;
`;

// Mixins

themeCfg.mixin = {};

// before
themeCfg.mixin.before = css`
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    pointer-events: none;
    z-index: -1;
  }
`;

// truncate
themeCfg.mixin.truncate = (lines) => {
  if (lines)
    return css`
      display: -webkit-box;
      -webkit-line-clamp: ${lines};
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
  else
    return css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `;
};

// flex
const flexAliases = {
  h: "row",
  col: "column",
  v: "column",
  start: "flex-start",
  end: "flex-end",
};

const formatSpacing = (value) => {
  if (value === undefined || value === null) return null;
  return Array.isArray(value)
    ? value.map((v) => `${v}px`).join(" ")
    : `${value}px`;
};

themeCfg.mixin.flex = (direction, align, justify, gap, padding) => css`
  display: flex;
  ${direction ? `flex-direction: ${flexAliases[direction] || direction};` : ""}
  ${align ? `align-items: ${flexAliases[align] || align};` : ""}
  ${justify ? `justify-content: ${flexAliases[justify] || justify};` : ""}
  ${gap || gap === 0 ? `gap: ${formatSpacing(gap)};` : ""}
  ${padding || padding === 0 ? `padding: ${formatSpacing(padding)};` : ""}
`;

// scrollbar
themeCfg.mixin.scrollbar = ({
  width = 8,
  track = "#ccc",
  handle = "#000",
  padding = 0,
  margin,
  round = false,
}) => css`
  ${margin &&
  css`
    padding-right: ${margin}px;
    margin-right: ${-margin}px;
  `}

  /* width */
  &::-webkit-scrollbar {
    width: ${width}px;
    border: ${padding}px solid transparent;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: ${track};
    border: ${padding}px solid transparent;
    background-clip: padding-box;
    border-radius: ${round ? 666 : 0}px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${handle};
    border: ${padding}px solid transparent;
    background-clip: padding-box;
    border-radius: ${round ? 666 : 0}px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${handle};
    background-clip: padding-box;
    border-width: ${padding > 0 ? padding - 1 : padding}px;
  }
`;

themeCfg.mixin.hideScrollbar = css`
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

export default themeCfg;
