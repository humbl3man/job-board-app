import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const jobs = await db.job.findMany({
		select: {
			id: true,
			company: true,
			title: true,
			category: true,
			salary: true,
			createdAt: true,
			updatedAt: true,
			location: true,
			type: true
		},
		orderBy: [
			{
				createdAt: 'asc'
			},
			{
				salary: 'desc'
			}
		]
	});
	return {
		jobs
	};
};
