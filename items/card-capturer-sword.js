import { Item } from './item.js';

/**
 * Players can use this to turn a monster into a card when they defeat the monster with this weapon.
 * Maybe make it an increased likelihood, rather than a guarantee. It's gotta be hard.
 *
 * Maybe this weapon will be kind of weak.
 * */
export class CardCapturerSword extends Item {
  description = 'A weapon that allows you to capture a monster into a card upon defeating it.';
}
