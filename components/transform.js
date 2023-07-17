/**
 * Position in game space.
 *
 * (Usually?) represents the top left corner of the object.
 * (Most?) objects can be represented as a box/rectangle.
 */
export class Transform {
  static copy(transform) {
    return new Transform(transform.x, transform.y, transform.z);
  }

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  translate(x = 0, y = 0, z = 0) {
    this.x += x;
    this.y += y;
    this.z += z;
  }
}
