import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const jobs = await db.job.findMany({
		select: {
			id: true,
			title: true,
			company: true
		}
	});

	return { jobs };
}) satisfies PageServerLoad;
