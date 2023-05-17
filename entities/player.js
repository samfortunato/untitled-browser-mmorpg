import { isKeyPressed } from '../engine/input.js';

export class Player {
  id = Symbol();
  speed = 3;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  update() {
    if (isKeyPressed('ArrowUp')) this.y -= this.speed;
    if (isKeyPressed('ArrowRight')) this.x += this.speed;
    if (isKeyPressed('ArrowDown')) this.y += this.speed;
    if (isKeyPressed('ArrowLeft')) this.x -= this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = '#000000';

    ctx.fillRect(this.x, this.y, 32, 32);
  }
}
