import styled, { css } from "styled-components";

const Link = ({ children, inline, ...props }) => {
  return (
    <StyledA $inline={inline} {...props}>
      {children}
    </StyledA>
  );
};

const linkCss = ({ $inline, theme }) => css`
  ${!$inline && theme.textStyle.ui}
  ${!$inline && theme.textSize.ui}
  font-weight: 500;

  ${theme.mixin.before}
  &::before {
    border-bottom: 1px solid ${theme.color.main.active};
  }

  &:hover {
    font-weight: 600;
    letter-spacing: ${$inline ? -0.005 : 0.015}em;

    &::before {
      border-color: ${theme.color.main.main};
    }
  }
`;

const StyledA = styled.a`
  ${linkCss}
`;

export default Link;
