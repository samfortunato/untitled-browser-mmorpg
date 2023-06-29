import { getMouseBounds, isMouseClicked } from '../../engine/input.js';

import { Entity } from '../entity.js';

import { Collider } from '../../components/collider.js';

import { Dimensions } from '../../components/dimensions.js';
import { Offset } from '../../constructs/offset.js';

import { isWithinBoundsOf } from '../../utils/collision.js';

export class CloseButtonNew extends Entity {
  collider = new Collider(0, 32, 32, 32);

  dimensions = new Dimensions(32, 32);
  iconOffset = new Offset(11, 5);

  constructor(x, y, onClose) {
    super(x, y);

    this.onClose = onClose;
  }

  update() {
    if (isMouseClicked()) {
      if (this.isMouseWithinBoundsOfButton()) {
        this.onClose();
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.transform.x, this.transform.y, this.dimensions.width, this.dimensions.height);

    ctx.fillStyle = 'white';
    ctx.font = '500 1.3rem Titillium Web';
    ctx.fillText('x', this.transform.x + this.iconOffset.x, this.transform.y + this.iconOffset.y);
  }

  isMouseWithinBoundsOfButton() {
    const closeButtonPos = { ...this.transform, ...this.collider };

    return isWithinBoundsOf(closeButtonPos, getMouseBounds());
  }
}
