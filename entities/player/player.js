import { getCanPlayerMove, isKeyPressed } from '../../engine/input.js';
import { setPlayerCollider, setPlayerTransform } from '../../engine/meta.js';
import { GRAVITY } from '../../engine/physics.js';

import { Entity } from '../entity.js';

import { Collider } from '../../components/collider.js';

import { clampToPixel } from '../../utils/math.js';

import { PlayerSprite } from './sprite.js';
import { STATES } from './states.js';
import { CROUCH_SPEED, DIRECTIONS, NORMAL_SPEED, RUN_SPEED } from './constants.js';

export class Player extends Entity {
  collider = new Collider(0, 32, 32, 32);
  sprite = new PlayerSprite();

  state = STATES.IDLE;
  direction = DIRECTIONS.DOWN;
  speed = NORMAL_SPEED;
  zVelocity = 0;

  constructor(x = 0, y = 0) {
    super();

    this.transform.x = x;
    this.transform.y = y;
  }

  update(dt) {
    if (this.transform.z === 0) this.state = STATES.IDLE;

    if (getCanPlayerMove()) {
      // state change
      if (isKeyPressed('Meta')) this.state = STATES.CROUCHING;
      if (isKeyPressed('Control')) this.state = STATES.CROUCHING;
      if (
        !isKeyPressed('Shift') &&
        (
          isKeyPressed('ArrowUp') ||
          isKeyPressed('ArrowRight') ||
          isKeyPressed('ArrowDown') ||
          isKeyPressed('ArrowLeft')
        )
      ) {
        this.state = STATES.WALKING;
      }
      if (
        isKeyPressed('Shift') &&
        (
          isKeyPressed('ArrowUp') ||
          isKeyPressed('ArrowRight') ||
          isKeyPressed('ArrowDown') ||
          isKeyPressed('ArrowLeft')
        )
      ) {
        this.state = STATES.RUNNING;
      }
      if (isKeyPressed(' ')) this.state = STATES.JUMPING;

      if (
        !isKeyPressed('Meta') &&
        !isKeyPressed('Control') &&
        !isKeyPressed('ArrowUp') &&
        !isKeyPressed('ArrowRight') &&
        !isKeyPressed('ArrowDown') &&
        !isKeyPressed('ArrowLeft') &&
        !isKeyPressed('Shift') &&
        !isKeyPressed(' ')
      ) {
        this.state = STATES.IDLE;
      }

      // movement
      if (isKeyPressed('Meta') || isKeyPressed('Control')) {
        this.speed = CROUCH_SPEED;
      } else {
        this.speed = NORMAL_SPEED;
      }

      if (isKeyPressed('Shift')) {
        this.speed = RUN_SPEED;
      } else {
        this.speed = NORMAL_SPEED;
      }

      if (isKeyPressed(' ')) {
        this.transform.z += 3;
      }

      if (isKeyPressed('ArrowUp')) {
        this.transform.y -= clampToPixel(this.speed * dt);
        this.direction = DIRECTIONS.UP;
      }

      if (isKeyPressed('ArrowRight')) {
        this.transform.x += clampToPixel(this.speed * dt);
        this.direction = DIRECTIONS.RIGHT;
      }

      if (isKeyPressed('ArrowDown')) {
        this.transform.y += clampToPixel(this.speed * dt);
        this.direction = DIRECTIONS.DOWN;
      }

      if (isKeyPressed('ArrowLeft')) {
        this.transform.x -= clampToPixel(this.speed * dt);
        this.direction = DIRECTIONS.LEFT;
      }
    }

    // movement resolution
    this.transform.z -= GRAVITY;
    if (this.transform.z < 0) this.transform.z = 0;

    // meta, for interactions with the player
    setPlayerTransform(this.transform);
    setPlayerCollider(this.collider);
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    const crouchOffset = this.state === STATES.CROUCHING ? 12 : 0;

    this.sprite.step(this.direction, this.state);

    ctx.drawImage(
      this.sprite.img,
      ...this.sprite.getCurrentFrame(),
      this.transform.x + this.sprite.xOffset,
      (this.transform.y - this.collider.getDimensions().h - this.transform.z) + crouchOffset,
      48, 64
    );

    // this.collider._draw(ctx, this.transform.x, this.transform.y);

    // shadow
    // ctx.globalAlpha = 0.5;
    // ctx.fillStyle = 'black';
    // ctx.fillRect(this.transform.x, this.transform.y + 12, 32, 20);
    // ctx.globalAlpha = 1;
  }
}
