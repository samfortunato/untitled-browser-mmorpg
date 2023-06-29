import { getPlayerTransform } from '../../engine/meta.js';
import { getPlayerCollider } from '../../engine/meta.js';
import { isKeyPressed } from '../../engine/input.js';

import { Entity } from '../entity.js';

import { Collider } from '../../components/collider.js';

import { isWithinBoundsOf } from '../../utils/collision.js';

export class Truck extends Entity {
  collider = new Collider(0, 32, 32, 32);

  isDrivingTruck = false;
  drivingToggleCooldown = 0;

  constructor() {
    super();

    this.transform.set(200, 200);
  }

  update() {
    const playerPos = {
      ...getPlayerTransform(),
      ...getPlayerCollider(),
    };

    const truckPos = {
      ...this.transform,
      ...this.collider,
    };

    if (isKeyPressed('Enter') && isWithinBoundsOf(playerPos, truckPos)) {
      if (this.drivingToggleCooldown === 0) {
        this.isDrivingTruck = !this.isDrivingTruck;
        this.drivingToggleCooldown = 50;
      }
    }

    if (this.isDrivingTruck) {
      this.transform.set(getPlayerTransform().x, getPlayerTransform().y + 16);
    }

    if (this.drivingToggleCooldown > 0) {
      this.drivingToggleCooldown--;
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'darkblue';
    ctx.fillRect(this.transform.x, this.transform.y, 32, 32);
  }
}
