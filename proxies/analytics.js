import posthog from 'posthog-js';

export class AnalyticsProxy {
	static init() {
		posthog.init('phc_XdKWcnPsy2aMJuCwx2Yfeg0qzNewdcK3PfiXDFsRSgF',
			{
				api_host: 'https://us.i.posthog.com',
				person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
			}
		);
	}
}
