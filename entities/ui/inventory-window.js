import { Inventory } from '../../system/inventory.js';

import { Entity } from '../entity.js';

import { CloseButtonNew } from './close-button-new.js';

import { Dimensions } from '../../components/dimensions.js';

import { TILE_SIZE_RENDERED } from '../../constants/draw.js';
import { ITEM_SPRITE_BOUND } from '../../assets/items/constants.js';
import { UI } from '../../assets/ui/ui.js';

const AMOUNT_ITEMS_ON_EACH_ROW = 10;
const START_OF_ITEMS_LIST_Y = 400;

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
    // window bg
    ctx.fillStyle = 'black';
    ctx.fillRect(this.transform.x, this.transform.y, this.dimensions.width, this.dimensions.height);

    // equipped
    ctx.globalAlpha = 0.3;
    ctx.drawImage(
      UI.EQUIP_MANNEQUIN,
      this.transform.x + ((TILE_SIZE_RENDERED * AMOUNT_ITEMS_ON_EACH_ROW / 2) - 200 / 2),
      this.transform.y + 50,
      200, 284
    );
    ctx.globalAlpha = 1;

    // items
    let x = 0;
    let y = START_OF_ITEMS_LIST_Y;

    for (const [i, item] of Object.entries(Inventory.getAll())) {
      item.constructor.draw(ctx, { x: (x * ITEM_SPRITE_BOUND * 2) + this.transform.x, y });

      x++;
      y++;
    }

    // close button
    this.closeButton.draw(ctx);
  }

  onClose() {
    this.destroy();
  }
}
