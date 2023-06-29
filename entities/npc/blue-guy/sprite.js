import { Sprite } from '../../../components/sprite.js';

export class BlueGuySprite extends Sprite {
  constructor() {
    super();

    this.setSprite('blue-guy');
  }

  getCurrentFrame() {
    return [
      24, 64, 24, 32
    ];
  }
}
