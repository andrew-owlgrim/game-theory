import styled, { css } from "styled-components";

const optionCss = ({ theme, $active }) => css`
  ${theme.mixin.flex("row", "center", "center", theme.size(0.2), [
    theme.size(0.4),
    theme.size(0.6),
  ])}
  z-index: 0;

  ${theme.mixin.before}

  border-radius: 666px;

  svg,
  .icon {
    width: ${theme.size(1)}px;
    height: ${theme.size(1)}px;
  }

  ${$active
    ? css`
        background: ${theme.color.main.primary};
        color: ${theme.color.bg.main};
      `
    : css`
        color: ${theme.color.main.secondary};
      `};
`;

const Option = styled.div.attrs(({ $active }) => ({
  className: "switch-option" + ($active ? " active" : ""),
}))`
  ${optionCss}
`;

export default Option;
