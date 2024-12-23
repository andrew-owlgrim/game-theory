import gameContext from "./context";
import Entity from "./entity";
import { drawPerson } from "./person";

export default class DeathAnimation extends Entity {
  constructor(props = {}) {
    super(props);
    this.layer = "bgEffects";
    this.emoji = "☠";

    const { deathAnimationDuration } = gameContext.cfg;
    const { timestamp } = gameContext.engine.timing;
    this.animationEndTime = timestamp + deathAnimationDuration;

    this.ended = false;
  }

  update() {
    const { timestamp } = gameContext.engine.timing;
    if (this.animationEndTime && timestamp >= this.animationEndTime) {
      this.ended = true;
    }
  }

  render(props) {
    drawPerson({
      ...props,
      rotation:
        Math.atan2(this.body.velocity.y, this.body.velocity.x) + Math.PI / 2,
      emoji: this.emoji,
      color: gameContext.cfg.colors.white.secondary,
    });
  }
}
