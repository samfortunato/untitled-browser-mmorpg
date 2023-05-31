import { Entity } from './entity.js';

import { Dimensions } from '../components/dimensions.js';

export class ChatWindow extends Entity {
  dimensions = new Dimensions(0, 200);

  constructor() {
    super();

    this.transform.y = document.documentElement.clientHeight - this.dimensions.height;
  }

  draw(ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.transform.x, this.transform.y, document.documentElement.clientWidth, this.dimensions.height);
  }
}
