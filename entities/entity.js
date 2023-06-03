import { _destroyEntity } from '../engine/entity.js';

import { UniqueId } from '../components/unique-id.js';
import { Transform } from '../components/transform.js';

export class Entity {
  uniqueId = new UniqueId();
  transform = new Transform();

  constructor(x = 0, y = 0) {
    this.transform.x = x;
    this.transform.y = y;
  }

  update(dt) { }

  draw(ctx) { }

  destroy() {
    _destroyEntity(this);
  }
}
