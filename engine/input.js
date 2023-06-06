import { canvas } from './draw.js';

import { Collider } from '../components/collider.js';

const mouseCollider = new Collider(0, 0, 0, 0);

const inputMeta = {
  canMove: true,
};

const input = {
  pressedKeys: {},
  mousePos: { x: 0, y: 0 },
  mouseDelta: { x: 0, y: 0 },
  isMouseClicked: false,
  isMouseDragging: false,
  wheelDelta: { x: 0, y: 0 },
};

export function setupInput() {
  document.addEventListener('mousemove', (evt) => {
    input.isMouseDragging = input.isMouseClicked;

    input.mousePos.x = evt.x;
    input.mousePos.y = evt.y;

    input.mouseDelta.x = evt.movementX;
    input.mouseDelta.y = evt.movementY;
  });

  document.addEventListener('mousedown', () => input.isMouseClicked = true);
  document.addEventListener('mouseup', () => input.isMouseClicked = false);

  document.addEventListener('keydown', (evt) => {
    if (
      evt.key === 'ArrowUp' ||
      evt.key === 'ArrowRight' ||
      evt.key === 'ArrowDown' ||
      evt.key === 'ArrowLeft' ||
      evt.key === 'Meta' ||
      evt.key === 'Control'
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

  window.addEventListener('gamepadconnected', () => {
    console.log('gamepad connected');
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

export function getMouseMovementDelta() {
  return {
    x: input.mouseDelta.x,
    y: input.mouseDelta.y,
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

export function isMouseDragging() {
  return input.isMouseDragging;
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
