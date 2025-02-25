import { Bodies, Body } from "matter-js";
import { BODY_CATEGORY } from "../../constants";

export default function createPersonBody(position, size) {
  const body = Bodies.circle(position.x, position.y, size / 2, {
    label: "personBody",

    restitution: 1,
    friction: 0,
    frictionStatic: 0,
    frictionAir: 0,
    density: 0.1,

    collisionFilter: {
      category: BODY_CATEGORY.persons,
    },
  });

  Body.setInertia(body, body.inertia / 3);

  return body;
}
