import { Dimensions } from './dimensions.js';

/**
 * A boundary.
 *
 * Use to simulate collisions, etc.
 * If you want an object to be able to detect if it's touching something else,
 * it needs a `Collider`.
 */
export class Collider {
  dimensions = new Dimensions();

  static fromDimensions(dimensions) {
    return new Collider(0, dimensions.width, dimensions.height, dimensions.height);
  }

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
