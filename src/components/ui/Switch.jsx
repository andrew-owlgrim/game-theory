import { useState } from "react";
import styled, { css } from "styled-components";

const Switch = ({ options, onChange, ...props }) => {
  if (!options || options.length !== 2) {
    throw new Error(
      "The options prop must be an array with exactly 2 elements."
    );
  }

  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = () => {
    const newIndex = activeIndex === 0 ? 1 : 0;
    setActiveIndex(newIndex);
    if (onChange) {
      onChange(newIndex);
    }
  };

  return (
    <SwitchContainer
      onClick={handleToggle}
      style={{ cursor: "pointer" }}
      {...props}
    >
      {options.map((option, index) => (
        <Option $active={activeIndex === index} key={index}>
          {option}
        </Option>
      ))}
    </SwitchContainer>
  );
};

const SwitchContainer = styled.div.attrs({
  className: "switch",
})`
  flex-shrink: 0;

  display: flex;
  flex-direction: row;

  background: ${({ theme }) => theme.color.main.bg};
  border-radius: ${({ theme }) => theme.baseUnits(0.2)}px;
  user-select: none;
  cursor: pointer;
`;

const Option = styled.div.attrs({
  className: "switch-option",
})`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.baseUnits(0.2)}px;
  padding: ${({ theme }) => theme.baseUnits(0.4)}px
    ${({ theme }) => theme.baseUnits(0.6)}px;
  z-index: 0;

  ${({ theme }) => theme.mixin.before}

  border-radius: ${({ theme }) => theme.baseUnits(0.2)}px;
  &::before {
    border-radius: ${({ theme }) => theme.baseUnits(0.2)}px;
  }

  svg,
  .icon {
    width: ${({ theme }) => theme.baseUnits(1)}px;
    height: ${({ theme }) => theme.baseUnits(1)}px;
  }

  ${({ $active, theme }) =>
    $active
      ? css`
          &::before {
            background: ${theme.color.bg.main};
            border: 1px solid ${theme.color.main.border};
          }
        `
      : css`
          color: ${theme.color.main.secondary};
        `};
`;

export default Switch;
