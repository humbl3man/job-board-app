import { fail } from '@sveltejs/kit';
import type { PageLoad } from '../$types';
import jobs from '../../../lib/seedData/jobs.json';

export const load = (async ({ params }) => {
	const detail = jobs.find((job) => job.id === params.id);

	if (!detail) {
		throw fail(404, {});
	}

	return {
		detail: jobs.find((job) => job.id === params.id)
	};
}) satisfies PageLoad;
