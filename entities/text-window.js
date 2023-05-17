import { getMousePos, isKeyPressed, isMouseClicked } from '../engine/input.js';
import { destroyEntity } from '../engine/entity.js';

import { Entity } from './entity.js';

import { Transform } from '../components/transform.js';

import { isWithinBoundsOf } from '../utils/collision.js';

const TEXT_OFFSET = 10;

class CloseButton {
  transform = new Transform(0, 0, {
    topRight: 32,
    bottomRight: 32,
    bottomLeft: 32,
  });

  constructor(x, y) {
    this.transform.x = x - this.transform.bounds.topRight;
    this.transform.y = y;
  }

  draw(ctx) {
    ctx.font = '32px sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.fillText('X', this.transform.x, this.transform.y);
  }
}

export class TextWindow {
  id = Symbol();

  constructor(text, x = 0, y = 0, width = 100, height = 100) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.closeButton = new CloseButton(this.x + this.width, this.y);
  }

  update() {
    if (
      isKeyPressed('Enter') ||
      isMouseClicked() && isWithinBoundsOf(getMousePos(), this.closeButton.transform)
    ) {
      destroyEntity(this);
    }
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.font = '16px Helvetica';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(this.text, this.x + TEXT_OFFSET, this.y + TEXT_OFFSET, this.width);

    this.closeButton.draw(ctx);
  }
}
