import { Item } from './item.js';

import { ITEMS } from '../assets/items/items.js';
import { ITEM_SPRITE_CROP_BOUNDS } from '../assets/items/constants.js';

import { RARITY } from './constants.js';

export class Sword extends Item {
  static attack = 1;
  static rarity = RARITY.COMMON;
  static sprite = ITEMS.SWORD;

  /**
   * i think `use` will have to be a static method on the item.
   *
   * unless you want to have multiple copies of the same item.
   * i worry about memory in this case, though, if we're storing a lot of instances.
   *
   * it's cheaper to have a "ledger" that shows which items the user has, as just flat values/numbers or something
   * then, if the player wants to use the item, you just call a static `use` method on the item's class,
   * instead of on an instance that you have to store.
   *
   * the issue would come into play if you wanted to store memory or data or something on specific instances of multiple
   * quantities of an item in a player's inventory.
   *
   * maybe a separate "ledger" or system could be put in place for that.
   * */
  static use() { }

  /** @param {CanvasRenderingContext2D} ctx */
  static draw(ctx, transform) {
    ctx.drawImage(
      Sword.sprite,
      8 * ITEM_SPRITE_CROP_BOUNDS, 24 * ITEM_SPRITE_CROP_BOUNDS,
      24, 24,
      transform.x, transform.y,
      ITEM_SPRITE_CROP_BOUNDS * 2, ITEM_SPRITE_CROP_BOUNDS * 2
    );
  }

  draw(ctx) {
    Sword.draw(ctx, this.transform);
  }
}
