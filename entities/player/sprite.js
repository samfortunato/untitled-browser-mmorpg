import { Sprite } from '../../components/sprite.js';

import { DIRECTIONS } from '../../constants/directions.js';
import { STATES } from './states.js';

export class PlayerSprite extends Sprite {
  crops = {
    [STATES.IDLE]: {
      [DIRECTIONS.UP]: [
        [0, 0, 24, 32],
        [24, 0, 24, 32],
        [48, 0, 24, 32],
      ],
      [DIRECTIONS.RIGHT]: [
        [0, 32, 24, 32],
        [24, 32, 24, 32],
        [48, 32, 24, 32],
      ],
      [DIRECTIONS.DOWN]: [
        [0, 64, 24, 32],
        [24, 64, 24, 32],
        [48, 64, 24, 32],
      ],
      [DIRECTIONS.LEFT]: [
        [0, 96, 24, 32],
        [24, 96, 24, 32],
        [48, 96, 24, 32],
      ],
    },
    [STATES.CROUCHING]: {
      [DIRECTIONS.UP]: [
        [0, 0, 24, 32],
        [24, 0, 24, 32],
        [48, 0, 24, 32],
      ],
      [DIRECTIONS.RIGHT]: [
        [0, 32, 24, 32],
        [24, 32, 24, 32],
        [48, 32, 24, 32],
      ],
      [DIRECTIONS.DOWN]: [
        [0, 64, 24, 32],
        [24, 64, 24, 32],
        [48, 64, 24, 32],
      ],
      [DIRECTIONS.LEFT]: [
        [0, 96, 24, 32],
        [24, 96, 24, 32],
        [48, 96, 24, 32],
      ],
    },
    [STATES.WALKING]: {
      [DIRECTIONS.UP]: [
        [0, 0, 24, 32],
        [24, 0, 24, 32],
        [48, 0, 24, 32],
      ],
      [DIRECTIONS.RIGHT]: [
        [0, 32, 24, 32],
        [24, 32, 24, 32],
        [48, 32, 24, 32],
      ],
      [DIRECTIONS.DOWN]: [
        [0, 64, 24, 32],
        [24, 64, 24, 32],
        [48, 64, 24, 32],
      ],
      [DIRECTIONS.LEFT]: [
        [0, 96, 24, 32],
        [24, 96, 24, 32],
        [48, 96, 24, 32],
      ],
    },
    [STATES.RUNNING]: {
      [DIRECTIONS.UP]: [
        [72, 0, 24, 32],
        [96, 0, 24, 32],
        [120, 0, 24, 32],
      ],
      [DIRECTIONS.RIGHT]: [
        [72, 32, 24, 32],
        [96, 32, 24, 32],
        [120, 32, 24, 32],
      ],
      [DIRECTIONS.DOWN]: [
        [72, 64, 24, 32],
        [96, 64, 24, 32],
        [120, 64, 24, 32],
      ],
      [DIRECTIONS.LEFT]: [
        [72, 96, 24, 32],
        [96, 96, 24, 32],
        [120, 96, 24, 32],
      ],
    },
    [STATES.JUMPING]: {
      [DIRECTIONS.UP]: [
        [72, 0, 24, 32],
        [96, 0, 24, 32],
        [120, 0, 24, 32],
      ],
      [DIRECTIONS.RIGHT]: [
        [72, 32, 24, 32],
        [96, 32, 24, 32],
        [120, 32, 24, 32],
      ],
      [DIRECTIONS.DOWN]: [
        [72, 64, 24, 32],
        [96, 64, 24, 32],
        [120, 64, 24, 32],
      ],
      [DIRECTIONS.LEFT]: [
        [72, 96, 24, 32],
        [96, 96, 24, 32],
        [120, 96, 24, 32],
      ],
    },
  };

  frames = {
    [STATES.IDLE]: [1],
    [STATES.CROUCHING]: [1],
    [STATES.WALKING]: [0, 1, 2, 1],
    [STATES.RUNNING]: [0, 1, 2, 1],
    [STATES.JUMPING]: [1],
  };

  direction = 0;
  state = 0;

  frameSwitchIntervals = {
    [STATES.IDLE]: 1,
    [STATES.CROUCHING]: 1,
    [STATES.WALKING]: 8,
    [STATES.RUNNING]: 6,
    [STATES.JUMPING]: 1,
  }

  xOffset = -10;

  constructor() {
    super();

    this.setSprite('player');
  }

  step(direction, state) {
    // if (this.state === STATES.CROUCHING) this.state = 0;
    // if (this.state === STATES.JUMPING) this.state = 0;
    if (this.state === STATES.WALKING) {
      // debugger;
    }

    this.direction = direction;
    this.state = state;
    this.tick++;

    // every 20 frames, switch animation frame
    if (this.tick % this.frameSwitchIntervals[this.state] === 0) {
      this.currentFrame = this.currentFrame + 1;
    }

    // reset current frame to first frame in animation, if we are at the end of the animation,
    //   but going to the next frame?
    if (this.currentFrame >= this.frames[this.state].length) {
      this.currentFrame = 0;
    }

    // set tick back to 0 once you reach the last frame of the current animation
    if (this.frames[this.state].length * this.frameSwitchIntervals[this.state] === this.tick) {
      this.tick = 0;
    }
  }

  getCurrentFrame() {
    return this.crops[this.state][this.direction][this.frames[this.state][this.currentFrame]];
  }
}
