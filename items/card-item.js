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
