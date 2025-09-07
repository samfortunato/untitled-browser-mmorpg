export class Shop {
  buy() { }

  sell(item) {
    Inventory.getItem(ITEMS.GOLD).increase(item.value);

    item.destroy();
  }
}
