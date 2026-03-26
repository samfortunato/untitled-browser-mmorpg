import { describe, expect, it } from '../../modules/test/index.js';

import { Id } from '../../components/id.js';

describe('Id', () => {
	it('should have a value', () => {
		const actual = new Id();

		expect(actual.value).toBeTruthy();
	});

	it('should have a value that is a symbol', () => {
		const actual = new Id();

		expect(typeof actual.value).toEqual('symbol');
	});

	it('should optionally be able to take a string for the ID\'s symbol\'s description', () => {
		const description = 'foo';
		const actual = new Id(description);

		expect(actual.value.description).toEqual(description);
	});
});
