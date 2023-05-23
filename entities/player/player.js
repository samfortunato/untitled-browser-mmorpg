import { isKeyPressed } from '../../engine/input.js';

import { clampToPixel } from '../../utils/math.js';

import { STATES } from './states.js';
import { CROUCH_SPEED, NORMAL_SPEED } from './constants.js';

export class Player {
  id = Symbol();
  state = STATES.IDLE;
  speed = NORMAL_SPEED;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  update(dt) {
    if (isKeyPressed('Shift')) {
      this.state = STATES.CROUCHING;
      this.speed = CROUCH_SPEED;
    } else {
      this.state = STATES.IDLE;
      this.speed = NORMAL_SPEED;
    }

    if (isKeyPressed('ArrowUp')) this.y -= clampToPixel(this.speed * dt);
    if (isKeyPressed('ArrowRight')) this.x += clampToPixel(this.speed * dt);
    if (isKeyPressed('ArrowDown')) this.y += clampToPixel(this.speed * dt);
    if (isKeyPressed('ArrowLeft')) this.x -= clampToPixel(this.speed * dt);
  }

  draw(ctx) {
    ctx.fillStyle = '#000000';

    if (this.state === STATES.CROUCHING) {
      ctx.fillRect(this.x, this.y + 12, 32, 20);
    } else {
      ctx.fillRect(this.x, this.y, 32, 32);
    }
  }
}
