import http from 'http';

/**
 * @param {http.IncomingMessage} _req
 * @param {http.ServerResponse} res
 * @param {any} _body
 */
export function unauthorize(_req, res, _body) {
	res.statusCode = 401;

	res.end(JSON.stringify({ error: 'Invalid' }));
}
