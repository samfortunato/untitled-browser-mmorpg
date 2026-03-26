import { MESSAGE_TYPES } from '../server/constants.js';

import { addLatestChat } from './chat.js';
import { spawnOtherPlayer, updateOtherPlayer, updateOtherPlayerUsername, removeOtherPlayer } from './other-players.js';

const WEB_SOCKET_URL = location.hostname === 'localhost' ?
  'ws://localhost:3000' :
  'wss://untitled-browser-mmorpg.fly.dev';

/** @type {WebSocket} */
let ws;
let currentPlayerId = null;

export function setupServerConnection() {
  ws = new WebSocket(WEB_SOCKET_URL);

  ws.addEventListener('open', onOpen);
  ws.addEventListener('message', onMessage);
}

export function sendServerData(data) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(data);
  }
}

function onOpen() {
  ws.send(JSON.stringify({
    type: MESSAGE_TYPES.META,
    data: localStorage.getItem('username'),
  }));
}

function onMessage(data) {
  const parsed = JSON.parse(data.data);

  switch (parsed.type) {
    case 'players': {
      currentPlayerId = parsed.currentPlayerId;
      for (const player of parsed.players) {
        if (player.id !== currentPlayerId) {
          spawnOtherPlayer(player);
        }
      }
      break;
    }

    case 'newPlayerJoined': {
      spawnOtherPlayer(parsed.player);
      break;
    }

    case 'updatePlayerPosition': {
      if (parsed.player.id !== currentPlayerId) {
        updateOtherPlayer(parsed.player);
      }
      break;
    }

    case 'playerIsGone': {
      removeOtherPlayer(parsed.id);
      break;
    }

    case 'playerUsernameUpdate': {
      updateOtherPlayerUsername(parsed.id, parsed.username);
      break;
    }

    case 'chatMessage': {
      addLatestChat(parsed.data);
      break;
    }

    default: break;
  }
}
