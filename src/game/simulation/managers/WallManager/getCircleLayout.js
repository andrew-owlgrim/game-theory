export default function getCircleLayout(cx, cy, radius, segments) {
  const angleStep = (2 * Math.PI) / segments;
  const objectParams = [];

  for (let i = 0; i < segments; i++) {
    const angle = i * angleStep;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    objectParams.push({
      position: { x, y },
      rotation: angle + Math.PI / 2,
    });
  }

  return objectParams;
}
