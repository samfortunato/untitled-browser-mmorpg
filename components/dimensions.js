/**
 * TODO: maybe change to `Shape`, or something?
 *
 * also, make `width` and `height` just `w` and `h`?
 */

/** Represents 2D dimensions of an object in space. */
export class Dimensions {
  constructor(width = 0, height = 0) {
    this.width = width;
    this.height = height;
  }
}

/** Represents 2D dimensions of an object in space. */
export class Shape {
  constructor(w = 0, h = 0) {
    this.w = w;
    this.h = h;
  }
}
