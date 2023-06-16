import { isKeyPressed, setCanPlayerMove } from '../../engine/input.js';

import { Entity } from '../entity.js';

import { Dimensions } from '../../components/dimensions.js';

import { PLACEHOLDER_TEXT } from './constants.js';

export class ChatWindow extends Entity {
  dimensions = new Dimensions(0, 200);

  isFocused = false;
  inputField = document.createElement('input');
  chatLog = document.createElement('p');

  inputXOffset = 16;
  inputYOffset = 12;
  inputFocusLineOffset = 40;
  chatLogOffset = { x: 16, y: 64 };

  constructor() {
    super();

    this.transform.y = document.documentElement.clientHeight - this.dimensions.height;

    this.inputField.style.position = 'fixed';
    this.inputField.style.bottom = String(-100);
    this.inputField.style.outline = 'none';
    this.inputField.value = PLACEHOLDER_TEXT;
    document.body.append(this.inputField);

    this.chatLog.style.position = 'fixed';
    this.chatLog.style.bottom = String(-100);
    this.chatLog.style.outline = 'none';
    document.body.append(this.chatLog);
  }

  update(dt) {
    if (!this.isFocused && isKeyPressed('t')) {
      if (this.inputField.value === PLACEHOLDER_TEXT) this.inputField.value = '';
      this.inputField.focus();
      this.isFocused = true;
      setCanPlayerMove(false);

      console.log('chat is focused');
    }

    if (this.isFocused && isKeyPressed('Escape')) {
      if (this.inputField.value === '') this.inputField.value = PLACEHOLDER_TEXT;
      this.inputField.blur();
      this.isFocused = false;
      setCanPlayerMove(true);

      console.log('chat is unfocused');
    }

    if (this.isFocused && isKeyPressed('Enter')) {
      const newChat = document.createElement('li');
      newChat.textContent = `Hero: ${this.inputField.value}`;
      this.chatLog.append(newChat);

      this.inputField.value = PLACEHOLDER_TEXT;
      this.inputField.blur();
      this.isFocused = false;
      setCanPlayerMove(true);
    }
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.transform.x, this.transform.y, document.documentElement.clientWidth, this.dimensions.height);

    ctx.fillStyle = this.isFocused ? 'white' : 'gray';
    ctx.font = '16px sans-serif';
    ctx.fillText(this.inputField.value, this.transform.x + this.inputXOffset, this.transform.y + this.inputYOffset);

    if (this.isFocused) {
      ctx.beginPath();
      ctx.moveTo(this.transform.x, this.transform.y + this.inputFocusLineOffset);
      ctx.lineTo(document.documentElement.clientWidth, this.transform.y + this.inputFocusLineOffset);
      ctx.strokeStyle = 'white';
      ctx.stroke();
      ctx.closePath();
    }

    ctx.fillStyle = 'white';
    for (let i = 0; i < this.chatLog.childNodes.length; i++) {
      ctx.fillText(
        this.chatLog.childNodes[i].textContent,
        this.transform.x + this.chatLogOffset.x,
        this.transform.y + this.chatLogOffset.y + i * 20
      );
    }
  }
}
