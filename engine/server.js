import { MESSAGE_TYPES } from '../server/constants.js';

import { addLatestChat } from './chat.js';

const WEB_SOCKET_URL = location.hostname === 'localhost' ?
  'ws://localhost:3000' :
  'ws://54.86.247.74:3000';

/** @type {WebSocket} */
let ws;

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
    data: 'client messaging ok',
  }));
}

function onMessage(data) {
  const parsed = JSON.parse(data.data);

  switch (parsed.type) {
    case MESSAGE_TYPES.CHAT: {
      addLatestChat(parsed.data);

      break;
    }

    default: break;
  }
}
