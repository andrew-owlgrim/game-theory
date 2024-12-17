// Draw Person

export function drawPerson({
  context,
  position,
  rotation,
  size,
  emoji,
  color,
}) {
  context.save();

  context.translate(position.x, position.y);
  context.rotate(rotation);

  context.fillStyle = color;
  context.font = `700 ${size}px "Noto Emoji"`;
  context.textAlign = "center";
  const yOffset = 0.33;
  context.fillText(emoji, 0, yOffset * size);

  context.restore();
}

// Draw Boundary

export function drawCircularBoundary({
  context,
  position,
  radius,
  color = "black",
  lineWidth = 1,
}) {
  context.save();

  context.translate(position.x, position.y);

  context.strokeStyle = color;
  context.lineWidth = lineWidth;

  context.beginPath();
  context.arc(0, 0, radius, 0, Math.PI * 2);
  context.stroke();

  context.restore();
}

export function drawRect({
  context,
  position,
  size,
  color = "black",
  lineWidth = 1,
}) {
  context.save();

  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.rect(position.x - size / 2, position.y - size / 2, size, size);
  context.stroke();

  context.restore();
}
