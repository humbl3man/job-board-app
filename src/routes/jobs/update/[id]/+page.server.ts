import { db } from '$lib/db';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { jobSchema } from '$lib/schemas/job.schema';

export const load = (async (event) => {
	if (!event.locals.user) {
		throw redirect(302, '/login');
	}
	if (!event.locals?.user?.companyId) {
		throw redirect(302, `/jobs`);
	}

	const jobDetails = await db.job.findUnique({
		where: {
			id: Number(event.params.id)
		},
		select: {
			id: true,
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
	if (jobDetails.companyId !== event.locals.user.companyId) {
		throw redirect(301, '/jobs');
	}

	const jobTypes = await db.jobType.findMany({
		select: {
			id: true,
			name: true
		}
	});

	const categories = await db.category.findMany({
		select: {
			id: true,
			name: true
		}
	});

	const form = await superValidate(
		{
			title: jobDetails.title,
			description: jobDetails.description,
			location: jobDetails.location,
			categoryId: jobDetails.category.id,
			typeId: jobDetails.type.id,
			salary: jobDetails.salary
		},
		jobSchema
	);

	return {
		id: event.params.id,
		title: jobDetails.title,
		companyName: jobDetails.company.name,
		jobTypes,
		categories,
		showDeleteButton: event.locals.user.companyId === jobDetails.company.id,
		form
	};
}) satisfies PageServerLoad;

const updatejob: Action = async (event) => {
	const form = await superValidate(event, jobSchema);

	if (!form.valid) {
		return fail(400, { form });
	}

	await db.job.update({
		where: {
			id: Number(event.params.id)
		},
		data: {
			...form.data
		}
	});

	throw redirect(302, `/jobs/${event.params.id}`);
};

export const actions: Actions = {
	updatejob
};
