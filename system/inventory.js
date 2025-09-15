export class Inventory {
  static inventory = new Map();

  static remove(item) {
    this.inventory.delete(item.id.value);
  }

  static add(item) {
    this.inventory.set(item.id.value, item);
  }

  static getAll() {
    return [...this.inventory.values()];
  }
}
