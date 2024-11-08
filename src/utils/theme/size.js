// Size

export const baseUnit = 20;
export const baseUnits = (n) => baseUnit * n;

// Space

const spaceConfig = {
  xs: { default: 0.2 },
  s: { default: 0.4 },
  sm: { default: 0.6 },
  m: { default: 1 },
  l: { default: 2, mobile: 1.5 },
  xl: { default: 4, tablet: 3, mobile: 2 },
};

export const getSpace = (screen) => {
  const space = parseScreen(spaceConfig, screen);
  for (let key in space) space[key] *= baseUnit;
  return space;
};

// Breakpoints

export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1200,
  ultrawide: 1920,
};

export const getScreen = (width) => {
  if (width >= breakpoints.ultrawide) return "ultrawide";
  if (width >= breakpoints.desktop) return "desktop";
  if (width >= breakpoints.tablet) return "tablet";
  return "mobile";
};

// Grid

const gridConfig = {
  gridWidth: { default: null, ultrawide: 1920 }, // null is for 100%
  cols: { mobile: 4, tablet: 8, default: 12 },
  margin: { mobile: 1, tablet: 2, desktop: 4, ultrawide: 4 }, // values in base units
  gap: { default: 0.5 },
};

export const getGrid = (screen, screenWidth) => {
  // get grid values for current screen
  const grid = parseScreen(gridConfig, screen);

  // adjust values
  if (!grid.gridWidth) grid.gridWidth = screenWidth;
  grid.margin *= baseUnit;
  grid.gap *= baseUnit;

  // calculate col width
  grid.colWidth =
    (grid.gridWidth - 2 * grid.margin - (grid.cols - 1) * grid.gap) / grid.cols;

  // calculate element width by columns
  grid.cols = (n) => {
    return n * grid.colWidth + (n - 1) * grid.gap;
  };

  return grid;
};

// Text

const textSizeConfig = {
  h1: { default: 3, tablet: 2.5, mobile: 2 },
  h2: { default: 2, mobile: 1.5 },
  h3: { default: 1.5, module: 1.25 },
  h4: { default: 1.25 },
  lead: { default: 1.25 },
  text: { default: 1 },
  ui: { default: 1 },
  caption: { default: 0.75 },
};

export function getTextSizeValues(screen) {
  return parseScreen(textSizeConfig, screen);
}

// Utils

function parseScreen(object, screen) {
  const result = {};
  for (let key in object) {
    result[key] = object[key][screen] || object[key].default;
  }
  return result;
}
