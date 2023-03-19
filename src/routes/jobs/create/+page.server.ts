import { db } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';
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

	const jobTypes = await db.jobType.findMany({
		select: {
			id: true,
			name: true
		}
	});

	return {
		categories,
		jobTypes
	};
};

const createjob: Action = async ({ request, cookies, locals }) => {
	const formData = await request.formData();

	// TODO: validation

	const jobData = {
		title: String(formData.get('title')),
		location: String(formData.get('location')),
		categoryId: Number(formData.get('category')),
		typeId: Number(formData.get('type')),
		description: String(formData.get('description')),
		salary: Number(formData.get('salary'))
	};

	const createJobSchema = z.object({
		title: z
			.string({ required_error: 'Title is required' })
			.min(1, 'Title is required')
			.max(62, 'Title cannot exceed 62 characters'),
		location: z.string({ required_error: 'Location is required' }).min(1, 'Location is required'),
		categoryId: z.number({ required_error: 'Category is required' }).min(1, 'Category is required'),
		typeId: z.number({ required_error: 'Job Type is required' }).min(1, 'Job Type is required'),
		description: z
			.string({ required_error: 'Description is required' })
			.min(1, 'Description is required'),
		salary: z.number({ required_error: 'Salary is required' }).min(1, 'Salary is required')
	});

	const result = await createJobSchema.safeParse(jobData);

	if (!result.success) {
		return {
			...result.error.flatten(),
			data: {
				title: jobData.title.toString()
			}
		};
	}

	await db.job.create({
		data: {
			...jobData,
			companyId: locals.user.companyId as number
		}
	});
	throw redirect(302, '/jobs');
};

export const actions: Actions = {
	createjob
};
