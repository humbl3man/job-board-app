import { db } from '$lib/db';
import { jobSchema } from '$lib/schemas/job.schema';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, Action, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, '/login');
	}
	if (!event.locals.user.company) {
		throw redirect(302, '/jobs');
	}

	const categories = await db.category.findMany({
		select: {
			id: true,
			name: true
		}
	});

	const jobTypes = await db.jobType.findMany({
		select: {
			id: true,
			name: true
		}
	});

	const form = await superValidate(event, jobSchema);

	return {
		categories,
		jobTypes,
		form
	};
};

const createjob: Action = async (event) => {
	const form = await superValidate(event, jobSchema);
	const companyId = Number(event.locals.user.companyId);

	if (!form.valid) {
		return fail(400, { form });
	}

	try {
		await db.job.create({
			data: {
				...form.data,
				companyId
			}
		});
	} catch (err) {
		return fail(400, {
			form,
			error: 'Something went wrong. Failed to create job'
		});
	}
	throw redirect(303, '/jobs');
};

export const actions: Actions = {
	createjob
};
