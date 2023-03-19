import { db } from '$lib/db';
import { error, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	if (!locals?.user?.companyId) throw redirect(301, `/jobs`);

	const jobDetails = await db.job.findUnique({
		where: {
			id: Number(params.id)
		},
		select: {
			title: true,
			description: true,
			salary: true,
			company: true,
			companyId: true,
			category: true,
			location: true,
			type: true
		}
	});

	if (!jobDetails) {
		throw error(404, 'job not found');
	}

	// only allow updates if job belongs to same company
	if (jobDetails.companyId !== locals.user.companyId) {
		throw redirect(301, '/jobs');
	}

	return {
		jobDetails,
		showDeleteButton: locals.user.companyId === jobDetails.company.id
	};
}) satisfies PageServerLoad;

const update: Action = async () => {
	return {};
};

export const actions: Actions = {
	update
};
