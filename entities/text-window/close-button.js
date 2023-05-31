import { Entity } from '../entity.js';

import { Collider } from '../../components/collider.js';

export class CloseButton extends Entity {
  collider = new Collider(0, 32, 32, 32);

  constructor(x, y) {
    super();

    this.transform.x = x - this.collider.topRight;
    this.transform.y = y;
  }

  draw(ctx) {
    ctx.font = '32px sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.fillText('X', this.transform.x, this.transform.y);
  }
}
