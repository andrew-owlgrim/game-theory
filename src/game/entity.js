import ID from "./id";

export default class Entity {
  constructor({
    position = { x: 0, y: 0 },
    size = null,
    rotation = 0,
    layer = null,
    body = null,
  } = {}) {
    this.id = ID.generate();
    this.body = body;

    this.position = position;
    this.rotation = rotation;

    this.size = size;
    this.visible = true;
    this.opacity = 1;
    this.layer = layer;
  }

  getPosition() {
    if (this.body) return this.body.position;
    else return this.position;
  }

  getSize() {
    return this.size;
  }

  getRotation() {
    if (this.body) return this.body.angle;
    return this.rotation;
  }

  render() {
    throw new Error("render() must be implemented by subclasses.");
  }
}
