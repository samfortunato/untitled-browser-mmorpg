import { isKeyPressed } from '../../engine/input.js';

import { Entity } from '../entity.js';

import { clampToPixel } from '../../utils/math.js';

import { STATES } from './states.js';
import { CROUCH_SPEED, NORMAL_SPEED } from './constants.js';

export class Player extends Entity {
  state = STATES.IDLE;
  speed = NORMAL_SPEED;

  constructor(x = 0, y = 0) {
    super();

    this.transform.x = x;
    this.transform.y = y;
  }

  update(dt) {
    if (isKeyPressed('Shift')) {
      this.state = STATES.CROUCHING;
      this.speed = CROUCH_SPEED;
    } else {
      this.state = STATES.IDLE;
      this.speed = NORMAL_SPEED;
    }

    if (isKeyPressed('ArrowUp')) this.transform.y -= clampToPixel(this.speed * dt);
    if (isKeyPressed('ArrowRight')) this.transform.x += clampToPixel(this.speed * dt);
    if (isKeyPressed('ArrowDown')) this.transform.y += clampToPixel(this.speed * dt);
    if (isKeyPressed('ArrowLeft')) this.transform.x -= clampToPixel(this.speed * dt);
  }

  draw(ctx) {
    ctx.fillStyle = '#000000';

    if (this.state === STATES.CROUCHING) {
      ctx.fillRect(this.transform.x, this.transform.y + 12, 32, 20);
    } else {
      ctx.fillRect(this.transform.x, this.transform.y, 32, 32);
    }
  }
}
