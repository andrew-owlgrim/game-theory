import { Entity } from "../../gameEngine";

export default class Text extends Entity {
  constructor({ value, view } = {}) {
    super({ view });

    this.value = value ?? "";
  }

  render(context) {
    drawPerson(context, this);
  }
}
