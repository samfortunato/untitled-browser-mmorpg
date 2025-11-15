import http from 'http';

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} _res
 * @param {(body: any) => void} handle
 */
export function post(req, _res, handle) {
	let body = ''

	req.on('data', chunk => body += chunk);

	req.on('end', () => handle(body));
}
