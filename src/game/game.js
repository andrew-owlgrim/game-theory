import Matter, {
  Body,
  Engine,
  Render,
  Bodies,
  Composite,
  Runner,
} from "matter-js";
import Person from "./person";
import { drawCircularBoundary, drawPerson } from "./drawer";
import Boundary from "./boundary";

const cfg = {
  population: 30,
  moveSpeed: 2,
  msCorrectionForce: 1, // forse that corrects move speed
  space: 5,
};

export default class Game {
  constructor({ canvas = "canvas", population = cfg.population }) {
    const canvasEl = document.querySelector(canvas);
    if (!canvasEl) console.error("Canvas element not found");

    // Population

    this.population = [];
    for (let i = 0; i < population; i++) {
      this.population.push(new Person());
    }

    // Engine

    this.engine = Engine.create();
    this.render = Render.create({
      canvas: canvasEl,
      engine: this.engine,
    });

    this.engine.gravity.x = 0;
    this.engine.gravity.y = 0;
    this.engine.gravity.scale = 0;
    this.targetSpeed = 2; // Целевая скорость (пиксели/с)
    this.force = 1; // Величина коррекции (ускорение/замедление в пикселях/с^2)

    // Add game objects

    // Create circular boundary
    const boundaryRadius = 300;
    const boundary = new Boundary({
      position: { x: 400, y: 400 },
      radius: boundaryRadius,
      segments: 36,
    });
    Composite.add(this.engine.world, boundary.body);

    // Create balls for each person
    this.population.forEach((person) => {
      const { x, y } = this.getRandomPosition(400, 400, boundaryRadius - 20);
      const { vx, vy } = this.getRandomVelocity(2);
      const radius = 20;

      const body = Bodies.circle(x, y, radius, {
        restitution: 1,
        friction: 0,
        frictionAir: 0,
        angularDamping: 0,
        density: 1,
        mass: 1,
        collisionFilter: {
          category: 0x0001,
          mask: 0x0001 | 0x0002,
        },
      });
      Matter.Body.setVelocity(body, { x: vx, y: vy });

      person.body = body;
      Composite.add(this.engine.world, body);
    });

    // Events

    Matter.Events.on(this.engine, "afterUpdate", () =>
      this.applySpeedCorrection()
    );

    Matter.Events.on(this.render, "afterRender", () => {
      this.population.forEach((person) => {
        person.view.render({
          context: this.render.context,
          position: person.body.position,
          rotation: person.body.angle,
        });
      });

      boundary.view.render({
        context: this.render.context,
        position: boundary.body.position,
        rotation: boundary.body.angle,
      });
    });

    // Create runner

    this.runner = Runner.create();
    console.log("hui");
  }

  // Метод для генерации случайной позиции внутри круга
  getRandomPosition(centerX, centerY, radius) {
    const theta = Math.random() * 2 * Math.PI; // Случайный угол
    const r = Math.sqrt(Math.random()) * radius; // Радиус с учётом равномерного распределения
    const x = centerX + r * Math.cos(theta);
    const y = centerY + r * Math.sin(theta);
    return { x, y };
  }

  // Метод для генерации случайной начальной скорости
  getRandomVelocity(speed) {
    const theta = Math.random() * 2 * Math.PI; // Случайный угол
    const vx = speed * Math.cos(theta);
    const vy = speed * Math.sin(theta);
    return { vx, vy };
  }

  applySpeedCorrection() {
    this.population.forEach((person) => {
      const body = person.body;
      const currentSpeed = Body.getSpeed(body);
      const deltaSpeed = currentSpeed - this.targetSpeed;

      // Если отклонение достаточно велико, корректируем скорость
      if (deltaSpeed > 0.1) {
        Body.setSpeed(body, currentSpeed - this.force / 60);
        // console.log(
        //   "slow down " + person.name,
        //   "current speed: " + currentSpeed
        // );
      } else if (deltaSpeed < 0.1) {
        Body.setSpeed(body, currentSpeed + this.force / 60);
        // console.log(
        //   "speed up " + person.name,
        //   "current speed: " + currentSpeed
        // );
      }
    });
  }

  start() {
    Render.run(this.render);
    Runner.run(this.runner, this.engine);
  }

  finish() {
    Matter.Render.stop(this.render);
    Matter.Runner.stop(this.runner);
    Matter.Engine.clear(this.engine);
  }
}
