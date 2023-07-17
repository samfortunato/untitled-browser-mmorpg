import { getFps } from '../../engine/time.js';

import { Entity } from '../entity.js';

export class DebugInfo extends Entity {
  dt = 0;
  fps = 0;

  constructor(x = 16, y = 16) {
    super(x, y);
  }

  update(dt) {
    this.dt = dt;
    this.fps = getFps();
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.font = '1rem sans-serif';
    ctx.fillText(this.dt, this.transform.x, this.transform.y);
    ctx.fillText(`${this.fps} FPS`, this.transform.x, this.transform.y + 20);
  }
}
