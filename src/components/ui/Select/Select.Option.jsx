import styled, { css } from "styled-components";
import { wrapTextNodes } from "@/utils/common";
import cfg from "./Select.cfg";
import { CheckIcon } from "../../Icons";

const Option = ({ value, isActive, children, ...props }) => {
  return (
    <OptionContainer $active={isActive} {...props}>
      {wrapTextNodes(children)}
      {isActive && <CheckIcon className="check" />}
    </OptionContainer>
  );
};

const OptionCss = ({ theme }) => css`
  ${theme.mixin.flex(
    "row",
    "center",
    null,
    theme.size(cfg.optionGap),
    theme.size(cfg.optionPadding)
  )}

  border-radius: ${theme.size(cfg.optionRadius)}px;
  color: inherit;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  user-select: none;

  ${theme.textStyle.ui}
  ${theme.textSize.ui}

  & > * {
    flex-shrink: 0;
  }

  span {
    flex: 1 0 0;
    min-width: 0;

    padding: 0 ${theme.size(cfg.textPadding)}px;
  }

  .check {
    width: ${theme.size()}px;
    height: ${theme.size()}px;
  }
`;

const OptionContainer = styled.button`
  ${OptionCss}
  ${cfg.optionVariant}
`;

export default Option;
