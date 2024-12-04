import styled, { css } from "styled-components";
import cfg from "./Select.cfg";

function listBoxCoreCss({ theme }) {
  return css`
    ${theme.mixin.flex(
      "col",
      null,
      null,
      theme.size(cfg.listBoxGap),
      theme.size(cfg.listBoxPadding)
    )}

    overflow: hidden;
  `;
}

const ListBox = styled.div.attrs({
  className: "listbox",
})`
  ${listBoxCoreCss}
  ${cfg.listBoxVariant}
`;

export default ListBox;
