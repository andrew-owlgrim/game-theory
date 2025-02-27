import { GameMechanic } from "../../gameEngine";
import { Body } from "matter-js";

export default class SpeedCorrection extends GameMechanic {
  constructor(game, enabled) {
    super(game, enabled);
  }

  apply() {
    const persons = this.game.managers.personManager.persons;
    const targetSpeed = this.game.cfg.moveSpeed;
    const scalingFactor = this.game.cfg.msCorrectionFactor;

    persons.forEach((person, index) => {
      const body = person.body;
      const currentSpeed = Body.getSpeed(body);
      const deltaSpeed = currentSpeed - targetSpeed;

      if (Math.abs(deltaSpeed) > 0.1) {
        const correctionStep = deltaSpeed * scalingFactor;

        let newSpeed = currentSpeed - correctionStep;
        if (deltaSpeed > 0) {
          newSpeed = Math.max(targetSpeed, newSpeed);
        } else {
          newSpeed = Math.min(targetSpeed, newSpeed);
        }

        Body.setSpeed(body, newSpeed);
      }
    });
  }
}
