import { VIEWPORT_W, VIEWPORT_H } from '../constants/draw.js';

export const canvas = document.createElement('canvas');

canvas.width = VIEWPORT_W * devicePixelRatio;
canvas.height = VIEWPORT_H * devicePixelRatio;
canvas.style.width = `${VIEWPORT_W}px`;
canvas.style.height = `${VIEWPORT_H}px`;

document.body.append(canvas);

export const ctx = canvas.getContext('2d');

ctx?.scale(devicePixelRatio, devicePixelRatio);

export function initializeScreen() {
  ctx.imageSmoothingEnabled = false;
  ctx?.clearRect(0, 0, VIEWPORT_W, VIEWPORT_H);

  ctx.fillStyle = 'grey';
  ctx?.fillRect(0, 0, VIEWPORT_W, VIEWPORT_H);

  ctx.textBaseline = 'top';
}

export function getScreenWidth() {
  return VIEWPORT_W;
}

export function getScreenHeight() {
  return VIEWPORT_H;
}

export function getScreenDimensions() {
  return { w: VIEWPORT_W, h: VIEWPORT_H };
}
