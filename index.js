import { ctx } from './engine/draw.js';

import { Game } from './engine/game.js';

const game = new Game();

function run(timeDifference) {
  game.update(timeDifference);
  game.draw(ctx);

  requestAnimationFrame(run);
}

run();
