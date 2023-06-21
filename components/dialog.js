import { addEntity } from '../engine/entity.js';
import { isKeyPressed } from '../engine/input.js';
import { getPlayerCollider, getPlayerTransform } from '../engine/meta.js';

import { DialogBox } from '../entities/dialog-box/dialog-box.js';

import { isWithinBoundsOf } from '../utils/collision.js';
import { noop } from '../utils/noop.js';

export class Dialog {
  isInteracting = false;
  interactionCooldown = 0;

  constructor(parentEntity, text = '', portrait = null, onClose, portraitBounds = null) {
    this.parentEntity = parentEntity;
    this.text = text;
    this.portrait = portrait;
    this.onClose = onClose || noop;
    this.portraitBounds = portraitBounds;
  }

  update() {
    const playerPos = {
      ...getPlayerTransform(),
      ...getPlayerCollider(),
    };

    const parentEntityPos = {
      ...this.parentEntity.transform,
      ...this.parentEntity.collider,
    };

    if (
      !this.isInteracting &&
      this.interactionCooldown === 0 &&
      isKeyPressed('Enter') &&
      isWithinBoundsOf(playerPos, parentEntityPos)
    ) {
      this.isInteracting = true;

      addEntity(new DialogBox(this.text, this.portrait, this.onCloseDialog.bind(this), this.portraitBounds));
    }

    if (this.interactionCooldown > 0) {
      this.interactionCooldown--;
    }
  }

  onCloseDialog() {
    this.interactionCooldown = 30;
    this.isInteracting = false;

    this.onClose();
  }
}
