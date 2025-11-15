import http from 'http';
import { randomUUID } from 'crypto';

import { users } from '../data/users.js';

/**
 * @param {http.IncomingMessage} _req
 * @param {http.ServerResponse} res
 * @param {any} body
 */
export function register(_req, res, body) {
	const userId = randomUUID();

	users.set(userId, { email: body.email, password: body.password });

	res.end(JSON.stringify({ id: userId }));
}
