export default class SpeedCorrection {
  constructor(game) {
    this.game = game;
  }

  apply() {
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
}
