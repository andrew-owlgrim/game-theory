import { css } from "styled-components";

export const sizeConfig = {
  default: { padding: 0.5, fontSize: 1 },
  xs: { padding: 0.25, fontSize: 0.75 },
  s: { padding: 0.25, fontSize: 1 },
  m: { padding: 0.5, fontSize: 1 },
  l: { padding: 0.75, fontSize: 1 },
  xl: { padding: 0.75, fontSize: 1.25 },
};

export const variantConfig = {
  default: (theme) => css`
    color: ${theme.color.main};
    background: transparent;

    &::before {
      border: 1px solid ${theme.color.border};
    }

    &:hover {
      background: ${theme.color.tile};
    }

    &:active {
      background: ${theme.color.fg};
    }
  `,

  primary: (theme) => css`
    color: ${theme.color.bg};
    background: ${theme.color.main};
  `,

  bare: () => css`
    color: ${theme.color.main};
    background: none;
    padding: ${theme.baseUnits(0.5)}px;
    margin: ${-theme.baseUnits(0.5)}px;
  `,

  bareSecondary: () => css`
    color: ${theme.color.secondary};
    background: none;
    padding: ${theme.baseUnits(0.5)}px;
    margin: ${-theme.baseUnits(0.5)}px;
  `,
};
