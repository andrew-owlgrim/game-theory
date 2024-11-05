import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { colors, hexa, themeColors } from "./color";
import { baseUnit, baseUnits, getGrid, getScreen, getSpace } from "./size";
import { useCallback, useMemo, useState, useEffect } from "react";
import getTypography, { textSize, typographyMixin } from "./typography";
import mixin from "./mixin";

// Provider

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const [screen, setScreen] = useState(getScreen(window.innerWidth));
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Window resize

  const handleResize = useCallback(() => {
    setScreen(getScreen(window.innerWidth));
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Create theme object

  const color = useMemo(() => ({ ...colors, ...themeColors[mode] }), [mode]);
  const size = useMemo(
    () => ({
      baseUnit,
      baseUnits,
      space: getSpace(screen),
      grid: getGrid(screen, screenWidth),
    }),
    [screen, screenWidth]
  );
  const typography = useMemo(() => getTypography(screen), [screen]);

  const theme = {
    mode,
    setMode,
    screen,
    color,
    hexa,
    ...size,
    typography,
    typographyMixin,
    textSize,
    mixin,
  };

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
