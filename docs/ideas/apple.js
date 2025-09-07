export class Apple extends Item {
  modifier = {
    hp: 2,
  };

  use() {
    getPlayer().setStat('hp', this.modifier.hp);
  }
}
