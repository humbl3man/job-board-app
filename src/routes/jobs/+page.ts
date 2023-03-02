import type { PageLoad } from './$types';

import jobsJSON from '../../lib/seedData/jobs.json';

export const load = (async () => {
	return { jobs: jobsJSON };
}) satisfies PageLoad;
