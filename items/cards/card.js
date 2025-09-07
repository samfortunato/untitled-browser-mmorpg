import { CardItem } from '../card-item.js';

import { SlimeCard } from './slime-card.js';

const NULL_NAME = 'NULL';

export class Card {
  // TODO: rename to `name`, probably?
  static cardName = NULL_NAME;

  static CARDS = {
    'Slime': SlimeCard,
  };

  static createInstance(cardName) {
    return new CardItem(cardName);
  }
}
