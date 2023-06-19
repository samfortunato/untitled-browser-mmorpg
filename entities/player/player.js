import { areKeysPressed, getCanPlayerMove, isKeyPressed } from '../../engine/input.js';
import { setPlayerCollider, setPlayerTransform } from '../../engine/meta.js';
import { GRAVITY } from '../../engine/physics.js';

import { Entity } from '../entity.js';

import { Collider } from '../../components/collider.js';
import { AudioEmitter } from '../../components/audio-emitter.js';

import { clampToPixel } from '../../utils/math.js';

import { PlayerSprite } from './sprite.js';
import { STATES } from './states.js';
import { CROUCH_SPEED, NORMAL_SPEED, RUN_SPEED } from './constants.js';
import { DIRECTIONS } from '../../constants/directions.js';

export class Player extends Entity {
  collider = new Collider(0, 32, 32, 32);
  walkingAudioEmitter = new AudioEmitter('walking', 0.03);
  runningAudioEmitter = new AudioEmitter('running', 0.03);
  sprite = new PlayerSprite();

  state = STATES.IDLE;
  direction = DIRECTIONS.DOWN;
  speed = NORMAL_SPEED;
  zVelocity = 0;

  update(dt) {
    if (this.transform.z === 0) this.state = STATES.IDLE;

    if (getCanPlayerMove()) {
      const isPressingCrouchKey = areKeysPressed('Meta', 'Control');
      const isPressingRunKey = isKeyPressed('Shift');
      const isPressingMovementKey = areKeysPressed('ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'w', 'a', 's', 'd');
      const isPressingMovementUpKey = areKeysPressed('ArrowUp', 'w');
      const isPressingMovementRightKey = areKeysPressed('ArrowRight', 'd');
      const isPressingMovementDownKey = areKeysPressed('ArrowDown', 's');
      const isPressingMovementLeftKey = areKeysPressed('ArrowLeft', 'a');
      const isPressingJumpKey = isKeyPressed(' ');

      // state change
      if (isPressingCrouchKey) this.state = STATES.CROUCHING;
      if (!isPressingRunKey && isPressingMovementKey) this.state = STATES.WALKING;
      if (isPressingRunKey && isPressingMovementKey) this.state = STATES.RUNNING;
      if (isPressingJumpKey) this.state = STATES.JUMPING;

      if (!isPressingCrouchKey && !isPressingMovementKey && !isPressingCrouchKey && !isPressingJumpKey) {
        this.state = STATES.IDLE;
      }

      // movement
      this.speed = isPressingCrouchKey ? CROUCH_SPEED : NORMAL_SPEED;
      this.speed = isPressingRunKey ? RUN_SPEED : NORMAL_SPEED;

      if (isPressingJumpKey) {
        this.transform.z += 3;
      }

      if (isPressingMovementUpKey) {
        this.transform.y -= clampToPixel(this.speed * dt);
        this.direction = DIRECTIONS.UP;
      }

      if (isPressingMovementRightKey) {
        this.transform.x += clampToPixel(this.speed * dt);
        this.direction = DIRECTIONS.RIGHT;
      }

      if (isPressingMovementDownKey) {
        this.transform.y += clampToPixel(this.speed * dt);
        this.direction = DIRECTIONS.DOWN;
      }

      if (isPressingMovementLeftKey) {
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

    // sfx
    if (this.state === STATES.WALKING) this.walkingAudioEmitter.loop();
    else this.walkingAudioEmitter.stop();

    if (this.state === STATES.RUNNING) this.runningAudioEmitter.loop();
    else this.runningAudioEmitter.stop();
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
