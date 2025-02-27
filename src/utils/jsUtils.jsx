// Object

export const objectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

export function objectFilter(obj, predicate) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => predicate(value, key))
  );
}

// Case

export function camelToPascal(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
