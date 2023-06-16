import { CardItem } from '../../items/card-item.js';
import { Card } from '../../items/cards/card.js';

export class CardCollection {
  static cardQuantities = new Map();

  static add(card) {
    this.cardQuantities.set(card.cardName, this.getQuantity(card.cardName) + 1);
  }

  static remove(cardName) {
    this.cardQuantities.set(cardName, this.getQuantity(cardName) - 1);
  }

  static takeOut(cardName) {
    this.remove(cardName);

    return new CardItem(cardName);
  }

  static getQuantity(cardName) {
    return this.cardQuantities.get(cardName) || 0;
  }

  static getInfo(cardName) {
    return Card.CARDS[cardName];
  }
}
