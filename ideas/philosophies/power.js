export class PowerPhilosophy {
  static bias = {
    attack: 3,
    defense: 1,
    magic: 0,
    intelligence: 0,
  }

  static applyBias(stats) {
    const biased = { ...stats };

    biased.attack += this.bias.attack;
    biased.defense += this.bias.defense;
    biased.magic += this.bias.magic;
    biased.intelligence += this.bias.intelligence;

    return biased;
  }
}

class PlayerStats {
  attack = 0;
  defense = 0;
  magic = 0;
  intelligence = 0;

  /**
   * LOL this is dumb. you're overcomplicating it probably.
   *
   * letting this stew in my head, & coming back to it later.
   *
   * but i still like the idea of philosophies.
   * */
  levelUp() {
    const playerStats = getPlayer().getStats();
    const playerPhilosophy = getPlayer().getPhilosophy();

    const leveled = this.modify(LevelUpStrategy);
    const biased = playerPhilosophy.applyBias(leveled);

    this.modify(biased);
  }

  modify(strategy) {
    // ...
  }
}

class Player {
  // ...

  philosophy = PowerPhilosophy;

  getPhilosophy() { return this.philosophy; }
  setPhilosophy(philosophy) { this.philosophy = philosophy; }

  // ...
}
