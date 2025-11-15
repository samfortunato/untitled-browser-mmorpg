import http from 'http';
import WebSocket from 'ws';

/**
 * @param {WebSocket} _ws
 * @param {http.IncomingMessage} _req
 * @param {any} data
 */
export function parseMeta(_ws, _req, data) {
	console.info(data.data);
}
