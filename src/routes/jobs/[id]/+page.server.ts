import { error } from '@sveltejs/kit';
import { db } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const jobDetails = await db.job.findUnique({
		where: {
			id: Number(params.id)
		},
		select: {
			title: true,
			description: true,
			salary: true,
			company: true,
			category: true
		}
	});

	if (!jobDetails) {
		throw error(404, 'job not found');
	}

	return {
		jobDetails
	};
};
