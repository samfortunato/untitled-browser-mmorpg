/**
 * Represents an offset from a starting value.
 *
 * Use to calculate offset positions from a starting position.
 *
 * ex:
 * ```javascript
 * offset = new Offset(16, 16);
 *
 * ...
 *
 * draw(this.transform.x - this.offset.x, this.transform.y - this.offset.y, ...);
 * ```
 */
export class Offset {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
