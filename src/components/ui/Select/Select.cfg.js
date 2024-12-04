import { css } from "styled-components";

const selectCfg = {
  padding: { default: 0.4, s: 0.2, m: 0.4, l: 0.6 },
  gap: 0.2,
  radius: 0.2,

  textPadding: 0.2,
  popoverGap: 0.2,

  listBoxPadding: 0.0,
  listBoxGap: 0.2,
  roundPaddingHRatio: 1.333,

  optionPadding: 0.4,
  optionGap: 0.2,
  optionRadius: 0.2,
};

selectCfg.containerVariant = ({ $isOpen, theme }) => css`
  outline: 3px solid transparent;

  &::before {
    border: 1px solid ${theme.color.main.border};
  }

  ${$isOpen &&
  css`
    background: ${theme.color.main.bbg};
  `}

  &:hover {
    background: ${theme.color.main.bbg};
  }

  &:focus-visible {
    outline: 3px solid ${theme.color.main.bg};
  }

  .arrow-icon,
  .placeholder {
    color: ${theme.color.main.secondary};
  }
`;

selectCfg.listBoxVariant = ({ theme }) => css`
  background: ${theme.color.main.main};
  color: ${theme.color.bg.main};
  border-radius: ${theme.size(0.6)}px;
  border: ${theme.size(0.2)}px solid ${theme.color.main.main};
`;

selectCfg.optionVariant = ({ theme }) => css`
  &:hover,
  &:focus-visible {
    background: ${theme.color.bg.bg};
  }

  &:active {
    background: ${theme.color.bg.border};
  }
`;

export default selectCfg;
