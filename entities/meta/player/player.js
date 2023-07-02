import {
  isAMovementKeyPressed,
  isCrouchKeyPressed,
  isJumpKeyPressed,
  isMovementDownKeyPressed,
  isMovementLeftKeyPressed,
  isMovementRightKeyPressed,
  isMovementUpKeyPressed,
  isRunKeyPressed
} from '../../../engine/input.js';
import { setPlayerCollider, setPlayerTransform } from '../../../engine/meta.js';
import { GRAVITY } from '../../../engine/physics.js';
import { getCanPlayerMove } from '../../../engine/player.js';

import { Entity } from '../../entity.js';
import { PlayerName } from './player-name.js';

import { Collider } from '../../../components/collider.js';
import { AudioEmitter } from '../../../components/audio-emitter.js';

import { Vector3 } from '../../../constructs/vector3.js';

import { clampToPixel } from '../../../utils/math.js';

import { PlayerSprite } from './sprite.js';
import { STATES } from './states.js';
import { CROUCH_SPEED, NORMAL_SPEED, RUN_SPEED } from './constants.js';
import { DIRECTIONS } from '../../../constants/directions.js';

export class Player extends Entity {
  collider = new Collider(0, 32, 32, 32);
  walkingAudioEmitter = new AudioEmitter('walking', 0.03);
  runningAudioEmitter = new AudioEmitter('running', 0.03);
  sprite = new PlayerSprite();

  state = STATES.IDLE;
  direction = DIRECTIONS.DOWN;
  speed = NORMAL_SPEED;
  velocity = new Vector3(0, 0, 0);
  playerName = new PlayerName(this.transform.x, this.transform.y, 'Collider');

  update(dt) {
    if (this.transform.z === 0) this.state = STATES.IDLE;

    if (getCanPlayerMove()) {
      // state change
      if (isCrouchKeyPressed()) this.state = STATES.CROUCHING;
      if (!isRunKeyPressed() && isAMovementKeyPressed()) this.state = STATES.WALKING;
      if (isRunKeyPressed() && isAMovementKeyPressed()) this.state = STATES.RUNNING;
      if (isJumpKeyPressed()) this.state = STATES.JUMPING;

      if (!isCrouchKeyPressed() && !isAMovementKeyPressed() && !isCrouchKeyPressed() && !isJumpKeyPressed()) {
        this.state = STATES.IDLE;
      }

      // movement
      this.speed = isCrouchKeyPressed() ? CROUCH_SPEED : NORMAL_SPEED;
      this.speed = isRunKeyPressed() ? RUN_SPEED : NORMAL_SPEED;

      if (isJumpKeyPressed()) {
        this.velocity.z = 10;
      }

      if (isMovementUpKeyPressed()) {
        this.transform.y -= clampToPixel(this.speed * dt);
        this.direction = DIRECTIONS.UP;
      }

      if (isMovementRightKeyPressed()) {
        this.transform.x += clampToPixel(this.speed * dt);
        this.direction = DIRECTIONS.RIGHT;
      }

      if (isMovementDownKeyPressed()) {
        this.transform.y += clampToPixel(this.speed * dt);
        this.direction = DIRECTIONS.DOWN;
      }

      if (isMovementLeftKeyPressed()) {
        this.transform.x -= clampToPixel(this.speed * dt);
        this.direction = DIRECTIONS.LEFT;
      }
    }

    // movement resolution
    this.transform.z += this.velocity.z;
    this.velocity.z -= GRAVITY;

    if (this.transform.z < 0) {
      this.velocity.z = 0;
      this.transform.z = 0;
    }

    // meta, for interactions with the player
    setPlayerTransform(this.transform);
    setPlayerCollider(this.collider);

    // sfx
    if (this.state === STATES.WALKING) this.walkingAudioEmitter.loop();
    else this.walkingAudioEmitter.stop();

    if (this.state === STATES.RUNNING) this.runningAudioEmitter.loop();
    else this.runningAudioEmitter.stop();

    // player name
    this.playerName.update();
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    // shadow
    if (this.transform.z > 0) {
      ctx.globalAlpha = Math.min((0.36 + (this.transform.z / 100) / 2), 0.5);
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.ellipse(this.transform.x + 15, this.transform.y + 30, 18, 11, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

      ctx.globalAlpha = 1;
    }

    const crouchOffset = this.state === STATES.CROUCHING ? 12 : 0;

    this.sprite.step(this.direction, this.state);

    ctx.drawImage(
      this.sprite.img,
      ...this.sprite.getCurrentFrame(),
      this.transform.x + this.sprite.xOffset,
      (this.transform.y - this.collider.getDimensions().h - this.transform.z) + crouchOffset,
      48, 64
    );

    this.playerName.draw(ctx);

    // this.collider._draw(ctx, this.transform.x, this.transform.y);
  }
}
