import { getMousePos, isMouseClicked } from '../engine/input.js';
import { destroyEntity } from '../engine/entity.js';

import { Entity } from './entity.js';

import { Collider } from '../components/collider.js';

import { isWithinBoundsOf } from '../utils/collision.js';

export class Clickable extends Entity {
  collider = new Collider(0, 32, 32, 32);

  constructor(...params) {
    super(...params);
  }

  update() {
    const clickablePos = {
      ...this.transform,
      ...this.collider,
    };

    if (isMouseClicked() && isWithinBoundsOf(getMousePos(), clickablePos)) {
      destroyEntity(this);
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'limegreen';
    ctx.fillRect(this.transform.x, this.transform.y, 32, 32);
  }
}
