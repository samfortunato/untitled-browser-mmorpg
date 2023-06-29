import { Entity } from '../../entity.js';

import { Collider } from '../../../components/collider.js';

export class CloseButton extends Entity {
  collider = new Collider(0, 32, 32, 32);

  backgroundOffset = { x: 2, y: 2 };
  backgroundDimensions = { w: 30, h: 30 };
  iconOffset = { x: 11, y: 7.5 };

  constructor(transform, dimensions) {
    super();

    this.transform.x = transform.x + dimensions.width - this.collider.topRight;
    this.transform.y = transform.y;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#F8D744';
    ctx.roundRect(this.transform.x + this.backgroundOffset.x, this.transform.y + this.backgroundOffset.y, 28, 28, 2);
    ctx.fill();
    ctx.closePath();

    ctx.font = '300 20px sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    ctx.fillText('x', this.transform.x + this.iconOffset.x, this.transform.y + this.iconOffset.y);

    // this.collider._draw(ctx, this.transform.x, this.transform.y);
  }

  setPosition(transform, dimensions) {
    this.transform.x = transform.x + dimensions.width - this.collider.topRight;
    this.transform.y = transform.y;
  }
}
