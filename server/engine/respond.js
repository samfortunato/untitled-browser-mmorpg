import http from 'http';

import { register } from '../routes/register.js';
import { login } from '../routes/login.js';

import { unauthorize } from '../routes/unauthorize.js';

const URLS_TO_ROUTES = {
	'/register': register,
	'/login': login,
};

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {any} body
 */
export function respond(req, res, body) {
	const handle = URLS_TO_ROUTES[req.url] || unauthorize;

	handle(req, res, body);
}
