import { getPlayerBounds } from '../engine/meta.js';
import { isKeyPressed } from '../engine/input.js';
import { _destroyEntity, addEntity } from '../engine/entity.js';

import { Inventory } from '../system/inventory.js';

import { UniqueId } from '../components/unique-id.js';
import { Transform } from '../components/transform.js';
import { Collider } from '../components/collider.js';

import { isWithinBoundsOf } from '../utils/collision.js';

export class Item {
  uniqueId = new UniqueId();
  transform = new Transform();
  collider = new Collider(0, 32, 32, 32);

  contextMenu = {
    'Use': this.use,
  };

  constructor(x, y) {
    this.transform.x = x;
    this.transform.y = y;

    addEntity(this);
  }

  use() {
    this.destroy();
  }

  update(dt) {
    const itemBounds = { ...this.transform, ...this.collider };

    if (isWithinBoundsOf(itemBounds, getPlayerBounds()) && isKeyPressed('Enter')) {
      Inventory.add(this);

      this.destroy();
    }
  }

  draw(ctx) { }

  destroy() {
    _destroyEntity(this);
  }

  getContextMenu() {
    return this.contextMenu;
  }
}
