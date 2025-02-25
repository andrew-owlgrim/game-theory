import { Entity } from "../../../gameEngine";
import { drawBody } from "../../../render";
import getWallBody from "./Wall.body";

// Entity

export default class Wall extends Entity {
  constructor({ position, size, shape, view } = {}) {
    super({
      body: getWallBody({ position, size, shape }),
      view: view,
    });
  }

  render(context) {
    drawBody({ context, body: this.body, view: this.view });
  }
}
