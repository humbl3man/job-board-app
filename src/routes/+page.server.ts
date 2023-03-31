import { db } from '$lib/db';

export async function load() {
	const jobs = await db.job.findMany({
		select: {
			id: true,
			title: true,
			company: true
		}
	});

	return { jobs };
}
