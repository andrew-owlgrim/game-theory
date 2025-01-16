export function getRandomPosition(centerX, centerY, radius) {
  const theta = Math.random() * 2 * Math.PI; // Случайный угол
  const r = Math.sqrt(Math.random()) * radius; // Радиус с учётом равномерного распределения
  const x = centerX + r * Math.cos(theta);
  const y = centerY + r * Math.sin(theta);
  return { x, y };
}

export function getRandomVelocity(speed) {
  const theta = Math.random() * 2 * Math.PI; // Случайный угол
  const vx = speed * Math.cos(theta);
  const vy = speed * Math.sin(theta);
  return { vx, vy };
}

export function getCircleLayout(cx, cy, radius, segments) {
  const angleStep = (2 * Math.PI) / segments;
  const objectParams = [];

  for (let i = 0; i < segments; i++) {
    const angle = i * angleStep;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    const nextX = cx + radius * Math.cos(angle + angleStep);
    const nextY = cy + radius * Math.sin(angle + angleStep);

    objectParams.push({
      position: { x: (x + nextX) / 2, y: (y + nextY) / 2 },
      size: { x: Math.sqrt((nextX - x) ** 2 + (nextY - y) ** 2), y: 10 },
      rotation: Math.atan2(nextY - y, nextX - x) + Math.PI,
    });
  }

  return objectParams;
}
