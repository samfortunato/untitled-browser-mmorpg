const FORTRESS_TYPES = {
  A: 1,
  B: 2,
  C: 3,
};

/**
 * Maybe a drop-in entity or object of an enemy fortress.
 *
 * Can be randomly generated, or can be of a certain type.
 * Can have random items of a certain kind, depending on the kind of fortress.
 * Maybe things like items that you can get multiple of, but are either
 * valuable, or replenish essentials, such as arrows, food, potions, etc.
 *
 * I'm channeling those random enemy makeshift fortresses that you see in
 * Zelda: BotW/TotK here.
 */
export class Fortress {
  constructor(type) {
    this.type = type;
  }

  vanquish() {
    this.destroy();
  }
}

class FortressA { }
class FortressB { }
class FortressC { }

const fortress = new Fortress(FORTRESS_TYPES.A);
