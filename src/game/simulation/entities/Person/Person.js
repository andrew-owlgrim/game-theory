import { Entity } from "../../../gameEngine";
import createPersonBody from "./Person.body";
import drawPerson from "./Person.drawer";

export default class Person extends Entity {
  constructor({
    name,
    emoji,
    strategy,
    score,
    position,
    size,
    view,
    birthday,
  } = {}) {
    super({ view });

    this.body = createPersonBody(position ?? { x: 0, y: 0 }, size ?? 10);
    this.body.person = this;

    this.name = name ?? "unnamed";
    this.strategy = strategy;
    this.emoji = emoji ?? "🤖";
    this.score = score ?? 0;
    this.birthday = birthday;
    this.state = null;
  }

  render(context) {
    drawPerson(context, this);
  }
}
