import { Entity } from "../../../gameEngine";
import drawText from "./Text.drawer";

export default class Text extends Entity {
  constructor({ value, relatedEntity, body, view } = {}) {
    super({ view, body });
    this.value = value ?? "";
    this.relatedEntity = relatedEntity;
  }

  render(context) {
    drawText(context, this);
  }
}
