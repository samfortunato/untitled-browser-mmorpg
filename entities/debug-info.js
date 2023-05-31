import { Entity } from './entity.js';

export class DebugInfo extends Entity {
  dt = 0;

  update(dt) {
    this.dt = dt;
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.font = '1rem serif';
    ctx.fillText(this.dt, this.transform.x, this.transform.y);
  }
}
