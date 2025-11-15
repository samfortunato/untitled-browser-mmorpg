import http from 'http';
import WebSocket from 'ws';

import { parseMeta } from '../messages/meta.js';
import { parseChat } from '../messages/chat.js';
import { parseDefault } from '../messages/default.js';

import { MESSAGE_TYPES } from '../constants.js';

const MESSAGE_TYPES_TO_ACTIONS = {
	[MESSAGE_TYPES.META]: parseMeta,
	[MESSAGE_TYPES.CHAT]: parseChat,
};

/**
 * @param {WebSocket} ws
 * @param {http.IncomingMessage} req
 * @param {any} data
 */
export function act(ws, req, data) {
	const handle = MESSAGE_TYPES_TO_ACTIONS[data.type] || parseDefault;

	handle(ws, req, data);
}
