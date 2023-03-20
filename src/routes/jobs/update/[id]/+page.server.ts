import { db } from '$lib/db';
import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import type { Action, Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
	if (!locals?.user?.companyId) {
		throw redirect(302, `/jobs`);
	}

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

	return {
		jobId: params.id,
		jobDetails,
		jobTypes,
		categories,
		showDeleteButton: locals.user.companyId === jobDetails.company.id
	};
}) satisfies PageServerLoad;

const updatejob: Action = async ({ request, params }) => {
	const formData = await request.formData();
	const updatePayload = {
		title: String(formData.get('title')),
		location: String(formData.get('location')),
		categoryId: Number(formData.get('category')),
		typeId: Number(formData.get('type')),
		description: String(formData.get('description')),
		salary: Number(formData.get('salary'))
	};

	const schema = z.object({
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

	const result = await schema.safeParse(updatePayload);

	if (!result.success) {
		return {
			...result.error.flatten(),
			data: {
				title: updatePayload.title.toString()
			}
		};
	}

	await db.job.update({
		where: {
			id: Number(params.id)
		},
		data: {
			...updatePayload
		}
	});

	throw redirect(302, `/jobs/${params.id}`);
};

export const actions: Actions = {
	updatejob
};
