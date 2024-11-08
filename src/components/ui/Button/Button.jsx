import React from "react";
import styled, { css } from "styled-components";
import { generalConfig, sizeConfig, variantConfig } from "./config";

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

const StyledButton = styled.button.attrs({
  className: "button",
})`
  flex-shrink: 0;

  display: flex;
  flex-direction: ${({ $col }) => ($col ? "column" : "row")};
  align-items: center;

  border-radius: ${({ theme, $round }) =>
    $round ? 666 : theme.baseUnits(generalConfig.borderRadius)}px;
  border: none;
  outline: none;
  user-select: none;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(5);

  ${({ theme }) => theme.mixin.before}
  &::before {
    border-radius: ${({ theme, $round }) =>
      $round ? 666 : theme.baseUnits(generalConfig.borderRadius)}px;
  }

  ${sizeMixin}
  ${variantMixin}
`;

// Utils

function wrapTextNodes(children) {
  return React.Children.map(children, (child) =>
    typeof child === "string" ? <span>{child}</span> : child
  );
}

function sizeMixin({ theme, $size, $round }) {
  const paddingV =
    ($size && sizeConfig[$size].padding) || sizeConfig.default.padding;
  const paddingH = $round
    ? paddingV * generalConfig.roundPaddingHRatio
    : paddingV;
  const fontSize = sizeConfig[$size]?.fontSize || sizeConfig.default.fontSize;

  return css`
    padding: ${theme.baseUnits(paddingV)}px ${theme.baseUnits(paddingH)}px;
    gap: ${theme.baseUnits(fontSize * generalConfig.gap)}px;

    ${theme.textSize.custom(fontSize)}

    svg,
    .icon {
      width: ${theme.baseUnits(fontSize)}px;
      height: ${theme.baseUnits(fontSize)}px;
    }

    span {
      padding: 0 ${theme.baseUnits(fontSize * generalConfig.gap)}px;
    }
  `;
}

function variantMixin({ theme, $variant }) {
  return $variant
    ? variantConfig[$variant](theme)
    : variantConfig.default(theme);
}

export default Button;
