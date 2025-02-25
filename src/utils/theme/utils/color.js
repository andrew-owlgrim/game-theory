import { objectMap } from "@/utils/jsUtils";
import cfg from "../Theme.cfg";

// Theme

export function getThemeColors(mode) {
  const currentColor = parseMode(cfg.color, mode);
  return objectMap(currentColor, (v) => getThemeColor(v, cfg.colorRoles));
}

function getThemeColor(hex, roles) {
  return objectMap(roles, (v) => hexa(hex, v));
}

function parseMode(color, mode) {
  return objectMap(color, (v) => {
    if (typeof v === "object") return v[mode];
    else if (typeof v === "string") return v;
  });
}

// Overlay

export function overlay(hexBottom, hexTop) {
  const bottom = hexToRgba(hexBottom);
  const top = hexToRgba(hexTop);

  const aOut = top.a + bottom.a * (1 - top.a);

  const rOut = Math.round(
    (top.r * top.a + bottom.r * bottom.a * (1 - top.a)) / aOut
  );
  const gOut = Math.round(
    (top.g * top.a + bottom.g * bottom.a * (1 - top.a)) / aOut
  );
  const bOut = Math.round(
    (top.b * top.a + bottom.b * bottom.a * (1 - top.a)) / aOut
  );

  return rgbaToHex({ r: rOut, g: gOut, b: bOut, a: aOut });
}

// Convert

export function hsbToHex(h, s, b) {
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

// To clean
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbaToHex({ r, g, b, a }) {
  const toHex = (value) => value.toString(16).padStart(2, "0");
  const alpha = Math.round(a * 255);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 1 ? toHex(alpha) : ""}`;
}

export function hexa(hex, alpha) {
  let alphaHex = Math.round(alpha * 255).toString(16);
  if (alphaHex.length === 1) alphaHex = "0" + alphaHex;
  return hex + alphaHex;
}

function hexToRgba(hex) {
  let r = 0,
    g = 0,
    b = 0,
    a = 1;

  if (hex.length === 4 || hex.length === 5) {
    // #RGB or #RGBA
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
    if (hex.length === 5) a = parseInt(hex[4] + hex[4], 16) / 255;
  } else if (hex.length === 7 || hex.length === 9) {
    // #RRGGBB or #RRGGBBAA
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
    if (hex.length === 9) a = parseInt(hex.slice(7, 9), 16) / 255;
  }

  return { r, g, b, a };
}
