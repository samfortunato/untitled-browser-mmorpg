import { toggleMute } from '../engine/audio.js';
import { addEntity } from '../engine/entity.js';

import { Entity } from './entity.js';
import { MenuButton } from './menu-button.js';
import { TextWindow } from './text-window/text-window.js';

export class Menu extends Entity {
  items = [
    new MenuButton('Inventory', this.onInventoryClick),
    new MenuButton('Stats', this.onStatsClick),
    new MenuButton('Guild', this.onGuildClick),
    new MenuButton('Options', this.onOptionsClick),
    new MenuButton('Mute', this.onMuteClick),
  ];

  initialButtonOffset = 10;
  gap = 2;

  constructor(x = 0, y = 625) {
    super(x, y);

    this.items.forEach((item, idx) => {
      item.transform.x = this.transform.x + this.initialButtonOffset + (idx * 100) + this.gap + (this.gap * idx);
      item.transform.y = this.transform.y;
    });
  }

  update() {
    for (const item of this.items) {
      item.update();
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.roundRect(
      this.transform.x,
      this.transform.y,
      // (this.items.length * 100) + (this.items.length * this.gap) - this.gap,
      document.documentElement.clientWidth,
      40
    );
    ctx.fill();
    ctx.closePath();

    for (const item of this.items) {
      item.draw(ctx);
    }
  }

  onInventoryClick() {
    addEntity(new TextWindow('Inventory'));
  }

  onStatsClick() {
    addEntity(new TextWindow('Stats'));
  }

  onGuildClick() {
    addEntity(new TextWindow('Guild'));
  }

  onOptionsClick() {
    addEntity(new TextWindow('Options'));
  }

  onMuteClick() {
    toggleMute();
  }
}
