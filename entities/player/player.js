import { isKeyPressed } from '../../engine/input.js';
import { setPlayerPos } from '../../engine/meta.js';
import { GRAVITY } from '../../engine/physics.js';

import { Entity } from '../entity.js';

import { clampToPixel } from '../../utils/math.js';

import { STATES } from './states.js';
import { CROUCH_SPEED, NORMAL_SPEED } from './constants.js';

export class Player extends Entity {
  state = STATES.IDLE;
  speed = NORMAL_SPEED;
  zVelocity = 0;

  constructor(x = 0, y = 0) {
    super();

    this.transform.x = x;
    this.transform.y = y;
  }

  update(dt) {
    if (this.transform.z === 0) this.state = STATES.IDLE;

    if (isKeyPressed('Shift')) {
      this.state = STATES.CROUCHING;
      this.speed = CROUCH_SPEED;
    } else {
      this.state = STATES.IDLE;
      this.speed = NORMAL_SPEED;
    }

    if (isKeyPressed(' ')) {
      this.state = STATES.JUMPING;
      this.transform.z += 3;
    }

    this.transform.z -= GRAVITY;
    if (this.transform.z < 0) this.transform.z = 0;

    if (isKeyPressed('ArrowUp')) this.transform.y -= clampToPixel(this.speed * dt);
    if (isKeyPressed('ArrowRight')) this.transform.x += clampToPixel(this.speed * dt);
    if (isKeyPressed('ArrowDown')) this.transform.y += clampToPixel(this.speed * dt);
    if (isKeyPressed('ArrowLeft')) this.transform.x -= clampToPixel(this.speed * dt);

    setPlayerPos(this.transform);
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.fillStyle = '#000000';

    if (this.state === STATES.CROUCHING) {
      ctx.fillRect(this.transform.x, (this.transform.y - this.transform.z) + 12, 32, 20);
    } else {
      ctx.fillRect(this.transform.x, this.transform.y - this.transform.z, 32, 32);
    }

    // shadow
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'black';
    ctx.fillRect(this.transform.x, this.transform.y + 12, 32, 20);
    ctx.globalAlpha = 1;
  }
}
