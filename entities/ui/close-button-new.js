import { getMouseBounds, isMouseClicked } from '../../engine/input.js';

import { Entity } from '../entity.js';

import { Collider } from '../../components/collider.js';

import { Dimensions } from '../../components/dimensions.js';
import { Offset } from '../../constructs/offset.js';

import { isWithinBoundsOf } from '../../utils/collision.js';

export class CloseButtonNew extends Entity {
  collider = new Collider(0, 32, 32, 32);

  dimensions = new Dimensions(32, 32);
  iconOffset = new Offset(16, 5);
  animationOffset = new Offset();

  constructor(x, y, onClose) {
    super(x, y);

    this.onClose = onClose;
  }

  update() {
    if (isMouseClicked() && this.isMouseWithinBoundsOfButton()) {
      this.onClose();
    }
  }

  draw(ctx) {
    // const xPos = this.transform.x + this.animationOffset.x;
    const xPos = this.transform.x;

    ctx.fillStyle = 'black';
    ctx.fillRect(xPos, this.transform.y, this.dimensions.width, this.dimensions.height);

    ctx.fillStyle = 'white';
    ctx.font = '500 1.3rem Titillium Web';
    ctx.fillText('x', xPos + this.iconOffset.x, this.transform.y + this.iconOffset.y);
  }

  isMouseWithinBoundsOfButton() {
    const closeButtonPos = { ...this.transform, ...this.collider };

    return isWithinBoundsOf(closeButtonPos, getMouseBounds());
  }
}
