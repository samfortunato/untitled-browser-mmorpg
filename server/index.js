import { createServer } from 'http';
import express from 'express';
import { WebSocketServer } from 'ws';
import bcrypt from "bcrypt";
import Database from 'better-sqlite3';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const db = new Database('./data/main.db');
const app = express();
const server = createServer(app);
const webSocketServer = new WebSocketServer({ server });

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
  socket.on('message', (data) => {
    socket.send(data);
  });
});

server.listen(3000);
