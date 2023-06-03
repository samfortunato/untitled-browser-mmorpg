import { getMouseBounds, isMouseClicked } from '../engine/input.js';

import { Entity } from './entity.js';

import { Collider } from '../components/collider.js';

import { isWithinBoundsOf } from '../utils/collision.js';

export class Clickable extends Entity {
  collider = new Collider(0, 32, 32, 32);

  update() {
    if (isMouseClicked()) {
      const clickablePos = {
        ...this.transform,
        ...this.collider,
      };

      if (isWithinBoundsOf(getMouseBounds(), clickablePos)) {
        this.destroy();
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'limegreen';
    ctx.fillRect(this.transform.x, this.transform.y, 32, 32);
  }
}
