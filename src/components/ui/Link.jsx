import styled from "styled-components";

const Link = ({ children, ...props }) => {
  return <StyledA {...props}>{children}</StyledA>;
};

const StyledA = styled.a`
  border-bottom: 1px solid ${({ theme }) => theme.colors?.main || "black"};
`;

export default Link;
