import { Composite } from "matter-js";
import GameManager from "../core/gameManager";
import Wall from "../entities/wall";
import { getCircleLayout } from "../utils/objects";

export default class WallManager extends GameManager {
  constructor(...args) {
    super(...args);
  }

  create() {
    const game = this.game;

    const wallParams = getCircleLayout(0, 0, game.cfg.boundarySize / 2, 36);
    const walls = wallParams.map((params) => new Wall(params));

    const triangleParams = getCircleLayout(0, 0, game.cfg.boundarySize / 2, 18);
    walls.concat(
      triangleParams.map(
        (params) =>
          new Wall({ ...params, size: { x: 20, y: 15 }, shape: "triangle" })
      )
    );

    const bodies = walls.map((wall) => wall.body);
    Composite.add(game.engine.world, bodies);
    game.entities.add("walls", walls);
  }
}
