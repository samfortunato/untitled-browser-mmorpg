import { isKeyPressed, requestPointerCursor, getMousePos } from '../../../engine/input.js';
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
  scrollOffset = 0;
  #indicatorBounds = null;

  get #lineHeight() { return 20; }
  get #maxVisible() { return Math.floor((this.dimensions.height - this.chatLogOffset.y) / this.#lineHeight); }

  constructor() {
    super();

    this.transform.y = document.documentElement.clientHeight - this.dimensions.height;

    this.#initializeInputField();
    this.#initializeChatLog();

    document.addEventListener('wheel', (e) => {
      const max = Math.max(0, this.chatLog.childNodes.length - this.#maxVisible);
      if (e.deltaY < 0) {
        this.scrollOffset = Math.min(this.scrollOffset + 1, max);
      } else {
        this.scrollOffset = Math.max(this.scrollOffset - 1, 0);
      }
    });

    document.addEventListener('click', (e) => {
      if (this.#indicatorBounds && this.#hitTest(e.clientX, e.clientY)) {
        this.scrollOffset = 0;
      }
    });
  }

  #hitTest(x, y) {
    const b = this.#indicatorBounds;
    return x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
  }

  update(dt) {
    const latestChat = getLatestChat();
    if (latestChat) this.#logChat(latestChat);

    if (this.#indicatorBounds) {
      const { x, y } = getMousePos();
      if (this.#hitTest(x, y)) requestPointerCursor();
    }

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

  #logChat(messageInfo) {
    const newChat = document.createElement('li');
    newChat.textContent = `${messageInfo.username}: ${messageInfo.message}`;

    this.chatLog.append(newChat);

    if (this.scrollOffset === 0) return;
    // keep the view locked if user has scrolled up
    this.scrollOffset = Math.min(this.scrollOffset + 1, Math.max(0, this.chatLog.childNodes.length - this.#maxVisible));
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
    if (!this.isFocused && isKeyPressed('KeyT')) {
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
          type: 'chatMessage',
          data: {
            username: localStorage.getItem('username'),
            message: this.inputField.value,
          },
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
    const total = this.chatLog.childNodes.length;
    const end = total - this.scrollOffset;
    const start = Math.max(0, end - this.#maxVisible);

    ctx.fillStyle = 'white';
    for (let i = start; i < end; i++) {
      ctx.fillText(
        this.chatLog.childNodes[i].textContent,
        this.transform.x + this.chatLogOffset.x,
        this.transform.y + this.chatLogOffset.y + (i - start) * this.#lineHeight
      );
    }

    if (this.scrollOffset > 0) {
      ctx.font = '12px Abel Regular';
      ctx.textAlign = 'right';

      const text = `↓ ${this.scrollOffset} newer`;
      const tx = this.transform.x + document.documentElement.clientWidth - 16;
      const ty = this.transform.y + this.inputFocusLineOffset + 16;
      const metrics = ctx.measureText(text);
      const tw = metrics.width;
      const pad = 4;
      const ascent = metrics.actualBoundingBoxAscent ?? 10;
      const descent = metrics.actualBoundingBoxDescent ?? 2;

      this.#indicatorBounds = { x: tx - tw - pad, y: ty - ascent - pad, w: tw + pad * 2, h: ascent + descent + pad * 2 };

      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fillText(text, tx, ty);
      ctx.textAlign = 'start';
    } else {
      this.#indicatorBounds = null;
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
