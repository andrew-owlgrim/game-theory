export { hexOverlay };

function hexOverlay(hexBg, hexFg, opacity = 1) {
  function parseHex(hex) {
    hex = hex.replace(/^#/, "");
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((c) => c + c)
        .join(""); // #fff → #ffffff
    if (hex.length === 4)
      hex = hex
        .split("")
        .map((c) => c + c)
        .join(""); // #fff0 → #ffffff00
    if (hex.length === 6) hex += "ff"; // #ffffff → #ffffffff (добавляем альфу)
    return {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16),
      a: parseInt(hex.substring(6, 8), 16) / 255, // Альфа в диапазоне 0-1
    };
  }

  const bgColor = parseHex(hexBg);
  const fgColor = parseHex(hexFg);

  // Вычисляем итоговую альфу
  fgColor.a *= opacity;
  const outAlpha = bgColor.a + fgColor.a * (1 - bgColor.a);

  if (outAlpha === 0) return "#00000000"; // Полностью прозрачный

  // Вычисляем смешанные каналы
  const r = blendChannel(bgColor.r, fgColor.r, bgColor.a, fgColor.a, outAlpha);
  const g = blendChannel(bgColor.g, fgColor.g, bgColor.a, fgColor.a, outAlpha);
  const b = blendChannel(bgColor.b, fgColor.b, bgColor.a, fgColor.a, outAlpha);

  // Преобразуем обратно в HEX
  const alphaHex = Math.round(outAlpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}${alphaHex}`;
}

function blendChannel(bg, fg, alphaBg, alphaFg, outAlpha) {
  return Math.round((bg * alphaBg * (1 - alphaFg) + fg * alphaFg) / outAlpha);
}
