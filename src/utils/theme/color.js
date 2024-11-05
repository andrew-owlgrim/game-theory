export const colors = {
  white: hsbToHex(0, 0, 100),
  black: hsbToHex(0, 0, 12),
  gray: hsbToHex(230, 30, 50),
  lime: hsbToHex(80, 70, 60),
  green: hsbToHex(110, 70, 60),
  mint: hsbToHex(160, 70, 60),
  lightblue: hsbToHex(200, 70, 60),
  blue: hsbToHex(230, 70, 60),
  purple: hsbToHex(260, 70, 60),
  liliac: hsbToHex(290, 70, 60),
  pink: hsbToHex(320, 70, 60),
  red: hsbToHex(350, 70, 60),
  orange: hsbToHex(15, 70, 60),
  yellow: hsbToHex(40, 70, 60),
  brown: hsbToHex(30, 70, 50),
};

export const themeColors = {
  light: {
    bg: colors.white,
    tile: hexa(colors.black, 0.04),
    fg: hexa(colors.black, 0.08),
    border: hexa(colors.black, 0.16),
    tertiary: hexa(colors.black, 0.33),
    secondary: hexa(colors.black, 0.5),
    main: colors.black,
  },
  dark: {
    bg: colors.black,
    tile: hexa(colors.white, 0.04),
    fg: hexa(colors.white, 0.08),
    border: hexa(colors.white, 0.16),
    tertiary: hexa(colors.white, 0.33),
    secondary: hexa(colors.white, 0.5),
    main: colors.white,
  },
};

// Convert

function hsbToHex(h, s, b) {
  let [red, green, blue] = hsbToRGB(h, s, b);
  return rgbToHex(red, green, blue);
}

function hsbToRGB(h, s, b) {
  s /= 100;
  b /= 100;
  const k = (n) => (n + h / 60) % 6;
  const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [
    Math.floor(255 * f(5)),
    Math.floor(255 * f(3)),
    Math.floor(255 * f(1)),
  ];
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export function hexa(hex, alpha) {
  let alphaHex = Math.round(alpha * 255).toString(16);
  if (alphaHex.length === 1) alphaHex = "0" + alphaHex;
  return hex + alphaHex;
}
