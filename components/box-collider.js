import { Dimensions } from './dimensions.js';

/**
 * A box collider.
 *
 * Use for collision.
 */
export class BoxCollider {
  /** @param {Dimensions} dimensions  */
  static fromDimensions(dimensions) {
    return new BoxCollider(dimensions.width, dimensions.height);
  }

  constructor(width = 0, height = 0) {
    this.width = width;
    this.height = height;
  }

  _draw(ctx, transform) {
    ctx.strokeStyle = 'red';
    ctx.strokeRect(transform.x, transform.y, this.width, this.height);
  }
}
