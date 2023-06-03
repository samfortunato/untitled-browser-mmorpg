import { isKeyPressed, setCanPlayerMove } from '../engine/input.js';

import { Entity } from './entity.js';

import { Dimensions } from '../components/dimensions.js';

export class ChatWindow extends Entity {
  dimensions = new Dimensions(0, 200);

  isFocused = false;
  inputField = document.createElement('input');

  textXOffset = 16;
  textYOffset = 12;
  textFocusLineOffset = 40;

  constructor() {
    super();

    this.transform.y = document.documentElement.clientHeight - this.dimensions.height;

    this.inputField.style.position = 'fixed';
    this.inputField.style.bottom = String(-100);
    this.inputField.style.outline = 'none';
    document.body.append(this.inputField);
  }

  update(dt) {
    if (!this.isFocused && isKeyPressed('t')) {
      this.inputField.focus();
      this.isFocused = true;
      setCanPlayerMove(false);

      console.log('chat is focused');
    }

    if (this.isFocused && isKeyPressed('Escape')) {
      this.inputField.blur();
      this.isFocused = false;
      setCanPlayerMove(true);

      console.log('chat is unfocused');
    }

    if (this.isFocused && isKeyPressed('Enter')) {
      this.inputField.value = '';
      this.inputField.blur();
      this.isFocused = false;
      setCanPlayerMove(true);
    }
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.transform.x, this.transform.y, document.documentElement.clientWidth, this.dimensions.height);

    ctx.fillStyle = 'white';
    ctx.font = '16px sans-serif';
    ctx.fillText(this.inputField.value, this.transform.x + this.textXOffset, this.transform.y + this.textYOffset);

    if (this.isFocused) {
      ctx.beginPath();
      ctx.moveTo(this.transform.x, this.transform.y + this.textFocusLineOffset);
      ctx.lineTo(document.documentElement.clientWidth, this.transform.y + this.textFocusLineOffset);
      ctx.strokeStyle = 'white';
      ctx.stroke();
      ctx.closePath();
    }
  }
}
