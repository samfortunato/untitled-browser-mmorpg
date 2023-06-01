import { Entity } from './entity.js';

export class AreaInfo extends Entity {
  underlineOffset = 40;
  margin = 16;

  constructor() {
    super();

    this.transform.x = this.margin;
    this.transform.y = document.documentElement.clientHeight - 256;
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.font = '2rem sans-serif';
    ctx.fillStyle = 'white';
    ctx.fillText('Highland Plains', this.transform.x, this.transform.y);

    ctx.beginPath();
    ctx.moveTo(this.transform.x, this.transform.y + this.underlineOffset);
    ctx.lineTo(document.documentElement.clientWidth - this.margin, this.transform.y + this.underlineOffset);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }
}
