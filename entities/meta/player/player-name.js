import { getPlayerTransform } from '../../../engine/meta.js';

import { Entity } from '../../entity.js';

import { Offset } from '../../../constructs/offset.js';

export class PlayerName extends Entity {
  playerNameOffset = new Offset(13, -47);
  playerNameShadowOffset = new Offset(2, 2);

  constructor(x, y, playerName) {
    super(x, y);

    this.playerName = playerName;
  }

  update() {
    const playerTransform = getPlayerTransform();

    this.transform.x = playerTransform.x;
    this.transform.y = playerTransform.y;
    this.transform.z = playerTransform.z;
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.textAlign = 'center';
    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = this.playerNameShadowOffset.x;
    ctx.shadowOffsetY = this.playerNameShadowOffset.y;

    ctx.font = '500 1rem Titillium Web';
    ctx.fillStyle = 'white';
    ctx.fillText(
      this.playerName,
      this.transform.x + this.playerNameOffset.x + this.playerNameShadowOffset.x,
      (this.transform.y - this.transform.z) + this.playerNameOffset.y + this.playerNameShadowOffset.y
    );

    ctx.textAlign = 'start';
    ctx.shadowColor = 'default';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY  = 0;
  }
}
