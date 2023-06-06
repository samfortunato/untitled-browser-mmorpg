import { Entity } from '../entity.js';

import { Collider } from '../../components/collider.js';
import { Dimensions } from '../../components/dimensions.js';
import { Transform } from '../../components/transform.js';

export class WindowBar extends Entity {
  collider = new Collider();

  /**
   * @param {Transform} textWindowTransform
   * @param {Dimensions} textWindowDimensions
   * */
  constructor(textWindowTransform, textWindowDimensions) {
    super(textWindowTransform.x, textWindowTransform.y);

    this.collider.topRight = textWindowDimensions.width;
    this.collider.bottomRight = textWindowDimensions.width;
    this.collider.bottomLeft = 32;
  }

  /** Debug */
  draw(ctx) {
    // this.collider._draw(ctx);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(this.transform.x, this.transform.y, this.collider.topRight, 32);
  }

  setPosition(transform) {
    this.transform.x = transform.x;
    this.transform.y = transform.y;
  }
}
