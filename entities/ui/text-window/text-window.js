import { getMouseBounds, getMouseMovementDelta, isCancelKeyPressed, isKeyPressed, isMouseClicked, isMouseDragging } from '../../../engine/input.js';
import { setCanPlayerMove } from '../../../engine/player.js';

import { Entity } from '../../entity.js';
import { CloseButton } from './close-button.js';
import { WindowBar } from './window-bar.js';

import { Dimensions } from '../../../components/dimensions.js';

import { isWithinBoundsOf } from '../../../utils/collision.js';

import { TEXT_OFFSET } from './constants.js';

export class TextWindow extends Entity {
  dimensions = new Dimensions();

  textWindowOffset = { x: 0, y: -60 };
  windowBarIsClicked = false;

  constructor(text, x = 0, y = 0, width = 100, height = 100) {
    super();

    this.text = text;
    this.transform.x = x || (document.documentElement.clientWidth / 2) - (width / 2);
    this.transform.y = y || (document.documentElement.clientHeight / 2) - (height / 2) + this.textWindowOffset.y;
    this.dimensions.width = width;
    this.dimensions.height = height;

    this.closeButton = new CloseButton(this.transform, this.dimensions);
    this.windowBar = new WindowBar(this.transform, this.dimensions);

    setCanPlayerMove(false);
  }

  update() {
    this.transform.x = (document.documentElement.clientWidth / 2) - (this.dimensions.width / 2);
    this.transform.y = (document.documentElement.clientHeight / 2) - (this.dimensions.height / 2) + this.textWindowOffset.y;
    this.windowBar.setPosition(this.transform);
    this.closeButton.setPosition(this.transform, this.dimensions);

    if (isKeyPressed('Enter') || isMouseClicked()) {
      const closeButtonPos = {
        ...this.closeButton.transform,
        ...this.closeButton.collider,
      };

      // window dragging functionality
      // might not use. revisit later

      // const windowBarPos = {
      //   ...this.windowBar.transform,
      //   ...this.windowBar.collider,
      // };

      // if (isMouseDragging() && isWithinBoundsOf(getMouseBounds(), windowBarPos)) {
      //   this.transform.translate(getMouseMovementDelta().x, getMouseMovementDelta().y);

      //   this.closeButton.transform.translate(getMouseMovementDelta().x, getMouseMovementDelta().y);
      //   this.windowBar.transform.translate(getMouseMovementDelta().x, getMouseMovementDelta().y);
      // }

      if (isWithinBoundsOf(getMouseBounds(), closeButtonPos)) {
        this.onClose();
      }
    }

    if (isCancelKeyPressed()) {
      this.onClose();
    }
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    // window shadow
    ctx.fillStyle = '#444444';
    // ctx.globalAlpha = 0.5;
    ctx.globalCompositeOperation = 'overlay';
    ctx.beginPath();
    ctx.roundRect(this.transform.x + 10, this.transform.y + 10, this.dimensions.width, this.dimensions.height);
    ctx.fill();
    ctx.closePath();
    // ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    // ctx.strokeStyle = 'black';
    // ctx.lineWidth = 0.5;
    // ctx.strokeRect(this.transform.x + 12, this.transform.y + 12, this.dimensions.width, this.dimensions.height);

    // window bg
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.roundRect(this.transform.x, this.transform.y, this.dimensions.width, this.dimensions.height, 2);
    ctx.fill();
    ctx.closePath();

    // window text
    ctx.font = '16px Abel Regular';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(this.text, this.transform.x + TEXT_OFFSET.x, this.transform.y + TEXT_OFFSET.y, this.dimensions.width);

    this.closeButton.draw(ctx);
    // this.windowBar.draw(ctx);
  }

  onClose() {
    setCanPlayerMove(true);

    this.destroy();
  }
}
