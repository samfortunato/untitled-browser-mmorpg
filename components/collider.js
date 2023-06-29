import { Dimensions } from './dimensions.js';

export class Collider {
  dimensions = new Dimensions();

  constructor(topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0) {
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomRight = bottomRight;
    this.bottomLeft = bottomLeft;

    this.dimensions.width = this.topRight;
    this.dimensions.height = this.bottomRight;
  }

  getDimensions() {
    return {
      w: this.dimensions.width,
      h: this.dimensions.height,
    };
  }


  /** For debug. */
  _draw(ctx, x, y) {
    ctx.strokeStyle = 'red';
    ctx.strokeRect(x, y, this.getDimensions().w, this.getDimensions().h);
  }
}
