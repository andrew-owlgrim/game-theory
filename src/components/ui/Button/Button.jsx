import React from "react";
import styled, { css } from "styled-components";
import { wrapTextNodes } from "../../../utils/common";

// Component

const Button = ({ variant, size, round, col, children, ...props }) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $col={col}
      $round={round}
      {...props}
    >
      {wrapTextNodes(children)}
    </StyledButton>
  );
};

// Style

const padding = { default: 0.4, s: 0.2, m: 0.4, l: 0.6 };

const buttonCss = ({ theme, $variant, $size, $round, $col }) => {
  const direction = $col ? "col" : "row";
  const paddingV = ($size ? padding[$size] : padding.default) * theme.size();
  const paddingH = $round ? paddingV * 1.333 : paddingV;
  const radius = $round ? 666 : theme.size(0.2);
  const variant = $variant
    ? variants[$variant](theme)
    : variants.default(theme);

  return css`
    flex-shrink: 0;

    ${theme.mixin.flex(direction, "center", "center", theme.size(0.2), [
      paddingV,
      paddingH,
    ])}

    border-radius: ${radius}px;
    border: none;
    outline: none;
    user-select: none;
    cursor: pointer;
    transition: all 200ms ease;
    backdrop-filter: blur(5);

    ${theme.textStyle.ui}
    ${theme.textSize.ui}

    ${theme.mixin.before}
    &::before {
      border-radius: ${radius}px;
    }

    svg,
    .icon {
      width: ${theme.size()}px;
      height: ${theme.size()}px;
    }

    span,
    .wrapped-text {
      padding: 0 ${theme.size(0.2)}px;
    }

    ${variant}
  `;
};

const StyledButton = styled.button.attrs({
  className: "button",
})`
  ${buttonCss}
`;

// Variants

const variants = {};

variants.default = (theme) => css`
  color: ${theme.color.main.main};
  background: transparent;
  outline: 3px solid transparent;

  &::before {
    border: 1px solid ${theme.color.main.border};
  }

  &:hover {
    background: ${theme.color.main.bbg};
  }

  &:active {
    background: ${theme.color.main.bg};
  }

  &:focus-visible {
    outline: 3px solid ${theme.color.main.bg};
  }
`;

variants.primary = (theme) => css`
  color: ${theme.color.bg.main};
  background: ${theme.color.main.main};
  outline: 3px solid transparent;

  &:hover {
    background: ${theme.color.main.primary};
  }

  &:active {
    background: ${theme.color.main.active};
  }

  &:focus-visible {
    background: ${theme.color.main.primary};
    outline: 3px solid ${theme.color.main.bg};
  }
`;

//

export default Button;
