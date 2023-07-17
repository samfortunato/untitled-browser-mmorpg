import { Inventory } from '../../system/inventory.js';

import { Entity } from '../entity.js';

import { CloseButtonNew } from './close-button-new.js';

import { Dimensions } from '../../components/dimensions.js';
import { Offset } from '../../constructs/offset.js';
import { Easer } from '../../constructs/easer.js';

import { TILE_SIZE_RENDERED } from '../../constants/draw.js';
import { ITEM_SPRITE_BOUND } from '../../assets/items/constants.js';
import { UI } from '../../assets/ui/ui.js';

const AMOUNT_ITEMS_ON_EACH_ROW = 10;
const START_OF_ITEMS_LIST_Y = 400;

export class InventoryWindow extends Entity {
  dimensions = new Dimensions(TILE_SIZE_RENDERED * AMOUNT_ITEMS_ON_EACH_ROW, document.documentElement.clientHeight);

  closeButton = new CloseButtonNew(0, 0, this.onClose.bind(this));
  animationOffset = new Offset(this.dimensions.width + this.closeButton.dimensions.width, 0);
  easer = new Easer(100, 10);
  canInteract = false;

  constructor() {
    super();

    this.transform.x = document.documentElement.clientWidth - this.dimensions.width;
    this.closeButton.transform.x = this.transform.x - this.closeButton.dimensions.width;
  }

  update(dt) {
    // debugger;
    const easeBy = this.easer.easeBy() * (dt * 100);

    this.animationOffset.x -= easeBy;
    this.closeButton.animationOffset.x -= easeBy;

    if (this.animationOffset.x <= 0) {
      this.animationOffset.x = 0;
      this.canInteract = true;
    }

    this.closeButton.update();
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    const xPos = this.transform.x + this.animationOffset.x;

    // window bg
    ctx.fillStyle = 'black';
    ctx.fillRect(xPos, this.transform.y, this.dimensions.width, this.dimensions.height);

    // equipped
    ctx.globalAlpha = 0.3;
    ctx.drawImage(
      UI.EQUIP_MANNEQUIN,
      xPos + ((TILE_SIZE_RENDERED * AMOUNT_ITEMS_ON_EACH_ROW / 2) - 200 / 2),
      this.transform.y + 50,
      200, 284
    );
    ctx.globalAlpha = 1;

    // items
    let x = 0;
    let y = START_OF_ITEMS_LIST_Y;

    for (const [i, item] of Object.entries(Inventory.getAll())) {
      item.constructor.draw(ctx, { x: (x * ITEM_SPRITE_BOUND * 2) + xPos, y });

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
