import http from 'http';

import { users } from '../data/users.js';

/**
 * @param {http.IncomingMessage} _req
 * @param {http.ServerResponse} res
 * @param {any} body
 */
export function login(_req, res, body) {
	for (const [id, user] of users) {
		if (user.email === body.email && user.password == body.password) {
			res.end(JSON.stringify({ id }));

			break;
		}
	}
}
