import { canvas } from './draw.js';

import { Collider } from '../components/collider.js';

const mouseCollider = new Collider(0, 0, 0, 0);

const inputMeta = {
  canMove: true,
};

const input = {
  pressedKeys: {},
  mousePos: { x: 0, y: 0 },
  isMouseClicked: false,
  wheelDelta: { x: 0, y: 0 },
};

export function setupInput() {
  document.addEventListener('mousemove', (evt) => {
    input.mousePos.x = evt.x;
    input.mousePos.y = evt.y;
  });

  document.addEventListener('mousedown', () => input.isMouseClicked = true);
  document.addEventListener('mouseup', () => input.isMouseClicked = false);

  document.addEventListener('keydown', (evt) => {
    if (
      evt.key === 'ArrowUp' ||
      evt.key === 'ArrowRight' ||
      evt.key === 'ArrowDown' ||
      evt.key === 'ArrowLeft'
    ) {
      evt.preventDefault();
    }

    input.pressedKeys[evt.key] = true;
  });

  document.addEventListener('keyup', ({ key }) => input.pressedKeys[key] = false);

  canvas.addEventListener('wheel', (evt) => {
    evt.preventDefault();

    input.wheelDelta.y = evt.deltaY;

    setTimeout(() => input.wheelDelta.y = 0, 50);
  });
}

export function isKeyPressed(key) {
  return input.pressedKeys[key];
}

export function getMousePos() {
  return {
    x: input.mousePos.x,
    y: input.mousePos.y,
  };
}

function getMouseCollider() {
  return { ...mouseCollider };
}

export function getMouseBounds() {
  return {
    ...getMousePos(),
    ...getMouseCollider(),
  };
}

export function isMouseClicked() {
  return input.isMouseClicked;
}

export function getWheelDelta() {
  return {
    x: input.wheelDelta.x,
    y: input.wheelDelta.y,
  };
}

export function setCanPlayerMove(canPlayerMove) {
  inputMeta.canMove = canPlayerMove;
}

export function getCanPlayerMove() {
  return inputMeta.canMove;
}
