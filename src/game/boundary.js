import Entity from "./entity";
import { Bodies, Composite } from "matter-js";

// Entity

export default class Boundary extends Entity {
  constructor({
    position = { x: 0, y: 0 },
    size = 100,
    segments = 24,
    ...props
  } = {}) {
    super({ position, size, ...props });

    this.layer = "boundaries";
    this.composite = createCircularBoundary(
      position.x,
      position.y,
      size / 2,
      segments
    );

    // this.render = { stroke: "#fff4" };
  }

  render({ size, scale, ...props }) {
    const offset = 0;
    drawCircularBoundary({
      ...props,
      size: size + offset * scale,
      color: "#ff0",
    });
  }
}

// Body

function createCircularBoundary(cx, cy, radius, segments) {
  const angleStep = (2 * Math.PI) / segments;
  const composite = Composite.create();
  // const walls = [];

  for (let i = 0; i < segments; i++) {
    const angle = i * angleStep;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    const nextX = cx + radius * Math.cos(angle + angleStep);
    const nextY = cy + radius * Math.sin(angle + angleStep);

    const wall = Bodies.trapezoid(
      (x + nextX) / 2, // Центр сегмента
      (y + nextY) / 2,
      Math.sqrt((nextX - x) ** 2 + (nextY - y) ** 2), // Длина сегмента
      10, // Толщина стенки
      0.9,
      {
        isStatic: true,
        angle: Math.atan2(nextY - y, nextX - x) + Math.PI,
        restitution: 1,
        friction: 0,
        frictionStatic: 0,
      }
    );
    Composite.add(composite, wall);
    // walls.push(wall);
  }

  return composite;
}

// Drawer

function drawCircularBoundary({
  context,
  position,
  size,
  color = "black",
  lineWidth = 1,
}) {
  context.save();

  context.translate(position.x, position.y);

  context.strokeStyle = color;
  context.lineWidth = lineWidth;

  context.beginPath();
  context.arc(0, 0, size / 2, 0, Math.PI * 2);
  context.stroke();

  context.restore();
}
