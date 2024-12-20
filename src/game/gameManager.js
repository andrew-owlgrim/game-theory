import Matter, { Body, Composite, Events } from "matter-js";
import Boundary from "./boundary";
import Person from "./person";
import { getRandomWeightedStrategy } from "./strategy";
import {
  getRandomVelocity,
  getRandomPosition,
  createObjectsInCircle,
} from "./gameUtils";
import Wall from "./wall";

export default class GameManager {
  constructor({ engine, entities, camera, cfg }) {
    this.engine = engine;
    this.entities = entities;
    this.camera = camera;
    this.cfg = cfg;

    this.toInteract = [];
    this.totalInteractions = 0;
    this.entropyApplied = false;

    this.persons = [];

    this.init();
  }

  // Lifecycle

  init() {
    this.engine.gravity.x = 0;
    this.engine.gravity.y = 0;
    this.engine.gravity.scale = 0;

    this.createBoundary();

    for (let i = 0; i < this.cfg.population; i++) {
      this.createPerson();
    }

    Events.trigger(this, "updatePersons", {
      persons: this.getPersons(),
    });

    Events.on(this.engine, "collisionStart", (e) => {
      e.pairs.forEach(({ bodyA, bodyB }) => {
        if (bodyA.label === "personBody" && bodyB.label === "personBody")
          this.toInteract.push([bodyA.person, bodyB.person]);
      });
    });
  }

  loop() {
    this.applySpeedCorrection();
    let personsChanged = false;
    const persons = this.getPersons();

    // Interactions
    if (this.toInteract.length > 0) {
      while (this.toInteract.length > 0) {
        const [person1, person2] = this.toInteract.shift();
        this.interaction(person1, person2);
        this.totalInteractions++;
      }
      personsChanged = true;
    }

    // Entropy
    if (this.cfg.entropy) {
      this.applyEntropy();
      if (this.entropyApplied) personsChanged = true;
    }

    // Evolution
    persons.forEach((person) => {
      if (person.score <= 0) {
        this.removePerson(person);
        this.createPerson();
        personsChanged = true;
      }
    });

    // Death
    if (this.cfg.death) personsChanged = this.applyDeath(personsChanged);
    console.log(this.persons[0].name, this.persons[0].totalInteractions);

    // Update event
    if (personsChanged)
      Events.trigger(this, "updatePersons", {
        persons: this.getPersons(),
      });
  }

  // Entities

  createPerson() {
    const person = new Person({
      position: getRandomPosition(
        0,
        0,
        this.cfg.boundarySize / 3 - this.cfg.personSize / 3
      ),
      size: this.cfg.personSize,
      score: this.cfg.initialScore,
      strategy: getRandomWeightedStrategy(this.cfg.distribution),
    });

    const { vx, vy } = getRandomVelocity(this.cfg.moveSpeed);
    Body.setVelocity(person.body, { x: vx, y: vy });

    this.entities.push(person);
    Composite.add(this.engine.world, person.body);
    this.persons.push(person);
  }

  removePerson(person) {
    const index = this.entities.indexOf(person);
    if (index !== -1) {
      this.entities.splice(index, 1); // Удаляем объект из текущего массива
    }
    this.persons = this.persons.filter((item) => item !== person);
    if (person.body) {
      Matter.Composite.remove(this.engine.world, person.body);
    }
  }

  getPersons() {
    return this.entities.filter((entity) => entity instanceof Person);
  }

  createBoundary() {
    let walls = [];
    walls = walls.concat(
      createObjectsInCircle(
        0,
        0,
        this.cfg.boundarySize / 2,
        36,
        (props) => new Wall({ ...props })
      )
    );
    walls = walls.concat(
      createObjectsInCircle(
        0,
        0,
        this.cfg.boundarySize / 2 - 5,
        18,
        (props) =>
          new Wall({ ...props, size: { x: 20, y: 15 }, shape: "triangle" })
      )
    );

    const bodies = walls.map((wall) => wall.body);
    Composite.add(this.engine.world, bodies);
    this.entities.push(...walls);
  }

  // Game logic

  interaction(personA, personB) {
    const decisionA = personA.decide(personB);
    const decisionB = personB.decide(personA);

    personA.addInteraction(personB, decisionA, decisionB);
    personB.addInteraction(personA, decisionB, decisionA);

    const [payoffA, payoffB] = this.cfg.payoffs[decisionA][decisionB];

    personA.score += payoffA;
    personB.score += payoffB;

    // console.log(
    //   `${personA.name} (${decisionA}) vs ${personB.name} (${decisionB}): ${payoffA} / ${payoffB}`
    // );
  }

  applyEntropy() {
    if (
      this.totalInteractions % this.cfg.entropyFrequence === 0 &&
      this.totalInteractions > 0
    ) {
      if (!this.entropyApplied) {
        const persons = this.getPersons();
        persons.forEach((person) => (person.score += this.cfg.entropyValue));
        this.entropyApplied = true;
      }
    } else this.entropyApplied = false;
  }

  applyDeath(personsChanged) {
    this.persons.forEach((person) => {
      if (person.totalInteractions >= this.cfg.lifespan) {
        this.removePerson(person);
        this.createPerson();
        this.personsChanged = true;
      }
    });
    return personsChanged;
  }

  //Physics

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
