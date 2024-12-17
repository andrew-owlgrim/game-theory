import ID from "./id";

export default class Entity {
  constructor({ body = null, view = null } = {}) {
    this.id = ID.generate();
    this.body = body;
    this.view = view;
  }

  get position() {
    this.body.position;
  }

  get size() {
    const bounds = this.body?.bounds();
    if (bounds)
      return { x: bounds.max.x - bounds.min.x, y: bounds.max.y - bounds.min.y };
    else return undefined;
  }
}
