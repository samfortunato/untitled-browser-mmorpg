import { areKeysPressed, isKeyPressed } from '../../../engine/input.js';
import { processCommand } from '../../../engine/command.js';
import { setCanPlayerMove } from '../../../engine/player.js';
import { sendServerData } from '../../../engine/server.js';
import { getLatestChat } from '../../../engine/chat.js';

import { Entity } from '../../entity.js';

import { Dimensions } from '../../../components/dimensions.js';
import { Offset } from '../../../constructs/offset.js';

import { PLACEHOLDER_TEXT } from './constants.js';
import { MESSAGE_TYPES } from '../../../server/constants.js';

export class ChatWindow extends Entity {
  dimensions = new Dimensions(0, 197);

  inputField = document.createElement('input');
  chatLog = document.createElement('p');

  inputOffset = new Offset(16, 13);
  inputFocusLineOffset = 40;
  chatLogOffset = new Offset(16, 58);

  isFocused = false;

  constructor() {
    super();

    this.transform.y = document.documentElement.clientHeight - this.dimensions.height;

    this.#initializeInputField();
    this.#initializeChatLog();
  }

  update(dt) {
    const latestChat = getLatestChat();
    if (latestChat) this.#logChat(latestChat);

    this.#handleChatFocus();
    this.#handleChatBlur();
    this.#handleChatSubmit();
  }

  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    this.#drawChatWindow(ctx);
    this.#drawChatTextBox(ctx);
    this.#drawChatText(ctx);
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

  #logChat(chat) {
    const newChat = document.createElement('li');
    newChat.textContent = `Collider: ${chat}`;

    this.chatLog.append(newChat);
  }

  #handleChatBlur() {
    if (this.isFocused && isKeyPressed('Escape')) {
      if (this.inputField.value === '') this.inputField.value = PLACEHOLDER_TEXT;
      this.inputField.blur();
      this.isFocused = false;
      setCanPlayerMove(true);
    }
  }

  #handleChatFocus() {
    if (!this.isFocused && areKeysPressed('t', 'T')) {
      if (this.inputField.value === PLACEHOLDER_TEXT) this.inputField.value = '';
      this.inputField.focus();
      this.isFocused = true;
      setCanPlayerMove(false);
    }
  }

  #handleChatSubmit() {
    if (this.isFocused && isKeyPressed('Enter')) {
      if (this.inputField.value.startsWith('/')) {
        processCommand(this.inputField.value);
      } else {
        sendServerData(JSON.stringify({
          type: MESSAGE_TYPES.CHAT,
          data: this.inputField.value,
        }));
      }

      this.inputField.value = PLACEHOLDER_TEXT;
      this.inputField.blur();
      this.isFocused = false;

      setCanPlayerMove(true);
    }
  }

  #drawChatWindow(ctx) {
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.transform.x, this.transform.y, document.documentElement.clientWidth, this.dimensions.height);
  }

  #drawChatText(ctx) {
    ctx.fillStyle = 'white';
    for (let i = 0; i < this.chatLog.childNodes.length; i++) {
      ctx.fillText(
        this.chatLog.childNodes[i].textContent,
        this.transform.x + this.chatLogOffset.x,
        this.transform.y + this.chatLogOffset.y + i * 20
      );
    }
  }

  #drawChatTextBox(ctx) {
    ctx.fillStyle = this.isFocused ? 'white' : 'gray';
    ctx.font = '16px Abel Regular';
    ctx.fillText(this.inputField.value, this.transform.x + this.inputOffset.x, this.transform.y + this.inputOffset.y);

    ctx.beginPath();
    ctx.moveTo(this.transform.x, this.transform.y + this.inputFocusLineOffset);
    ctx.lineTo(document.documentElement.clientWidth, this.transform.y + this.inputFocusLineOffset);
    ctx.strokeStyle = this.isFocused ? '#aaa' : '#444';
    ctx.stroke();
    ctx.closePath();
  }
}
