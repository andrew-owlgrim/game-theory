// Size

export const baseUnit = 20;
export const baseUnits = (n) => baseUnit * n;

// Space

const spaceConfig = {
  xs: { default: 0.25 },
  s: { default: 0.5 },
  m: { default: 1 },
  l: { default: 2, mobile: 1.5 },
  xl: { default: 4, tablet: 3, mobile: 2 },
};

export const getSpace = (screen) => {
  const space = {};
  for (let key in spaceConfig) {
    space[key] =
      (spaceConfig[key][screen] || spaceConfig[key].default) * baseUnit;
  }
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
  const grid = {};
  for (let key in gridConfig) {
    grid[key] = gridConfig[key][screen] || gridConfig[key].default;
  }

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
