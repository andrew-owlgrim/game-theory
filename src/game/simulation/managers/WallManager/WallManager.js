import { Body } from "matter-js";
import { GameManager } from "../../../gameEngine";
import Wall from "../../entities/Wall/Wall";
import getCircleLayout from "./getCircleLayout";

export default class WallManager extends GameManager {
  constructor(game) {
    super(game);
    this.walls = [];
  }

  addWall({ position, size, shape }) {
    const wall = new Wall({
      position,
      size,
      shape,
      view: { layer: "walls", strokeStyle: "#fff4" },
    });
    this.game.addEntity(wall);
    this.walls.push(wall);

    return wall;
  }

  createBoundary() {
    const boundarySize = this.game.cfg.boundarySize;

    const wallParams = getCircleLayout(0, 0, boundarySize / 2, 36);
    for (let params of wallParams) {
      const newWall = this.addWall({
        position: params.position,
        size: { x: 48, y: 10 },
        shape: "rectangle",
      });
      Body.setAngle(newWall.body, params.rotation);
    }

    const triangleWallParams = getCircleLayout(0, 0, boundarySize / 2 - 10, 18);
    for (let params of triangleWallParams) {
      const newWall = this.addWall({
        position: params.position,
        size: { x: 20, y: 14 },
        shape: "triangle",
      });
      Body.setAngle(newWall.body, params.rotation - Math.PI);
    }
  }
}
