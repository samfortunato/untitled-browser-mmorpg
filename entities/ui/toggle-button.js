import { didClickWithinBounds } from '../../engine/input.js';

import { Entity } from '../entity.js';

import { Dimensions } from '../../components/dimensions.js';
import { Collider } from '../../components/collider.js';

export class ToggleButton extends Entity {
  dimensions = new Dimensions(48, 24);
  collider = Collider.fromDimensions(this.dimensions);

  isToggled = false;
  clickCooldown = 0;

  update() {
    const bounds = { ...this.transform, ...this.collider };

    if (this.clickCooldown === 0 && didClickWithinBounds(bounds)) {
      this.isToggled = !this.isToggled;
      this.clickCooldown = 6;
    }

    if (this.clickCooldown > 0) this.clickCooldown--;
    else this.clickCooldown = 0;
  }

  draw(ctx) {
    ctx.fillStyle = this.isToggled ? 'limegreen' : 'gray';
    ctx.fillRect(this.transform.x, this.transform.y, this.dimensions.width, this.dimensions.height);

    const toggleKnobX = this.isToggled ? (this.transform.x + this.dimensions.width / 2) : this.transform.x;
    ctx.fillStyle = 'white';
    ctx.fillRect(toggleKnobX, this.transform.y, this.dimensions.width / 2, this.dimensions.height);
  }
}
