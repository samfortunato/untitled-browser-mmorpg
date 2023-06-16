import { Inventory } from '../system/inventory.js';

import { UniqueId } from '../components/unique-id.js';

export class Item {
  uniqueId = new UniqueId();

  contextMenu = {
    'Use': this.use,
  };

  use() {
    this.destroy();
  }

  destroy() {
    Inventory.remove(this);
  }

  getContextMenu() {
    return this.contextMenu;
  }
}
