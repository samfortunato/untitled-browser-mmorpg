export class Inventory {
  static inventory = new Map();

  static remove(item) {
    this.inventory.delete(item.uniqueId.id);
  }

  static add(item) {
    this.inventory.set(item.uniqueId.id, item);
  }

  static getAll() {
    return [...this.inventory.values()];
  }
}
