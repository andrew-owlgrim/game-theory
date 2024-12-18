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

    this._position = position;
    this._rotation = rotation;

    this.size = size;
    this.visible = true;
    this.opacity = 1;
    this.layer = layer;
  }

  // Геттер и сеттер для позиции
  get position() {
    if (this.body) return this.body.position;
    return this._position;
  }

  set position(newPosition) {
    if (this.body) {
      // Обновление позиции тела, если оно связано с физическим движком
      Matter.Body.setPosition(this.body, newPosition);
    } else {
      this._position = newPosition;
    }
  }

  // Геттер и сеттер для угла
  get rotation() {
    if (this.body) return this.body.angle;
    return this._rotation;
  }

  set rotation(newRotation) {
    if (this.body) {
      // Обновление угла тела
      Matter.Body.setAngle(this.body, newRotation);
    } else {
      this._rotation = newRotation;
    }
  }
}
