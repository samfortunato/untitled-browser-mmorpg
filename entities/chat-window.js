import { Entity } from './entity.js';

import { Transform } from '../components/transform.js';

export class ChatWindow {
  height = 200;
  transform = new Transform(0, document.documentElement.clientHeight - this.height);

  update() { }

  draw(ctx) {
    ctx.fillRect(this.transform.x, this.transform.y, document.documentElement.clientWidth, this.height);
  }
}
