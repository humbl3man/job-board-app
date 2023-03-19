import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import type { PageServerLoad, Action, Actions } from './$types';

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
			category: true,
			location: true,
			type: true
		}
	});

	if (!jobDetails) {
		throw error(404, 'job not found');
	}

	const allowModifications = locals.user.companyId === jobDetails.company.id;

	return {
		jobDetails,
		jobId: params.id,
		showDeleteButton: allowModifications,
		showEditButton: allowModifications
	};
};

const deletejob: Action = async ({ request, params, locals }) => {
	const jobToDelete = await db.job.findUnique({
		where: {
			id: +params.id
		}
	});

	if (!jobToDelete) {
		return fail(400, {
			notfound: true
		});
	}

	if (jobToDelete.companyId !== locals.user.companyId) {
		throw fail(401, {
			authorized: false
		});
	}

	await db.job.delete({
		where: {
			id: +params.id
		}
	});

	throw redirect(301, '/jobs');
};

export const actions = {
	deletejob
};
