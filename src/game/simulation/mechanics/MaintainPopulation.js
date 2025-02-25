import { GameMechanic } from "../../gameEngine";

export default class MaintainPopulation extends GameMechanic {
  constructor(game, enabled) {
    super(game, enabled);

    this.lastSpawnTime = 0;
  }

  apply() {
    const personManager = this.game.managers.personManager;
    if (personManager.persons.length < this.game.cfg.population) {
      const now = performance.now(); // Получаем текущее время в миллисекундах
      if (now - this.lastSpawnTime < this.game.cfg.spawnCooldown) {
        return; // Если кулдаун не истёк, прерываем выполнение
      }

      personManager.add();
      this.lastSpawnTime = now;
    }
  }
}
