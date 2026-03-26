import { Entity } from '../../entity.js';

import { Collider } from '../../../components/collider.js';
import { PlayerSprite } from './sprite.js';
import { STATES } from './states.js';
import { DIRECTIONS } from '../../../constants/directions.js';

const LERP_FACTOR = 0.4;
const Z_SNAP_THRESHOLD = 0.5;

export class OtherPlayer extends Entity {
  collider = new Collider(0, 32, 32, 32);
  sprite = new PlayerSprite();
  direction = DIRECTIONS.DOWN;
  state = STATES.IDLE;

  constructor(serverId, x, y, username = '') {
    super(x, y);
    this.serverId = serverId;
    this.username = username;
    this.targetX = x;
    this.targetY = y;
    this.targetZ = 0;
    this.hasReceivedFirstPosition = false;
  }

  update() {
    this.transform.x += (this.targetX - this.transform.x) * LERP_FACTOR;
    this.transform.y += (this.targetY - this.transform.y) * LERP_FACTOR;
    this.transform.z = this.targetZ;
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx, dt) {
    if (!this.hasReceivedFirstPosition) return;

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

    if (this.username) {
      ctx.textAlign = 'center';
      ctx.font = '500 1rem Titillium Web';
      ctx.fillStyle = 'white';
      ctx.shadowColor = 'black';
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.fillText(
        this.username,
        this.transform.x + 15,
        (this.transform.y - this.transform.z) - 45,
      );
      ctx.textAlign = 'start';
      ctx.shadowColor = 'transparent';
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
  }
}
