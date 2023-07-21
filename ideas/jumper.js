import { isKeyPressed } from '../engine/input.js';
import { GRAVITY } from '../engine/physics.js';

import { Entity } from '../entities/entity.js';

import { Dimensions } from '../components/dimensions.js';
import { Physics } from '../components/physics.js';

export class Jumper extends Entity {
  dimensions = new Dimensions(32, 32);
  physics = new Physics();

  jumpCount = 0;
  jumpCooldown = 0;

  update(dt) {
    this.handleJump();
  }

  handleJump() {
    if (isKeyPressed('1') && this.jumpCount < 1) {
      this.physics.velocity.applyForce(0, 0, 10);
      this.jumpCount++;
    }

    this.transform.z += this.physics.velocity.z;
    this.physics.velocity.applyForce(0, 0, -GRAVITY);

    if (this.transform.z < 0) {
      this.transform.z = 0;
      this.physics.velocity.z = 0;
    }
  }

  draw(ctx) {
    this.drawShadow(ctx);
    this.drawJumper(ctx);
  }

  drawShadow(ctx) {
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(this.transform.x, this.transform.y + 12, this.dimensions.width, this.dimensions.height - 12);
    ctx.globalAlpha = 1;
  }

  drawJumper(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(
      this.transform.x,
      this.transform.y - this.transform.z,
      this.dimensions.width,
      this.dimensions.height
    );
  }
}
