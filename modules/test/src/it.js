/**
 * @param {string} description
 * @param {() => void} test
 */
export function it(description, test) {
	try {
		test();
	} catch (error) {
		console.error(`${description} X`);
	}

	console.info(`${description} ✓`);
}
