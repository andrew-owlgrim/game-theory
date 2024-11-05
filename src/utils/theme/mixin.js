import { css } from "styled-components";

const mixin = {};

mixin.before = css`
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    pointer-events: none;
    z-index: -1;
  }
`;

export default mixin;
