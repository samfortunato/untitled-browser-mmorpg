import { canvas } from './draw.js';

import { Collider } from '../components/collider.js';

import { isWithinBoundsOf } from '../utils/collision.js';
import { KeyboardShortcutManager } from './keyboard-shortcut-manager.js';

export const CONTROLS = {
  CONFIRM_1: 'Enter',
  CONFIRM_2: 'x',
  CONFIRM_3: 'X',
  CANCEL: 'Escape',
  MOVE_UP_1: 'ArrowUp',
  MOVE_RIGHT_1: 'ArrowRight',
  MOVE_DOWN_1: 'ArrowDown',
  MOVE_LEFT_1: 'ArrowLeft',
  MOVE_UP_2: 'w',
  MOVE_RIGHT_2: 'a',
  MOVE_DOWN_2: 's',
  MOVE_LEFT_2: 'd',
  MOVE_UP_3: 'W',
  MOVE_RIGHT_3: 'A',
  MOVE_DOWN_3: 'S',
  MOVE_LEFT_3: 'D',
  JUMP: ' ',
  CROUCH_1: 'Meta',
  CROUCH_2: 'Control',
  RUN: 'Shift',
  ATTACK: 'Enter',
}

const mouseCollider = new Collider(0, 0, 0, 0);

const input = {
  pressedKeys: {},
  mousePos: { x: 0, y: 0 },
  mouseDelta: { x: 0, y: 0 },
  isMouseClicked: false,
  isMouseDragging: false,
  wheelDelta: { x: 0, y: 0 },
  hasInteracted: false,
};

export class InputManager {
  static update() {
    KeyboardShortcutManager.update();
  }
}

export function setupInput() {
  document.addEventListener('mousemove', (evt) => {
    input.isMouseDragging = input.isMouseClicked;

    input.mousePos.x = evt.x;
    input.mousePos.y = evt.y;

    input.mouseDelta.x = evt.movementX;
    input.mouseDelta.y = evt.movementY;
  });

  document.addEventListener('mousedown', () => {
    if (!input.hasInteracted) input.hasInteracted = true;

    input.isMouseClicked = true;
  });

  document.addEventListener('mouseup', () => input.isMouseClicked = false);

  document.addEventListener('keydown', (evt) => {
    if (!input.hasInteracted) input.hasInteracted = true;

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
  return input.pressedKeys[key] === true;
}

export function areKeysPressed(...keys) {
  return keys.some(key => input.pressedKeys[key] === true);
}

export function isConfirmKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.CONFIRM_1] ||
    input.pressedKeys[CONTROLS.CONFIRM_2] ||
    input.pressedKeys[CONTROLS.CONFIRM_3]
  );
}

export function isCancelKeyPressed() {
  return input.pressedKeys[CONTROLS.CANCEL];
}

export function isCrouchKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.CROUCH_1] ||
    input.pressedKeys[CONTROLS.CROUCH_2]
  );
}

export function isAMovementKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.MOVE_UP_1] ||
    input.pressedKeys[CONTROLS.MOVE_RIGHT_1] ||
    input.pressedKeys[CONTROLS.MOVE_DOWN_1] ||
    input.pressedKeys[CONTROLS.MOVE_LEFT_1] ||
    input.pressedKeys[CONTROLS.MOVE_UP_2] ||
    input.pressedKeys[CONTROLS.MOVE_RIGHT_2] ||
    input.pressedKeys[CONTROLS.MOVE_DOWN_2] ||
    input.pressedKeys[CONTROLS.MOVE_LEFT_2] ||
    input.pressedKeys[CONTROLS.MOVE_UP_3] ||
    input.pressedKeys[CONTROLS.MOVE_RIGHT_3] ||
    input.pressedKeys[CONTROLS.MOVE_DOWN_3] ||
    input.pressedKeys[CONTROLS.MOVE_LEFT_3]
  );
}

export function isRunKeyPressed() {
  return input.pressedKeys[CONTROLS.RUN];
}

export function isJumpKeyPressed() {
  return input.pressedKeys[CONTROLS.JUMP];
}

export function isMovementUpKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.MOVE_UP_1] ||
    input.pressedKeys[CONTROLS.MOVE_UP_2] ||
    input.pressedKeys[CONTROLS.MOVE_UP_3]
  );
}

export function isMovementRightKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.MOVE_RIGHT_1] ||
    input.pressedKeys[CONTROLS.MOVE_RIGHT_2] ||
    input.pressedKeys[CONTROLS.MOVE_RIGHT_3]
  );
}

export function isMovementDownKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.MOVE_DOWN_1] ||
    input.pressedKeys[CONTROLS.MOVE_DOWN_2] ||
    input.pressedKeys[CONTROLS.MOVE_DOWN_3]
  );
}

export function isMovementLeftKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.MOVE_LEFT_1] ||
    input.pressedKeys[CONTROLS.MOVE_LEFT_2] ||
    input.pressedKeys[CONTROLS.MOVE_LEFT_3]
  );
}

export function isAttackKeyPressed() {
  return input.pressedKeys[CONTROLS.ATTACK];
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

export function didClickWithinBounds(bounds) {
  return isMouseClicked() && isWithinBoundsOf(bounds, getMouseBounds());
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

export function getHasInteracted() {
  return input.hasInteracted;
}
