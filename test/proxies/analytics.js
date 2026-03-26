import { describe, expect, it } from '../../modules/test/index.js';

import { AnalyticsProxy } from '../../proxies/analytics.js';

// TODO: finish

describe('AnalyticsProxy', () => {
	it('initializes analytics', () => {
		AnalyticsProxy.init();

		expect('blah').toWork();
	});
});
