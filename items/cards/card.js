import { CardItem } from '../card-item.js';

import { SlimeCard } from './slime-card.js';

const NULL_NAME = 'NULL';

export class Card {
  static cardName = NULL_NAME;

  static CARDS = {
    'Slime': SlimeCard,
  };

  static createInstance(cardName) {
    return new CardItem(cardName);
  }
}
