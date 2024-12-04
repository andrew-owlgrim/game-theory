import { useCallback, useMemo, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import cfg from "./Theme.cfg";

import { getThemeColors, overlay, hexa } from "./utils/color";
import { size, getScreen, getSpace, getGrid, getRadius } from "./utils/size";
import { getTextSizes, getTextSize } from "./utils/typography";

// Provider

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );
  const [screen, setScreen] = useState(getScreen(window.innerWidth));
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Localstorage

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  // Window resize

  const handleResize = useCallback(() => {
    setScreen(getScreen(window.innerWidth));
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Calculations

  const color = useMemo(() => getThemeColors(mode), [mode]);

  const { space, textSize, breakpoint } = useMemo(
    () => ({
      space: getSpace(screen),
      textSize: {
        ...getTextSizes(screen),
        custom: getTextSize,
      },
      breakpoint: {
        ...cfg.breakpoints,
        current: cfg.breakpoints[screen],
      },
    }),
    [screen]
  );

  const grid = useMemo(
    () => getGrid(screen, screenWidth),
    [screen, screenWidth]
  );

  // Create theme object

  const theme = {
    mode,
    setMode,
    screen,
    breakpoint,
    color,
    hexa,
    overlay,
    size,
    space,
    radius: getRadius(cfg.radius),
    grid,
    textSize,
    textStyle: cfg.textStyle,
    mixin: cfg.mixin,
  };

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
