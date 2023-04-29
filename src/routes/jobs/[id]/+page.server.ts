import { error, fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { Role } from '$lib/constants/Role';
import type { Action } from './$types.js';

export async function load({ locals, params }) {
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
			type: true,
			createdAt: true,
			updatedAt: true
		}
	});

	if (!jobDetails) {
		throw error(404, 'job not found');
	}

	const allowModifications = locals.user?.companyId === jobDetails.company.id;
	const showApplyButton = locals.user?.role === Role.USER;

	return {
		jobDetails,
		jobId: params.id,
		showDeleteButton: allowModifications,
		showEditButton: allowModifications,
		showApplyButton
	};
}

const deletejob: Action = async ({ params, locals }) => {
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

	throw redirect(303, '/jobs');
};

export const actions = {
	deletejob
};
