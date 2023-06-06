export class Collider {
  constructor(topLeft = 0, topRight = 0, bottomRight = 0, bottomLeft = 0) {
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomRight = bottomRight;
    this.bottomLeft = bottomLeft;
  }

  getDimensions() {
    return {
      w: this.topRight,
      h: this.bottomRight,
    };
  }


  /** For debug. */
  _draw(ctx, x, y) {
    ctx.strokeStyle = 'red';
    ctx.strokeRect(x, y, this.getDimensions().w, this.getDimensions().h);
  }
}
