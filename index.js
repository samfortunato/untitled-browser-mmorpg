import { Game } from './engine/game.js';

if (!localStorage.getItem('session_token')) {
   window.location.href = './login.html';
}

const game = new Game();

function run(currentTimeAtStartOfFrame) {
  game.update(currentTimeAtStartOfFrame);
  game.draw();

  requestAnimationFrame(run);
}

run();
