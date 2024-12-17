import Entity from "./entity";
import { Bodies, Composite } from "matter-js";
import View from "./view";
import { drawCircularBoundary } from "./drawer";

export default class Boundary extends Entity {
  constructor({ position = { x: 0, y: 0 }, radius = 100, segments = 24 } = {}) {
    const body = createCircularBoundary(
      position.x,
      position.y,
      radius,
      segments
    );

    const view = new View({
      layer: "boundaries",
      render: ({ scale, ...props }) => {
        drawCircularBoundary({
          ...props,
          offset: -10 * scale,
          color: "#ff0",
        });
      },
    });

    super({ body, view });
  }

  get bounds() {
    return Composite.bounds(this.body);
  }

  get size() {
    const bounds = this.bounds;
    return { x: bounds.max.x - bounds.min.x, y: bounds.max.y - bounds.min.y };
  }

  get position() {
    const bounds = this.bounds;
    return {
      x: (bounds.min.x + bounds.max.x) / 2,
      y: (bounds.min.y + bounds.max.y) / 2,
    };
  }
}

function createCircularBoundary(cx, cy, radius, segments) {
  const angleStep = (2 * Math.PI) / segments;
  const composite = Composite.create();

  for (let i = 0; i < segments; i++) {
    const angle = i * angleStep;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    const nextX = cx + radius * Math.cos(angle + angleStep);
    const nextY = cy + radius * Math.sin(angle + angleStep);

    const wall = Bodies.rectangle(
      (x + nextX) / 2, // Центр сегмента
      (y + nextY) / 2,
      Math.sqrt((nextX - x) ** 2 + (nextY - y) ** 2), // Длина сегмента
      10, // Толщина стенки
      {
        isStatic: true,
        angle: Math.atan2(nextY - y, nextX - x),
        restitution: 1,
        friction: 0,
        render: { fillStyle: "blue" },
      }
    );
    Composite.add(composite, wall);
  }

  return composite;
}
