import { getMousePos, isKeyPressed, isMouseClicked } from '../../engine/input.js';
import { destroyEntity } from '../../engine/entity.js';

import { Entity } from '../entity.js';
import { CloseButton } from './close-button.js';

import { Dimensions } from '../../components/dimensions.js';

import { isWithinBoundsOf } from '../../utils/collision.js';

import { TEXT_OFFSET } from './constants.js';

export class TextWindow extends Entity {
  dimensions = new Dimensions();

  constructor(text, x = 0, y = 0, width = 100, height = 100) {
    super();

    this.text = text;
    this.transform.x = x;
    this.transform.y = y;
    this.dimensions.width = width;
    this.dimensions.height = height;

    this.closeButton = new CloseButton(this.transform.x + this.dimensions.width, this.transform.y);
  }

  update() {
    if (
      isKeyPressed('Enter') ||
      isMouseClicked() && isWithinBoundsOf(getMousePos(), this.closeButton.transform)
    ) {
      destroyEntity(this);
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.transform.x, this.transform.y, this.dimensions.width, this.dimensions.height);

    ctx.font = '16px Helvetica';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(this.text, this.transform.x + TEXT_OFFSET, this.transform.y + TEXT_OFFSET, this.dimensions.width);

    this.closeButton.draw(ctx);
  }
}
