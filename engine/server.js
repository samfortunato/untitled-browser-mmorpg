import { MESSAGE_TYPES } from '../server/constants.js';

import { addLatestChat } from './chat.js';
import { spawnOtherPlayer, updateOtherPlayer, updateOtherPlayerUsername, removeOtherPlayer } from './other-players.js';

const CHANNEL_URL = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`;

/** @type {WebSocket} */
let channel;
let currentPlayerId = null;

export function setupServerConnection() {
  channel = new WebSocket(CHANNEL_URL);

  channel.addEventListener('open', onOpen);
  channel.addEventListener('message', onMessage);
}

export function sendServerData(data) {
  if (channel.readyState === WebSocket.OPEN) {
    channel.send(data);
  }
}

function onOpen() {
  channel.send(JSON.stringify({
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
