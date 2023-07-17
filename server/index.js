import { WebSocketServer } from 'ws';

import { MESSAGE_TYPES } from './constants.js';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws, request) => {
  console.log('connected');

  ws.on('message', (data) => {
    const parsed = JSON.parse(data.toString());

    switch (parsed.type) {
      case MESSAGE_TYPES.META: {
        console.info(parsed.data);

        break;
      }

      case MESSAGE_TYPES.CHAT: {
        console.log(parsed.data);

        ws.send(data.toString());

        break;
      }

      default: break;
    }
  });

  ws.on('error', console.error);
});
