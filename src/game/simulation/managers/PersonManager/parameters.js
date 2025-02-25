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
