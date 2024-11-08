import { css } from "styled-components";

export const generalConfig = {
  borderRadius: 0.2,
  roundPaddingHRatio: 1.5,
  gap: 0.2,
};

export const sizeConfig = {
  default: { padding: 0.4, fontSize: 1 },
  xs: { padding: 0.2, fontSize: 0.8 },
  s: { padding: 0.2, fontSize: 1 },
  m: { padding: 0.4, fontSize: 1 },
  l: { padding: 0.6, fontSize: 1 },
  xl: { padding: 0.6, fontSize: 1.2 },
};

const variantConfig = {};

variantConfig.default = (theme) => css`
  color: ${theme.color.main.main};
  background: transparent;

  &::before {
    border: 1px solid ${theme.color.main.border};
  }

  &:hover {
    color: ${theme.color.primary.main};
    background: ${theme.color.primary.tile};
    &::before {
      border-color: ${theme.color.primary.tertiary};
    }
  }

  &:active {
    color: ${theme.color.primary.main};
    background: ${theme.color.primary.bg};
    &::before {
      border-color: ${theme.color.primary.tertiary};
    }
  }
`;

variantConfig.primary = (theme) => css`
  color: ${theme.color.bg.main};
  background: ${theme.color.main.main};

  &:hover {
    background: ${theme.color.primary.main};
  }

  &:active {
    background: ${theme.overlay(
      theme.color.primary.main,
      theme.color.main.border
    )};
  }
`;

variantConfig.bare = () => css`
  color: ${theme.color.main};
  background: none;
  padding: ${theme.baseUnits(0.5)}px;
  margin: ${-theme.baseUnits(0.5)}px;
`;

variantConfig.bareSecondary = () => css`
  color: ${theme.color.secondary};
  background: none;
  padding: ${theme.baseUnits(0.5)}px;
  margin: ${-theme.baseUnits(0.5)}px;
`;

export { variantConfig };
