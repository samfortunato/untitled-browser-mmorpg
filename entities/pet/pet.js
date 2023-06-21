import { Entity } from '../entity.js';

const AGES = {
  BABY: 0,
  CHILD: 1,
  ADOLESCENT: 2,
  ADULT: 3,
  ELDER: 4.
};

const AGES_TO_COLORS = {
  [AGES.BABY]: 'white',
  [AGES.CHILD]: 'pink',
  [AGES.ADOLESCENT]: 'red',
  [AGES.ADULT]: 'darkred',
  [AGES.ELDER]: 'gray',
}

export class Pet extends Entity {
  timeAlive = 0;
  age = AGES.BABY;

  update() {
    // movement
    const shouldMove = Math.round(Math.random() * 10) > 9;

    if (shouldMove) this.transform.y += Math.round(Math.random() * 4 - 1);
    if (shouldMove) this.transform.x += Math.round(Math.random() * 4 - 1);

    // aging
    this.timeAlive++;

    if (this.timeAlive > 100) this.age = AGES.CHILD;
    if (this.timeAlive > 200) this.age = AGES.ADOLESCENT;
    if (this.timeAlive > 300) this.age = AGES.ADULT;
    if (this.timeAlive > 400) this.age = AGES.ELDER;
    if (this.timeAlive > 500) this.destroy();
  }

  draw(ctx) {
    ctx.fillStyle = AGES_TO_COLORS[this.age];
    ctx.fillRect(this.transform.x, this.transform.y, 32, 32);
  }
}
