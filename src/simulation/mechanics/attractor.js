export default class Attractor {
  constructor(game) {
    this.game = game;
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
