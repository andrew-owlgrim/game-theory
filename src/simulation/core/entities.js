export default class Entities {
  constructor() {
    this.categories = {};
  }

  add(category, entity) {
    if (!this.categories[category]) {
      this.categories[category] = [];
    }
    this.categories[category].push(entity);
  }

  remove(category, entity) {
    if (!this.categories[category]) return;
    this.categories[category] = this.categories[category].filter(
      (e) => e !== entity
    );
  }

  getByCategory(category) {
    return this.categories[category] || [];
  }

  getAll() {
    return Object.values(this.categories).flat();
  }

  clearCategory(category) {
    if (this.categories[category]) {
      this.categories[category] = [];
    }
  }

  clearAll() {
    this.categories = {};
  }
}
