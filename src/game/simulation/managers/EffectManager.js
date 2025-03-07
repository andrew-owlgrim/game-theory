import { GameManager } from "../../gameEngine";
import * as effects from "../effects";

export default class EffectManager extends GameManager {
  constructor(game) {
    super(game);
  }

  run(effectName, options) {
    const game = this.game;
    game.addEffect(new effects[effectName]({ game, ...options }));
  }
}
