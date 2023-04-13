import { Role } from '$lib/constants/Role.js';
import { db } from '$lib/db.js';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo.js';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const resumeSchema = z.object({
	url: z
		.string({ required_error: 'Resume URL is required' })
		.min(1, 'Resume URL is required')
		.url('Please enter a valid URL')
});

export async function load(event) {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}

	if (event.locals.user.role !== Role.USER) {
		throw redirect(302, '/');
	}

	const resume = await db.resume.findUnique({
		where: {
			userId: event.locals.user.id
		}
	});

	let form;

	if (resume) {
		form = await superValidate(resume, resumeSchema);
	} else {
		form = await superValidate(resumeSchema);
	}

	return {
		form
	};
}

export const actions = {
	async default(event) {
		const form = await superValidate(event, resumeSchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		await db.resume.upsert({
			where: {
				userId: event.locals.user.id
			},
			update: {
				url: form.data.url
			},
			create: {
				url: form.data.url,
				filename: null,
				userId: event.locals.user.id
			}
		});

		console.log('RESUME POST - successful', form.data.url);

		return {
			form,
			success: true
		};
	}
};
