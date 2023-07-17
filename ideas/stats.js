/**
 * @typedef {object} StatsSet
 * @property {number} attack
 * @property {number} defense
 * @property {number} speed
 * @property {number} magic
 */

/** @typedef {('attack'|'defense'|'speed'|'magic')} StatType */

export class Stats {
  buffs = new Map([
    ['attack', { amount: 0, cooldown: 0 }],
    ['defense', { amount: 0, cooldown: 0 }],
    ['speed', { amount: 0, cooldown: 0 }],
    ['magic', { amount: 0, cooldown: 0 }],
  ]);

  /** @param {StatsSet} stats */
  constructor(stats) {
    this.attack = stats.attack;
    this.defense = stats.defense;
    this.speed = stats.speed;
    this.magic = stats.magic;
  }

  update(dt) {
    this.buffs.forEach(buff => {
      if (buff.cooldown > 0) buff.cooldown--;

      if (buff.cooldown === 0) buff.amount = 0;
    });
  }

  /** @param {StatType} statType */
  buff(statType, amount, cooldown) {
    this.buffs.get(statType).amount = amount;
    this.buffs.get(statType).cooldown = cooldown;
  }
}

const stats = new Stats({
  attack: 0,
  defense: 0,
  speed: 0,
  magic: 0,
});

stats.buff('attack', 2, 10);
stats.buff('speed', 2, 100);
