import { toggleMute } from '../../engine/audio.js';
import { addEntity } from '../../engine/entity.js';
import { UIManager } from '../../engine/ui.js';

import { Entity } from '../entity.js';
import { MenuButton } from './menu-button.js';
import { TextWindow } from '../ui/text-window/text-window.js';
import { InventoryWindow } from './inventory-window.js';

import { Dimensions } from '../../components/dimensions.js';

export class Menu extends Entity {
  dimensions = new Dimensions(document.documentElement.clientWidth, 44);

  items = [
    new MenuButton('Inventory', this.onInventoryClick),
    new MenuButton('Stats', this.onStatsClick),
    new MenuButton('Guild', this.onGuildClick),
    new MenuButton('Options', this.onOptionsClick),
    new MenuButton('Mute', this.onMuteClick),
  ];

  initialButtonOffset = 9;
  buttonOffset = { x: 0, y: 2 };
  gap = 2;

  constructor(x = 0, y = 622) {
    super(x, y);

    this.items.forEach((item, idx) => {
      item.transform.x = this.transform.x + this.initialButtonOffset + (idx * 100) + this.gap + (this.gap * idx);
      item.transform.y = this.transform.y + this.buttonOffset.y;
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
      this.dimensions.width,
      this.dimensions.height,
    );
    ctx.fill();
    ctx.closePath();

    for (const item of this.items) {
      item.draw(ctx);
    }
  }

  onInventoryClick() {
    UIManager.setCurrentlyFocusedWindow(new InventoryWindow());
  }

  onStatsClick() {
    const statsWindowText = `Stats:
    ATK: 2
    DEF: 3
    MAG: 3`;

    addEntity(new TextWindow(statsWindowText, null, null, 400));
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
