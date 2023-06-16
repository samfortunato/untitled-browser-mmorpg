import { Entity } from '../entity.js';

import { Transform } from '../../components/transform.js';

import { BeeSprite } from './sprite.js';

import { DIRECTIONS } from '../../constants/directions.js';

export class Bee extends Entity {
  sprite = new BeeSprite();

  direction = DIRECTIONS.LEFT;

  constructor(x, y) {
    super(x, y);

    this.initialPosition = Transform.copy(this.transform);
  }

  update(dt) {
    if (this.direction === DIRECTIONS.LEFT && this.transform.x < this.initialPosition.x - 30) {
      this.direction = DIRECTIONS.RIGHT;
    }

    if (this.direction === DIRECTIONS.RIGHT && this.transform.x > this.initialPosition.x + 30) {
      this.direction = DIRECTIONS.LEFT;
    }

    this.direction === DIRECTIONS.LEFT ? this.transform.x-- : this.transform.x++;
  }

  draw(ctx) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.transform.x, this.transform.y, 3, 3);
  }
}
