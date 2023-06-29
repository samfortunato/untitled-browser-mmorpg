import { isKeyPressed } from '../../../engine/input.js';
import { canvas } from '../../../engine/draw.js';
import { setCanPlayerMove } from '../../../engine/player.js';

import { Entity } from '../../entity.js';

import { Dimensions } from '../../../components/dimensions.js';

import { noop } from '../../../utils/noop.js';

import { DEFAULT_PORTRAIT_BOUNDS } from './constants.js';

export class DialogBox extends Entity {
  dimensions = new Dimensions(0, 200);

  textOffset = {
    x: 32,
    y: 32,
  };

  constructor(text, portrait = null, onClose = noop, portraitBounds = DEFAULT_PORTRAIT_BOUNDS) {
    super();

    this.text = text;
    this.portrait = portrait;
    this.onClose = onClose;
    this.portraitBounds = portraitBounds;

    this.transform.set(0, document.documentElement.clientHeight - this.dimensions.height);

    setCanPlayerMove(false);
  }

  update() {
    if (isKeyPressed('x')) {
      this.onClose();
      setCanPlayerMove(true);

      this.destroy();
    }
  }

  draw(ctx) {
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    if (this.portrait) {
      ctx.drawImage(
        this.portrait,
        this.portraitBounds.dx || DEFAULT_PORTRAIT_BOUNDS.dx,
        this.portraitBounds.dy || DEFAULT_PORTRAIT_BOUNDS.dy,
        this.portraitBounds.dw || DEFAULT_PORTRAIT_BOUNDS.dw,
        this.portraitBounds.dh || DEFAULT_PORTRAIT_BOUNDS.dh
      );
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(this.transform.x, this.transform.y, document.documentElement.clientWidth, this.dimensions.height);

    ctx.font = '24px Abel Regular';
    ctx.fillStyle = 'white';
    ctx.fillText(this.text, this.transform.x + this.textOffset.x, this.transform.y + this.textOffset.y);
  }
}
