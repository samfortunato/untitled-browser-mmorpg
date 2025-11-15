import http from 'http';
import WebSocket from 'ws';

/**
 * @param {WebSocket} ws
 * @param {http.IncomingMessage} _req
 * @param {any} data
 */
export function parseChat(ws, _req, data) {
	ws.send(JSON.stringify(data));
}
