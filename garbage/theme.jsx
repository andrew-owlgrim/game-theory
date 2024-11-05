import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";

// Setup

const breakpoints = {
  ultrawide: {
    minWidth: 1920,
    cols: 12,
    gap: 20,
    margin: 50,
    gridWidth: 1920,
    gaps: { xl: 50, l: 32, m: 20, s: 16, xs: 8 },
    paddings: { xl: 50, l: 32, m: 20, s: 16, xs: 8 },
  },
  desktop: {
    minWidth: 1200,
    cols: 12,
    gap: 20,
    margin: 50,
    gridWidth: null,
    gaps: { xl: 50, l: 32, m: 20, s: 16, xs: 8 },
    paddings: { xl: 50, l: 32, m: 20, s: 16, xs: 8 },
  },
  tablet: {
    minWidth: 720,
    cols: 8,
    gap: 20,
    margin: 30,
    gridWidth: null,
    gaps: { xl: 20, l: 20, m: 20, s: 16, xs: 8 },
    paddings: { xl: 20, l: 20, m: 20, s: 16, xs: 8 },
  },
  mobile: {
    minWidth: 320,
    cols: 4,
    gap: 10,
    margin: 20,
    gridWidth: null,
    gaps: { xl: 20, l: 20, m: 16, s: 12, xs: 8 },
    paddings: { xl: 20, l: 20, m: 20, s: 16, xs: 8 },
  },
};

// Utils

const getBreakpoint = (width) => {
  if (width >= breakpoints.ultrawide.minWidth) return breakpoints.ultrawide;
  if (width >= breakpoints.desktop.minWidth) return breakpoints.desktop;
  if (width >= breakpoints.tablet.minWidth) return breakpoints.tablet;
  return breakpoints.mobile;
};

const getColWidth = (breakpoint, rootWidth) => {
  const totalGapsWidth = (breakpoint.cols - 1) * breakpoint.gap;
  const totalGridWidth = breakpoint.gridWidth
    ? breakpoint.gridWidth - 2 * breakpoint.margin
    : rootWidth - 2 * breakpoint.margin;
  const colWidth = (totalGridWidth - totalGapsWidth) / breakpoint.cols;
  return colWidth;
};

// Provider

const rootElement = document.getElementById("root");

export const GridThemeProvider = ({ children }) => {
  const [rootWidth, setRootWidth] = useState(window.innerWidth);
  const [breakpoint, setBreakpoint] = useState(getBreakpoint(rootWidth));
  const [colWidth, setColWidth] = useState(getColWidth(breakpoint));

  useEffect(() => {
    const handleResize = () => {
      const newWidth = rootElement.offsetWidth;
      const newBreakpoint = getBreakpoint(newWidth);
      setRootWidth(newWidth);
      setBreakpoint(newBreakpoint);
      setColWidth(getColWidth(newBreakpoint, newWidth));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Grid function

  const grid = (cols) => {
    return colWidth * cols + breakpoint.gap * (cols - 1);
  };

  const gap = (size) => {
    return breakpoint.pags[size];
  };

  const padding = (size) => {
    return breakpoint.paddings[size];
  };

  // Theme

  const theme = {
    breakpoint,
    grid,
    gap,
    padding,
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
