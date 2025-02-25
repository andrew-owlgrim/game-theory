import { Bodies, Body } from "matter-js";
import { BODY_CATEGORY } from "../../constants";

export default function getWallBody({
  position = { x: 0, y: 0 },
  size = { x: 100, y: 100 },
  rotation = 0,
  shape = "rectangle",
} = {}) {
  const baseOptions = {
    isStatic: true,

    restitution: 1,
    friction: 0,
    frictionStatic: 0,

    collisionFilter: {
      category: BODY_CATEGORY.walls,
    },
  };

  let body;

  switch (shape) {
    case "rectangle":
      body = Bodies.rectangle(
        position.x,
        position.y,
        size.x,
        size.y,
        baseOptions
      );
      break;

    case "circle":
      const radius = size.x / 2; // Радиус определяется через ширину
      body = Bodies.circle(position.x, position.y, radius, baseOptions);
      break;

    case "triangle":
      const halfWidth = size.x / 2;
      const halfHeight = size.y / 2;
      body = Bodies.fromVertices(
        position.x,
        position.y,
        [
          { x: 0, y: -halfHeight },
          { x: -halfWidth, y: halfHeight },
          { x: halfWidth, y: halfHeight },
        ],
        baseOptions
      );
      break;

    default:
      throw new Error(`Unknown shape: ${shape}`);
  }

  Body.setAngle(body, rotation);
  return body;
}
