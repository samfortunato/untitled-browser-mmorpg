export class Transform {
  constructor(x = 0, y = 0, bounds) {
    this.x = x;
    this.y = y;
    this.bounds = bounds || {
      topLeft: 0,
      topRight: 0,
      bottomRight: 0,
      bottomLeft: 0,
    };
  }
}
