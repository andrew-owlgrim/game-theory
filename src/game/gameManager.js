import Matter, { Body, Composite } from "matter-js";
import Boundary from "./boundary";
import Person from "./person";

export default class GameManager {
  constructor({ engine, entities, camera, cfg }) {
    this.engine = engine;
    this.entities = entities;
    this.camera = camera;
    this.cfg = cfg;

    this.engine.gravity.x = 0;
    this.engine.gravity.y = 0;
    this.engine.gravity.scale = 0;

    this.init();
  }

  // Lifecycle

  init() {
    this.createBoundary();
    for (let i = 0; i < this.cfg.population; i++) {
      this.createPerson();
    }
  }

  loop() {
    this.applySpeedCorrection();
  }

  // Entities

  createPerson() {
    const person = new Person({
      position: getRandomPosition(
        0,
        0,
        this.cfg.boundarySize / 2 - this.cfg.personSize / 2
      ),
      size: this.cfg.personSize,
      score: this.cfg.initialScore,
    });

    const { vx, vy } = getRandomVelocity(this.cfg.moveSpeed);
    Body.setVelocity(person.body, { x: vx, y: vy });

    this.entities.push(person);
    Composite.add(this.engine.world, person.body);
  }

  removePerson(person) {
    this.entities = this.entities.filter((entity) => entity !== person);
    if (person.body) {
      Matter.Composite.remove(this.engine.world, person.body);
    }
  }

  getPersons() {
    return this.entities.filter((entity) => entity instanceof Person);
  }

  createBoundary() {
    const boundary = new Boundary({
      position: { x: 0, y: 0 },
      size: this.cfg.boundarySize,
      segments: 36,
    });
    Composite.add(this.engine.world, boundary.composite);
    this.entities.push(boundary);
    this.boundary = boundary;
  }

  //

  applySpeedCorrection() {
    this.entities.forEach((entity) => {
      if (entity instanceof Person) {
        const body = entity.body;
        const currentSpeed = Body.getSpeed(body);
        const deltaSpeed = currentSpeed - this.cfg.moveSpeed;

        // Если отклонение достаточно велико, корректируем скорость
        if (deltaSpeed > 0.1) {
          Body.setSpeed(body, currentSpeed - this.cfg.msCorrectionForce / 60);
        } else if (deltaSpeed < 0.1) {
          Body.setSpeed(body, currentSpeed + this.cfg.msCorrectionForce / 60);
        }
      }
    });
  }

  applyAttractor() {
    if (this.boundary) {
      const center = {
        x: this.boundary.position.x,
        y: this.boundary.position.y,
      }; // Центр поля
      const maxDistance = this.boundary.size / 2; // Радиус круга (границы)

      const persons = this.getPersons();

      persons.forEach((person) => {
        // Вычисляем вектор от объекта к центру
        const direction = Matter.Vector.sub(center, person.body.position);
        const distance = Matter.Vector.magnitude(direction);

        if (distance > 0) {
          // Нормализуем вектор направления
          const normalizedDirection = Matter.Vector.normalise(direction);

          // Рассчитываем силу на основе расстояния
          const strength = 0.005 * (distance / maxDistance); // Пропорционально удалению

          // Применяем силу к объекту
          Matter.Body.applyForce(person.body, person.body.position, {
            x: normalizedDirection.x * strength,
            y: normalizedDirection.y * strength,
          });
        }
      });
    }
  }
}

// Utils

function getRandomPosition(centerX, centerY, radius) {
  const theta = Math.random() * 2 * Math.PI; // Случайный угол
  const r = Math.sqrt(Math.random()) * radius; // Радиус с учётом равномерного распределения
  const x = centerX + r * Math.cos(theta);
  const y = centerY + r * Math.sin(theta);
  return { x, y };
}

function getRandomVelocity(speed) {
  const theta = Math.random() * 2 * Math.PI; // Случайный угол
  const vx = speed * Math.cos(theta);
  const vy = speed * Math.sin(theta);
  return { vx, vy };
}
