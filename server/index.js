import { createServer } from 'http';
import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import bcrypt from "bcrypt";
import Database from 'better-sqlite3';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const db = new Database('./data/main.db');
const app = express();
const server = createServer(app);
const webSocketServer = new WebSocketServer({ server });
const players = new Map();

db.exec(`
  create table if not exists users (
    id integer primary key autoincrement,
    username text unique not null,
    email text unique not null,
    password_digest text not null
  );
`);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

app.use(express.static('.'));
app.use(express.json());

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const digest = await bcrypt.hash(password, 10);

  db.prepare(`
    insert into users (username, email, password_digest)
    values (?, ?, ?)
  `).run(
    username,
    email,
    digest,
  );

  res.json({ wasRegistered: true });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = db.prepare(`
    select *
    from users
    where username = ?
  `).get(
    username,
  );

  const doesPasswordMatch = await bcrypt.compare(password, user.password_digest);

  if (user && doesPasswordMatch) {
    const sessionToken = jwt.sign({ username }, process.env.AUTH_SECRET);

    res.json({ sessionToken });
  }
});

webSocketServer.on('connection', (socket) => {
  console.log('websocket connected');

  const clientId = crypto.randomUUID();
  const newPlayer = { id: clientId, x: 0, y: 0, z: 0, direction: 2, state: 0, username: '' };
  players.set(socket, newPlayer);

  socket.send(JSON.stringify({
    type: 'players',
    currentPlayerId: clientId,
    players: Array.from(players.values()),
  }));

  webSocketServer.clients.forEach((client) => {
    if (client !== socket && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'newPlayerJoined',
        player: newPlayer,
      }));
    }
  });

  socket.on('message', (data) => {
    console.log('websocket message', data.toString());

    const message = JSON.parse(data.toString());

    if (message.type === 0) { // META — store username
      const player = players.get(socket);
      if (player) {
        player.username = message.data;
        webSocketServer.clients.forEach((client) => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              type: 'playerUsernameUpdate',
              id: player.id,
              username: player.username,
            }));
          }
        });
      }
    }

    if (message.type === 'playerMove') {
      const player = players.get(socket);

      player.x = message.x;
      player.y = message.y;
      player.z = message.z;
      player.direction = message.direction;
      player.state = message.state;

      webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'updatePlayerPosition',
            player,
          }));
        }
      });
    }

    if (message.type === 'chatMessage') {
      webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data.toString());
        }
      });
    }
  });

  socket.on('close', () => {
    const player = players.get(socket);

    players.delete(socket);

    webSocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'playerIsGone',
          id: player.id,
        }));
      }
    });
  });
});

server.listen(process.env.PORT || 3000);
