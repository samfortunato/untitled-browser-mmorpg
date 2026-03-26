import {
  isAMovementKeyPressed,
  isAttackKeyPressed,
  isCrouchKeyPressed,
  isJumpKeyPressed,
  isMovementDownKeyPressed,
  isMovementLeftKeyPressed,
  isMovementRightKeyPressed,
  isMovementUpKeyPressed,
  isRunKeyPressed
} from '../../../engine/input.js';
import { setPlayerCollider, setPlayerTransform } from '../../../engine/meta.js';
import { sendServerData } from '../../../engine/server.js';
import { GRAVITY } from '../../../engine/physics.js';
import { getCanPlayerMove } from '../../../engine/player.js';

import { Entity } from '../../entity.js';
import { PlayerName } from './player-name.js';

import { Collider } from '../../../components/collider.js';
import { Physics } from '../../../components/physics.js';
import { AudioEmitter } from '../../../components/audio-emitter.js';

import { clampToPixel } from '../../../utils/math.js';

import { PlayerSprite } from './sprite.js';
import { STATES } from './states.js';
import { CROUCH_SPEED, JUMP_COOLDOWN, NORMAL_SPEED, RUN_SPEED } from './constants.js';
import { DIRECTIONS } from '../../../constants/directions.js';

export class Player extends Entity {
  collider = new Collider(0, 32, 32, 32);
  physics = new Physics();
  walkingAudioEmitter = new AudioEmitter('walking', 0.03);
  runningAudioEmitter = new AudioEmitter('running', 0.03);
  sprite = new PlayerSprite();

  state = STATES.IDLE;
  direction = DIRECTIONS.DOWN;
  speed = NORMAL_SPEED;
  stepTimer = 0;
  jumpCount = 0;
  jumpCooldown = 0;
  playerName = new PlayerName(this.transform.x, this.transform.y, localStorage.getItem('username') || 'NULL');

  update(dt) {
    if (this.transform.z === 0) this.state = STATES.IDLE;

    if (getCanPlayerMove()) {
      // state change
      if (isCrouchKeyPressed()) this.state = STATES.CROUCHING;
      if (!isRunKeyPressed() && isAMovementKeyPressed()) this.state = STATES.WALKING;
      if (isRunKeyPressed() && isAMovementKeyPressed()) this.state = STATES.RUNNING;
      // if (isJumpKeyPressed()) this.state = STATES.JUMPING;

      if (!isCrouchKeyPressed() && !isAMovementKeyPressed() && !isCrouchKeyPressed() && !isJumpKeyPressed()) {
        this.state = STATES.IDLE;
      }

      // movement
      this.speed = isCrouchKeyPressed() ? CROUCH_SPEED : NORMAL_SPEED;
      this.speed = isRunKeyPressed() ? RUN_SPEED : NORMAL_SPEED;

      if (isJumpKeyPressed() && this.jumpCount < 1 && this.jumpCooldown === 0) {
        this.physics.velocity.applyForce(0, 0, 6.5);
        this.jumpCount++;
        this.jumpCooldown = JUMP_COOLDOWN;
      }

      if (this.jumpCooldown !== 0) this.jumpCooldown--;
      if (this.transform.z === 0) this.jumpCount = 0;

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

      if (isAttackKeyPressed()) {

      }
    }

    // movement resolution
    this.transform.z += this.physics.velocity.z;
    this.physics.velocity.z -= GRAVITY * dt * 25;

    if (this.transform.z < 0) {
      this.physics.velocity.z = 0;
      this.transform.z = 0;
    }

    // meta, for interactions with the player
    setPlayerTransform(this.transform);
    setPlayerCollider(this.collider);

    sendServerData(JSON.stringify({
      type: 'playerMove',
      x: this.transform.x,
      y: this.transform.y,
      z: this.transform.z,
      direction: this.direction,
      state: this.state,
    }));

    // sfx
    if ((this.state === STATES.WALKING || this.state === STATES.RUNNING) && this.transform.z === 0) {
      const interval = this.state === STATES.RUNNING ? 18 : 28;
      if (this.stepTimer <= 0) {
        this.walkingAudioEmitter.playStep();
        this.stepTimer = interval;
      } else {
        this.stepTimer--;
      }
    } else {
      this.stepTimer = 0;
      this.walkingAudioEmitter.stop();
      this.runningAudioEmitter.stop();
    }

    // player name
    this.playerName.update();
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx, dt) {
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

    this.sprite.step(this.direction, this.state, dt);

    const crouchOffset = this.state === STATES.CROUCHING ? 12 : 0;
    const screenX = this.transform.x + this.sprite.xOffset;
    const screenY = (this.transform.y - this.collider.getDimensions().h - this.transform.z) + crouchOffset;

    ctx.drawImage(
      this.sprite.img,
      ...this.sprite.getCurrentFrame(),
      screenX,
      screenY,
      48, 64
    );

    this.playerName.draw(ctx);
  }
}
