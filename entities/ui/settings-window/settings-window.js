import { Entity } from '../../entity.js';
import { CloseButtonNew } from '../close-button-new.js';
import { MenuItemWithToggle } from '../menu-item-with-toggle.js';

import { Dimensions } from '../../../components/dimensions.js';

import { Padding } from '../../../constructs/padding.js';

import { calculateCenterOfScreenX, calculateCenterOfScreenY } from '../../../utils/math.js';

export class SettingsWindow extends Entity {
  dimensions = new Dimensions(400, 300);
  padding = new Padding(20, 20);

  closeButton = new CloseButtonNew(0, 0, this.onClose.bind(this));

  menuItems = [];

  constructor() {
    super();

    this.transform.x = calculateCenterOfScreenX(this.dimensions);
    this.transform.y = calculateCenterOfScreenY(this.dimensions) - 100;

    this.closeButton.transform.x = this.transform.x + this.dimensions.width - this.closeButton.dimensions.width;
    this.closeButton.transform.y = this.transform.y;

    this.menuItems = [
      new MenuItemWithToggle(
        this.transform.x + this.padding.x,
        this.transform.y + this.padding.y * 4,
        new Dimensions(this.dimensions.width - this.padding.x * 2, 60),
        'Mute music'
      ),
    ];
  }

  update() {
    this.closeButton.update();

    this.menuItems.forEach(item => item.update());
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.transform.x, this.transform.y, this.dimensions.width, this.dimensions.height);

    ctx.fillStyle = 'white';
    ctx.font = '2rem Abel Regular';
    ctx.fillText('Settings', this.transform.x + this.padding.x, this.transform.y + this.padding.y);

    this.closeButton.draw(ctx);

    this.menuItems.forEach(item => item.draw(ctx));
  }

  onClose() {
    this.destroy();
  }
}
