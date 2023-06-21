import { areKeysPressed, isKeyPressed, setCanPlayerMove } from '../../engine/input.js';
import { processCommand } from '../../engine/command.js';

import { Entity } from '../entity.js';

import { Dimensions } from '../../components/dimensions.js';
import { Offset } from '../../constructs/offset.js';

import { PLACEHOLDER_TEXT } from './constants.js';

export class ChatWindow extends Entity {
  dimensions = new Dimensions(0, 200);

  isFocused = false;
  inputField = document.createElement('input');
  chatLog = document.createElement('p');

  inputOffset = new Offset(16, 13);
  inputFocusLineOffset = 40;
  chatLogOffset = new Offset(16, 58);

  constructor() {
    super();

    this.transform.y = document.documentElement.clientHeight - this.dimensions.height;

    this.#initializeInputField();
    this.#initializeChatLog();
  }

  update(dt) {
    if (!this.isFocused && areKeysPressed('t', 'T')) {
      if (this.inputField.value === PLACEHOLDER_TEXT) this.inputField.value = '';
      this.inputField.focus();
      this.isFocused = true;
      setCanPlayerMove(false);
    }

    if (this.isFocused && isKeyPressed('Escape')) {
      if (this.inputField.value === '') this.inputField.value = PLACEHOLDER_TEXT;
      this.inputField.blur();
      this.isFocused = false;
      setCanPlayerMove(true);
    }

    if (this.isFocused && isKeyPressed('Enter')) {
      if (this.inputField.value.startsWith('/')) {
        processCommand(this.inputField.value);
      } else {
        const newChat = document.createElement('li');
        newChat.textContent = `Collider: ${this.inputField.value}`;
        this.chatLog.append(newChat);
      }

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
    ctx.font = '16px Abel Regular';
    ctx.fillText(this.inputField.value, this.transform.x + this.inputOffset.x, this.transform.y + this.inputOffset.y);

    ctx.beginPath();
    ctx.moveTo(this.transform.x, this.transform.y + this.inputFocusLineOffset);
    ctx.lineTo(document.documentElement.clientWidth, this.transform.y + this.inputFocusLineOffset);
    ctx.strokeStyle = this.isFocused ? '#aaa' : '#444';
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = 'white';
    for (let i = 0; i < this.chatLog.childNodes.length; i++) {
      ctx.fillText(
        this.chatLog.childNodes[i].textContent,
        this.transform.x + this.chatLogOffset.x,
        this.transform.y + this.chatLogOffset.y + i * 20
      );
    }
  }

  #initializeInputField() {
    this.inputField.style.position = 'fixed';
    this.inputField.style.bottom = String(-100);
    this.inputField.style.outline = 'none';
    this.inputField.value = PLACEHOLDER_TEXT;

    document.body.append(this.inputField);
  }

  #initializeChatLog() {
    this.chatLog.style.position = 'fixed';
    this.chatLog.style.bottom = String(-100);
    this.chatLog.style.outline = 'none';

    document.body.append(this.chatLog);
  }
}
