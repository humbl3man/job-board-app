import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { db } from '$lib/db';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { superValidate } from 'sveltekit-superforms/server';
import { Role } from '$lib/constants/Role';

const updateSchema = z.object({
	companyName: z
		.string({ required_error: 'Company Name is required' })
		.min(1, 'Company Name is required')
		.max(64, 'Company Name cannot exceed 64 characters'),
	companyDescription: z
		.string()
		.max(300, 'Company description cannot exceed 300 characters')
		.optional()
});

export async function load(event) {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}

	if (event.locals.user.role === Role.USER) {
		throw redirect(302, '/account/user/update');
	}

	const accountData = await db.user.findUnique({
		where: {
			id: event.locals.user.id
		},
		select: {
			email: true,
			Company: {
				select: {
					name: true,
					description: true
				}
			}
		}
	});

	const form = await superValidate(
		{
			companyName: accountData?.Company?.name ?? '',
			companyDescription: accountData?.Company?.description ?? ''
		},
		updateSchema
	);

	return {
		form
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, updateSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		// TODO: check if company name already exists before updating it.

		await db.company.update({
			where: {
				id: locals.user.companyId
			},
			data: {
				name: form.data.companyName,
				description: form.data.companyDescription
			}
		});

		throw redirect(303, '/account/employer');
	}
};
