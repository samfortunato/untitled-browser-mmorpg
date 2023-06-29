import { getPlayerCollider, getPlayerTransform } from '../../engine/meta.js';
import { addEntity } from '../../engine/entity.js';

import { Entity } from '../entity.js';
import { AreaInfo } from '../ui/area-info.js';

import { Collider } from '../../components/collider.js';
import { Dimensions } from '../../components/dimensions.js';

import { isWithinBoundsOf } from '../../utils/collision.js';

export class EventTrigger extends Entity {
  collider = new Collider(0, 32, 32, 32);
  dimensions = new Dimensions(32, 32);

  cooldown = 0;

  update() {

    if (this.cooldown === 0) {
      const playerPos = {
        ...getPlayerTransform(),
        ...getPlayerCollider(),
      };

      const eventPos = {
        ...this.transform,
        ...this.collider,
      };

      if (isWithinBoundsOf(playerPos, eventPos)) {
        addEntity(new AreaInfo());

        this.cooldown++;
      }
    }

    if (this.cooldown > 0) this.cooldown++;
    if (this.cooldown >= 500) this.cooldown = 0;
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    // for debug
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.transform.x, this.transform.y, this.dimensions.width, this.dimensions.height);
  }
}
