import { Entity } from '../entity.js';
import { ToggleButton } from './toggle-button.js';

import { Collider } from '../../components/collider.js';

export class MenuItemWithToggle extends Entity {
  dimensions;
  collider;

  toggleButton = new ToggleButton();

  constructor(x, y, dimensions, text) {
    super(x, y);

    this.dimensions = dimensions;
    this.collider = Collider.fromDimensions(dimensions);

    this.toggleButton.transform.set(
      this.transform.x + this.dimensions.width - this.toggleButton.dimensions.width,
      this.transform.y,
    );

    this.text = text;
  }

  update() {
    this.toggleButton.update();
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.font = '16px Abel Regular';
    ctx.fillText(this.text, this.transform.x, this.transform.y);

    this.toggleButton.draw(ctx);
  }
}
