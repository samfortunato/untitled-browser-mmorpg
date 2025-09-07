export class TreasureChest extends Entity {
  items = [];

  constructor(pos, items) {
    super(pos);

    this.items = items;
  }

  open() {
    for (const item of this.items) {
      Inventory.addItem(item);
    }

    this.destroy();
  }
}
