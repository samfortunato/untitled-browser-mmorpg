export class Velocity3D {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  applyForce(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}
