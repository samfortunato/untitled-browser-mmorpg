import { Inventory } from '../../system/inventory.js';

import { Entity } from '../entity.js';

import { CloseButtonNew } from './close-button-new.js';

import { Dimensions } from '../../components/dimensions.js';

import { TILE_SIZE_RENDERED } from '../../constants/draw.js';
import { ITEM_SPRITE_BOUND } from '../../assets/items/items.js';

const AMOUNT_ITEMS_ON_EACH_ROW = 10;

export class InventoryWindow extends Entity {
  dimensions = new Dimensions(TILE_SIZE_RENDERED * AMOUNT_ITEMS_ON_EACH_ROW, document.documentElement.clientHeight);

  closeButton = new CloseButtonNew(0, 0, this.onClose.bind(this));

  constructor() {
    super();

    this.transform.x = document.documentElement.clientWidth - this.dimensions.width;
    this.closeButton.transform.x = this.transform.x - this.closeButton.dimensions.width;
  }

  update() {
    this.closeButton.update();
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.transform.x, this.transform.y, this.dimensions.width, this.dimensions.height);

    let x = 0;
    let y = 0;

    for (const [i, item] of Object.entries(Inventory.getAll())) {
      item.constructor.draw(ctx, { x: (x * ITEM_SPRITE_BOUND) + this.transform.x, y });

      x++;
      y++;
    }

    this.closeButton.draw(ctx);
  }

  onClose() {
    this.destroy();
  }
}
