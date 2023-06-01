import { getWheelDelta } from '../engine/input.js';

import { Entity } from '../entities/entity.js';

import { Dimensions } from '../components/dimensions.js';

export class Scrollable extends Entity {
  dimensions = new Dimensions(100, 100);

  color = 'blue';

  constructor() {
    super();

    this.transform.x = 400;
    this.transform.y = 0;
  }

  update() {
    this.transform.y += getWheelDelta().y;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.fillRect(this.transform.x, this.transform.y, this.dimensions.width, this.dimensions.height);
  }
}
