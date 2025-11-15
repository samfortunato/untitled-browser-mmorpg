import http from 'http';
import { WebSocketServer } from 'ws';

import { options } from './verbs/options.js';
import { post } from './verbs/post.js';

import { allow } from './engine/allow.js';
import { respond } from './engine/respond.js';
import { act } from './engine/act.js';

const server = http.createServer((req, res) => {
  allow(res);

  if (req.method === 'OPTIONS') {
    options(req, res, () => {
      res.end();
    });
  }

  if (req.method === 'POST') {
    post(req, res, (body) => {
      const parsed = JSON.parse(body);

      res.setHeader('Content-Type', 'application/json');

      respond(req, res, parsed);
    });
  }
});

const webSocketServer = new WebSocketServer({ server });

webSocketServer.on('connection', (ws, req) => {
  ws.on('message', (data) => {
    const parsed = JSON.parse(data.toString());

    act(ws, req, parsed);
  });

  ws.on('error', console.error);
});

server.listen(3000);
