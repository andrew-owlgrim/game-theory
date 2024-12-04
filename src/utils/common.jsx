import React from "react";

// Object Map

export const objectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

// Wrap Text Nodes

export function wrapTextNodes(children) {
  return React.Children.map(children, (child) =>
    typeof child === "string" ? (
      <span className="wrapped-text">{child}</span>
    ) : (
      child
    )
  );
}

export function wrapText(value) {
  if (typeof value === "string")
    return <span className="wrapped-text">{value}</span>;
  else return value;
}
