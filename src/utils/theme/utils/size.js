import { objectMap } from "../../common";
import cfg from "../Theme.cfg";

// Size

export const size = (factor = 1, pow = 1) => cfg.rem * Math.pow(factor, pow);

// Space

export const getSpace = (screen) => {
  const currentSpace = parseScreen(cfg.space, screen);
  return objectMap(currentSpace, (v) => v * cfg.rem);
};

// Radius

export const getRadius = (radius) => {
  return objectMap(radius, (v) => v * cfg.rem);
};

// Screen

export const getScreen = (width) => {
  const entries = Object.entries(cfg.breakpoints).sort((a, b) => b[1] - a[1]);
  for (let [key, value] of entries) {
    if (width >= value) return key;
  }
  return "default";
};

// Grid

export const getGrid = (screen, screenWidth) => {
  // get grid values for current screen
  const grid = parseScreen(cfg.grid, screen);

  // adjust values
  if (!grid.gridWidth) grid.gridWidth = screenWidth;
  grid.margin *= cfg.rem;
  grid.gap *= cfg.rem;

  // calculate col width
  grid.colWidth =
    (grid.gridWidth - 2 * grid.margin - (grid.cols - 1) * grid.gap) / grid.cols;

  // calculate element width by columns
  grid.cols = (n) => {
    return n * grid.colWidth + (n - 1) * grid.gap;
  };

  return grid;
};

// Parse screen

export const parseScreen = (object, screen) => {
  return objectMap(object, (v) => {
    if (typeof v === "object") return v[screen] || v.default;
    else return v;
  });
};
