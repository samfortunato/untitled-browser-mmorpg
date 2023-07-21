/**
 * Represents a position in 2D space.
 *
 * Use `Transform` if you want to represent an `Entity`'s position in space.
 *
 * Use `Position` to represent any position in 2D space, separate from an entity's set of components,
 * for calculations or otherwise.
 */
export class Position {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}
