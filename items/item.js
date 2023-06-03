import { Inventory } from '../system/inventory.js';

export class Item {
  use() {
    this.destroy();
  }

  destroy() {
    Inventory.remove(this);
  }
}
