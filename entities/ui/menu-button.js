import { getMouseBounds, isMouseClicked } from '../../engine/input.js';

import { Entity } from '../entity.js';

import { Collider } from '../../components/collider.js';
import { AudioEmitter } from '../../components/audio-emitter.js';

import { isWithinBoundsOf } from '../../utils/collision.js';
import { noop } from '../../utils/noop.js';

export class MenuButton extends Entity {
  collider = new Collider(0, 100, 40, 40);
  hoverAudioEmitter = new AudioEmitter('menu-button-hover', 0.05);

  isClicked = false;
  isHovering = false;
  textOffset = { x: 6, y: 22 };
  backgroundColor = '#222';

  constructor(text = '', onClick = noop, x, y) {
    super(x, y);

    this.text = text;
    this.onClick = onClick;
  }

  update(dt) {
    const menuButtonPos = { ...this.transform, ...this.collider };
    const isMouseWithinBounds = isWithinBoundsOf(menuButtonPos, getMouseBounds());

    if (isMouseWithinBounds) {
      this.backgroundColor = '#2a2a2a';
    } else {
      this.backgroundColor = '#222';
    }

    if (isMouseWithinBounds && !this.isHovering) {
      this.hoverAudioEmitter.play();
      this.isHovering = true;
    }

    if (!isMouseWithinBounds) {
      this.isHovering = false;
    }

    if (!this.isClicked && isMouseClicked() && isMouseWithinBounds) {
      this.isClicked = true;
      this.backgroundColor = '#1d1d1d';

      this.onClick();
    }

    if (this.isClicked && !isMouseClicked()) {
      this.isClicked = false;
    }
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.fillStyle = this.backgroundColor;
    ctx.beginPath();
    ctx.roundRect(this.transform.x, this.transform.y, 100, 40, 4);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = '#ccc';
    ctx.font = '0.8rem sans-serif';
    ctx.fillText(this.text, this.transform.x + this.textOffset.x, this.transform.y + this.textOffset.y);

    this.collider._draw(ctx);
  }
}
