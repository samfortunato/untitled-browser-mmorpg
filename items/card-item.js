/**
 * TODO:
 * - change `contextMenu` to just `context`, or `options`?
 * - make `getInfo` and any other property like this a getter?
 *   - maybe, any data/etc. that is just... getting a prop, should just use `get` or `set`
 *   - just use it? yeah, it's a function, but like... it's also supposed to be seen as "static data"? idk.
 *   - i get it, that if it's an actual function, it can error, and give you more information...?
 */

import { Item } from './item.js';

import { CardCollection } from '../system/collections/cards.js';

import { Card } from './cards/card.js';

export class CardItem extends Item {
  contextMenu = {
    'View': this.view,
    'Add card to collection': this.use,
  };

  constructor(cardName) {
    super();

    this.cardName = cardName;
  }

  use() {
    CardCollection.add(this);

    super.use();
  }

  view() {
    console.log(this.getInfo());
  }

  getInfo() {
    return Card.CARDS[this.cardName];
  }
}
