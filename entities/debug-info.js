import { Entity } from './entity.js';

export class DebugInfo extends Entity {
  dt = 0;

  update(dt) {
    this.dt = dt;
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillText(this.dt, this.pos.x, this.pos.y);
  }
}
