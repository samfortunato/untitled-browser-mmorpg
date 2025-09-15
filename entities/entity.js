import { _destroyEntity } from '../engine/entity.js';

import { Id } from '../components/id.js';
import { Transform } from '../components/transform.js';

export class Entity {
  id = new Id();
  transform = new Transform();

  constructor(x = 0, y = 0) {
    this.transform.x = x;
    this.transform.y = y;
  }

  update(dt) { }

  draw(ctx, dt) { }

  destroy() {
    _destroyEntity(this);
  }
}
