import { useCallback, useMemo, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

// theme modules
import { hexa, getThemeColors, overlay } from "./color";
import {
  baseUnit,
  baseUnits,
  getGrid,
  getScreen,
  getSpace,
  getTextSizeValues,
} from "./size";
import { textStyle, getTextSizes, getTextSize } from "./typography";
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

  const color = useMemo(() => getThemeColors(mode), [mode]);
  const size = useMemo(
    () => ({
      baseUnit,
      baseUnits,
      space: getSpace(screen),
      grid: getGrid(screen, screenWidth),
      textSize: {
        ...getTextSizes(getTextSizeValues(screen)),
        custom: getTextSize,
      },
    }),
    [screen, screenWidth]
  );

  const theme = {
    mode,
    setMode,
    screen,
    color,
    hexa,
    overlay,
    ...size,
    textStyle,
    mixin,
  };

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
