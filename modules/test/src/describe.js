/**
 * @param {string} description
 * @param {() => void} run
 */
export function describe(description, run) {
	console.info(`\n${description}:\n`);

	run();
}
