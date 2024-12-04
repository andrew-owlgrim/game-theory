import React, { cloneElement, useEffect, useRef, useState } from "react";
import styled, { css, useTheme } from "styled-components";
import { wrapTextNodes } from "@/utils/common";

import cfg from "./Select.cfg";
import Option from "./Select.Option";
import ListBox from "./Select.ListBox";

import { Popover } from "react-tiny-popover";
import { ArrowDownIcon } from "../../Icons";

// Select Component

function Select({
  children,
  onChange,
  value: outerValue,
  placeholder,
  round,
  size,
  ...props
}) {
  // Validate

  React.Children.forEach(children, (child) => {
    if (child.type !== Select.Option)
      throw new Error("Select children must be only Select.Children");
  });

  // Init

  const [value, setValue] = useState(outerValue);
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(
    outerValue !== undefined &&
      children.find((child) => child.props.value === outerValue).props.children
  );

  // Handle option select

  const handleSelect = (newValue, content) => {
    if (onChange && value != newValue) {
      onChange(newValue);
    }
    setValue(newValue);
    setContent(content);
    setIsOpen(false);
  };

  // Outer value change // To test

  useEffect(() => {
    if (outerValue !== undefined) {
      setValue(outerValue);
      setContent(
        children.find((child) => child.props.value === outerValue).props
          .children
      );
    }
  }, [outerValue]);

  // Popover width

  const containerRef = useRef();
  const [containerWidth, setContainerWidth] = useState(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef.current]);

  const theme = useTheme();

  //

  return (
    <Popover
      ref={containerRef}
      isOpen={isOpen}
      positions={["bottom", "top"]}
      onClickOutside={() => setIsOpen(false)}
      padding={theme.size(cfg.popoverGap)}
      containerStyle={{
        width: containerWidth + "px" || "initial",
      }}
      content={
        <ListBox>
          {children.map((child, index) =>
            cloneElement(child, {
              key: index,
              onClick: () =>
                handleSelect(child.props.value, child.props.children),
              isActive: child.props.value === value,
            })
          )}
        </ListBox>
      }
    >
      <SelectContainer
        $isOpen={isOpen}
        $round={round}
        $size={size}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        <div className="content">
          {content ? (
            wrapTextNodes(content)
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
        </div>
        <ArrowDownIcon className="arrow-icon" />
      </SelectContainer>
    </Popover>
  );
}

// Select Option

Select.Option = Option;

// Style

const containerCoreCss = ({ $size, $round, theme }) => {
  const paddingV = $size ? cfg.padding[$size] : cfg.padding.default;
  const paddingH = $round ? paddingV * cfg.roundPaddingHRatio : paddingV;

  return css`
    flex-shrink: 0;

    ${theme.mixin.flex("row", "center", null, theme.size(cfg.gap), [
      theme.size(paddingV),
      theme.size(paddingH),
    ])}

    border-radius: ${$round ? 666 : theme.size(cfg.radius)}px;
    ${theme.mixin.before}
    &::before {
      border-radius: ${$round ? 666 : theme.size(cfg.radius)}px;
    }

    cursor: pointer;
    user-select: none;

    .arrow-icon {
      width: ${theme.size()}px;
      height: ${theme.size()}px;
    }

    .content {
      flex: 1 0 0;
      min-width: 0;

      ${theme.mixin.flex("row", "center", null, theme.size(cfg.optionGap))}
      ${theme.mixin.truncate()}
      ${theme.textStyle.ui}
      ${theme.textSize.ui}
    }

    span.wrapped-text {
      padding: 0 ${theme.size(cfg.textPadding)}px;
    }

    .placeholder {
      ${theme.mixin.truncate()}
      ${theme.textStyle.ui}
    ${theme.textSize.ui}
    }
  `;
};

const SelectContainer = styled.div.attrs({
  className: "select",
})`
  ${containerCoreCss}
  ${cfg.containerVariant}
`;

//

export default Select;
