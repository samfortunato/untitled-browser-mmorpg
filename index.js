import { _0x343a } from './lock.js';

import { Game } from './engine/game.js';

const game = new Game();

function run(currentTimeAtStartOfFrame) {
  game.update(currentTimeAtStartOfFrame);
  game.draw();

  requestAnimationFrame(run);
}

run();
