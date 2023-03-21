import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { db } from '$lib/db';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
}) satisfies PageServerLoad;

const updateaccount: Action = async ({ request, locals }) => {
	const formData = Object.fromEntries(await request.formData());

	const updateSchema = z.object({
		name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required')
	});

	if (formData.company) {
		updateSchema.extend({
			company: z
				.string({ required_error: 'Company name is required' })
				.min(1, 'Company name is required')
		});
	}

	const result = updateSchema.safeParse(formData);

	if (!result.success) {
		return fail(400, {
			...result.error.flatten(),
			data: formData
		});
	}

	await db.user.update({
		where: {
			email: locals.user.email
		},
		data: {
			name: formData.name.toString().trim()
		}
	});

	throw redirect(301, '/account');
};
export const actions: Actions = {
	updateaccount
};
