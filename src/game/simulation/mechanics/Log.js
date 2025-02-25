import { Body } from "matter-js";
import { GameMechanic } from "../../gameEngine";

export default class Log extends GameMechanic {
  constructor(game) {
    super(game);
  }

  apply() {
    // const personManager = this.game.managers.personManager;
    // const speed = Body.getSpeed(personManager.persons[0].body);
    // console.log(speed);
  }
}
