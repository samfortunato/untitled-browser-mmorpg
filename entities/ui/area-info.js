import { Entity } from '../entity.js';

export class AreaInfo extends Entity {
  underlineOffset = 40;
  margin = 16;
  animationFrame = 0;
  keyframe = 0;
  opacity = 0;
  dt = 0;

  constructor() {
    super();

    this.transform.x = this.margin;
    this.transform.y = document.documentElement.clientHeight - 296;
  }

  update(dt) {
    this.dt = dt;

    if (this.keyframe === 2) {
      this.destroy();
    }
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    if (this.keyframe === 0 && this.animationFrame < 300) {
      this.opacity += 0.01;
      this.opacity = this.opacity >= 1 ? 1 : this.opacity;
    }

    if (this.keyframe === 0 && this.animationFrame >= 300) {
      this.keyframe = 1;
    }

    if (this.keyframe === 1 && this.animationFrame >= 300) {
      this.opacity -= 0.01;
      this.opacity = this.opacity <= 0 ? 0 : this.opacity;
    }

    if (this.keyframe === 1 && this.opacity === 0) {
      this.keyframe = 2;
    }

    ctx.globalAlpha = this.opacity;

    ctx.font = '500 2rem "Titillium Web"';
    ctx.fillStyle = 'white';
    ctx.fillText('Highland Plains', this.transform.x, this.transform.y);

    ctx.beginPath();
    ctx.moveTo(this.transform.x, this.transform.y + this.underlineOffset);
    ctx.lineTo(document.documentElement.clientWidth - this.margin, this.transform.y + this.underlineOffset);
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.closePath();

    ctx.globalAlpha = 1;

    this.animationFrame++;
  }
}
