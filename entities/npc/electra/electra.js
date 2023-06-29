import { Entity } from '../../entity.js';

import { Collider } from '../../../components/collider.js';
import { Dialog } from '../../../components/dialog.js';

import { PORTRAITS } from '../../../assets/portraits/portraits.js';
import { ElectraSprite } from './sprite.js';

const PORTRAIT_BOUNDS = { dy: document.documentElement.clientHeight - 800, dw: 422, dh: 782 };

export class Electra extends Entity {
  collider = new Collider(0, 32, 32, 32);
  dialog = new Dialog(this, 'Hey! I\'m really fucking hot!', PORTRAITS.ELECTRA, null, PORTRAIT_BOUNDS);
  sprite = new ElectraSprite(this);

  update() {
    this.dialog.update();
  }

  draw(ctx) {
    this.sprite.draw(ctx);
  }
}
