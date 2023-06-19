import { Entity } from '../entity.js';

import { Collider } from '../../components/collider.js';

export class CloseButton extends Entity {
  collider = new Collider(0, 32, 32, 32);

  constructor(transform, dimensions) {
    super();

    this.transform.x = transform.x + dimensions.width - this.collider.topRight;
    this.transform.y = transform.y;
  }

  draw(ctx) {
    ctx.font = '24px sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.fillText('x', this.transform.x + 10, this.transform.y + 3);

    // this.collider._draw(cstx, this.transform.x, this.transform.y);
  }

  setPosition(transform, dimensions) {
    this.transform.x = transform.x + dimensions.width - this.collider.topRight;
    this.transform.y = transform.y;
  }
}
