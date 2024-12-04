import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Option from "./Switch.Option";

// Switch Component

const Switch = ({ children, onChange, value: outerValue, ...props }) => {
  // Validation

  const childrenArray = React.Children.toArray(children);
  const areAllChildrenValid = childrenArray.every(
    (child) => child.type === Option
  );
  if (!areAllChildrenValid) {
    throw new Error("All children of Switch must be of type Switch.Option.");
  }
  if (childrenArray.length !== 2) {
    throw new Error("Switch component must have exactly 2 children.");
  }

  // Init

  const values = React.Children.map(children, (child) => child.props.value);
  const [activeIndex, setActiveIndex] = useState(
    (outerValue && values.indexOf(outerValue)) || 0
  );

  // Outer value change

  useEffect(() => {
    if (outerValue !== undefined && values.includes(outerValue)) {
      setActiveIndex(values.indexOf(outerValue));
    }
  }, [outerValue, values]);

  // Handle toggle

  const handleToggle = () => {
    const newIndex = activeIndex ? 0 : 1;
    setActiveIndex(newIndex);
    if (onChange) {
      onChange(values[newIndex]);
    }
  };

  //

  return (
    <SwitchContainer onClick={handleToggle} {...props}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          $active: values[activeIndex] === child.props.value,
          key: index,
        })
      )}
    </SwitchContainer>
  );
};

// Option

Switch.Option = Option;

// Style

const switchCss = ({ theme }) => css`
  flex-shrink: 0;

  ${theme.mixin.flex("row", null, null, null, theme.size(0.2))}

  ${theme.mixin.before}
  &::before {
    border-radius: 666px;
    border: 1px solid ${theme.color.main.border};
  }

  user-select: none;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    &::before {
      background: ${theme.color.main.bbg};
    }
    .switch-option.active {
      background: ${theme.color.main.main};
    }
  }

  & > * {
    flex: 1 0 0;
    min-width: 0;
  }
`;

const SwitchContainer = styled.div.attrs({
  className: "switch",
})`
  ${switchCss}
`;

// Export

export default Switch;
