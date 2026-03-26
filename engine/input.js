import { canvas } from './draw.js';

import { Collider } from '../components/collider.js';

import { isWithinBoundsOf } from '../utils/collision.js';
import { KeyboardShortcutManager } from './keyboard-shortcut-manager.js';

export const CONTROLS = {
  CONFIRM: 'Enter',
  CONFIRM_ALT: 'KeyX',
  CANCEL: 'Escape',
  MOVE_UP: 'ArrowUp',
  MOVE_RIGHT: 'ArrowRight',
  MOVE_DOWN: 'ArrowDown',
  MOVE_LEFT: 'ArrowLeft',
  MOVE_UP_ALT: 'KeyW',
  MOVE_RIGHT_ALT: 'KeyD',
  MOVE_DOWN_ALT: 'KeyS',
  MOVE_LEFT_ALT: 'KeyA',
  JUMP: 'Space',
  CROUCH_1: 'MetaLeft',
  CROUCH_2: 'MetaRight',
  CROUCH_3: 'ControlLeft',
  CROUCH_4: 'ControlRight',
  RUN_1: 'ShiftLeft',
  RUN_2: 'ShiftRight',
  ATTACK: 'Enter',
}

const mouseCollider = new Collider(0, 0, 0, 0);

const input = {
  pressedKeys: {},
  justPressed: new Set(),
  mousePos: { x: 0, y: 0 },
  mouseDelta: { x: 0, y: 0 },
  isMouseClicked: false,
  isMouseDragging: false,
  wheelDelta: { x: 0, y: 0 },
  hasInteracted: false,
};

let _wantsPointer = false;

export function requestPointerCursor() {
  _wantsPointer = true;
}

export class InputManager {
  static update() {
    document.body.style.cursor = _wantsPointer ? 'pointer' : 'default';
    _wantsPointer = false;
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
      evt.code === 'ArrowUp' ||
      evt.code === 'ArrowRight' ||
      evt.code === 'ArrowDown' ||
      evt.code === 'ArrowLeft' ||
      evt.code === 'MetaLeft' ||
      evt.code === 'MetaRight' ||
      evt.code === 'ControlLeft' ||
      evt.code === 'ControlRight'
    ) {
      evt.preventDefault();
    }

    if (!input.pressedKeys[evt.code]) {
      input.justPressed.add(evt.code);
    }

    input.pressedKeys[evt.code] = true;
  });

  document.addEventListener('keyup', (evt) => {
    input.pressedKeys[evt.code] = false;
  });

  canvas.addEventListener('wheel', (evt) => {
    evt.preventDefault();

    input.wheelDelta.y = evt.deltaY;

    setTimeout(() => input.wheelDelta.y = 0, 50);
  });

  window.addEventListener('gamepadconnected', () => {
    console.log('gamepad connected');
  });
}

export function clearJustPressed() {
  input.justPressed.clear();
}

export function isJustPressed(code) {
  return input.justPressed.has(code);
}

export function isKeyPressed(code) {
  return input.pressedKeys[code] === true;
}

export function areKeysPressed(...codes) {
  return codes.some(code => input.pressedKeys[code] === true);
}

export function isConfirmKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.CONFIRM] ||
    input.pressedKeys[CONTROLS.CONFIRM_ALT]
  );
}

export function isCancelKeyPressed() {
  return input.pressedKeys[CONTROLS.CANCEL];
}

export function isCrouchKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.CROUCH_1] ||
    input.pressedKeys[CONTROLS.CROUCH_2] ||
    input.pressedKeys[CONTROLS.CROUCH_3] ||
    input.pressedKeys[CONTROLS.CROUCH_4]
  );
}

export function isAMovementKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.MOVE_UP] ||
    input.pressedKeys[CONTROLS.MOVE_RIGHT] ||
    input.pressedKeys[CONTROLS.MOVE_DOWN] ||
    input.pressedKeys[CONTROLS.MOVE_LEFT] ||
    input.pressedKeys[CONTROLS.MOVE_UP_ALT] ||
    input.pressedKeys[CONTROLS.MOVE_RIGHT_ALT] ||
    input.pressedKeys[CONTROLS.MOVE_DOWN_ALT] ||
    input.pressedKeys[CONTROLS.MOVE_LEFT_ALT]
  );
}

export function isRunKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.RUN_1] ||
    input.pressedKeys[CONTROLS.RUN_2]
  );
}

export function isJumpKeyPressed() {
  return input.pressedKeys[CONTROLS.JUMP];
}

export function isMovementUpKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.MOVE_UP] ||
    input.pressedKeys[CONTROLS.MOVE_UP_ALT]
  );
}

export function isMovementRightKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.MOVE_RIGHT] ||
    input.pressedKeys[CONTROLS.MOVE_RIGHT_ALT]
  );
}

export function isMovementDownKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.MOVE_DOWN] ||
    input.pressedKeys[CONTROLS.MOVE_DOWN_ALT]
  );
}

export function isMovementLeftKeyPressed() {
  return (
    input.pressedKeys[CONTROLS.MOVE_LEFT] ||
    input.pressedKeys[CONTROLS.MOVE_LEFT_ALT]
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

export class Input {
  state = {};
}
