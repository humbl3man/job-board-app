import { db } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { Actions, Action, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
	if (!locals.user.company) {
		throw redirect(302, '/jobs');
	}

	const categories = await db.category.findMany({
		select: {
			id: true,
			name: true
		}
	});

	return {
		categories
	};
};

type JobData = {
	title: string;
	id: number;
	companyId: number;
	categoryId: number;
	description: string;
	salary: number;
};

const createjob: Action = async ({ request, cookies, locals }) => {
	const formData = await request.formData();

	// TODO: validation

	await db.job.create({
		data: {
			title: formData.get('title').toString(),
			description: formData.get('description').toString(),
			salary: Number(formData.get('salary')),
			companyId: locals.user.companyId,
			categoryId: Number(formData.get('category'))
		}
	});

	throw redirect(302, '/jobs');
};

export const actions: Actions = {
	createjob
};
