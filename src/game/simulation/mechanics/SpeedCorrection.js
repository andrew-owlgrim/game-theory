import { GameMechanic } from "../../gameEngine";
import { Body } from "matter-js";

export default class SpeedCorrection extends GameMechanic {
  constructor(game, enabled) {
    super(game, enabled);
  }

  apply() {
    const persons = this.game.managers.personManager.persons;
    const targetSpeed = this.game.cfg.moveSpeed;
    const correctionForce = this.game.cfg.msCorrectionForce / 60;
    const scalingFactor = targetSpeed * 0.5; // Чем больше, тем мягче коррекция

    persons.forEach((person) => {
      const body = person.body;
      const currentSpeed = Body.getSpeed(body);
      const deltaSpeed = currentSpeed - targetSpeed;

      if (Math.abs(deltaSpeed) > 0.1) {
        const correctionStep =
          correctionForce *
          (1 - Math.exp(-Math.abs(deltaSpeed) / scalingFactor));

        let newSpeed = currentSpeed;
        if (deltaSpeed > 0) {
          newSpeed = Math.max(targetSpeed, currentSpeed - correctionStep);
        } else {
          newSpeed = Math.min(targetSpeed, currentSpeed + correctionStep);
        }

        Body.setSpeed(body, newSpeed);
      }
    });
  }
}
