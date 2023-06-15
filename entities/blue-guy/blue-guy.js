import { getPlayerCollider, getPlayerTransform } from '../../engine/meta.js';
import { isKeyPressed } from '../../engine/input.js';
import { addEntity } from '../../engine/entity.js';

import { PORTRAITS } from '../../assets/portraits/portraits.js';

import { Entity } from '../entity.js';
import { DialogBox } from '../dialog-box/dialog-box.js';

import { Collider } from '../../components/collider.js';

import { isWithinBoundsOf } from '../../utils/collision.js';

import { BlueGuySprite } from './sprite.js';

export class BlueGuy extends Entity {
  collider = new Collider(0, 32, 32, 32);
  sprite = new BlueGuySprite();

  isInteracting = false;
  interactionCooldown = 0;

  constructor() {
    super();

    this.transform.set(600, 200);
  }

  update() {
    const playerPos = {
      ...getPlayerTransform(),
      ...getPlayerCollider(),
    };

    const blueGuyPos = {
      ...this.transform,
      ...this.collider,
    };

    if (
      !this.isInteracting &&
      this.interactionCooldown === 0 &&
      isKeyPressed('Enter') &&
      isWithinBoundsOf(playerPos, blueGuyPos)
    ) {
      this.isInteracting = true;

      addEntity(
        new DialogBox(
          'Hey! This is an example of talking to a character! Now, gimme all your money!!',
          PORTRAITS.BLUE_GUY,
          this.onClose
        )
      );
    }

    if (this.interactionCooldown > 0) {
      this.interactionCooldown--;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.sprite.img,
      ...this.sprite.getCurrentFrame(),
      this.transform.x, this.transform.y, 48, 64
    );
  }

  onClose() {
    this.interactionCooldown = 30;
    this.isInteracting = false;
  }
}
