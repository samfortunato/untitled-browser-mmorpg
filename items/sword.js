import { Item } from './item.js';

export class Sword extends Item {
  use() {
    this.destroy();
  }
}
