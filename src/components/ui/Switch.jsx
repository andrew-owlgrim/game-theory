import styled from "styled-components";

const Switch = ({ children, ...props }) => {
  return <StyledA {...props}>{children}</StyledA>;
};

const StyledA = styled.a`
  border-bottom: 1px solid ${({ theme }) => theme.colors.main || "black"};
`;

export default Switch;
