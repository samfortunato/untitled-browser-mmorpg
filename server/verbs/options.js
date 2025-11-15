import http from 'http';

/**
 * @param {http.IncomingMessage} _req
 * @param {http.ServerResponse} _res
 * @param {() => void} handle
 */
export function options(_req, _res, handle) {
	handle();
}
