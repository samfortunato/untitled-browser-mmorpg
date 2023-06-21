import { Sprite } from '../../components/sprite.js';

export class ElectraSprite extends Sprite {
  constructor(electra) {
    super();

    this.electra = electra;

    this.setSprite('electra');
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      ...this.getCurrentFrame(),
      this.electra.transform.x, this.electra.transform.y, 48, 64
    );
  }

  getCurrentFrame() {
    return [
      24, 64, 24, 32
    ];
  }
}
