import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { db } from '$lib/db';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { superValidate } from 'sveltekit-superforms/server';
import { Role } from '$lib/constants/Role';

const updateSchema = z.object({
	firstName: z
		.string({ required_error: 'First Name is required' })
		.min(1, 'First Name is required')
		.max(64, 'First Name cannot exceed 64 characters'),
	lastName: z
		.string({ required_error: 'Last Name is required' })
		.min(1, 'Last Name is required')
		.max(64, 'Last Name cannot exceed 64 characters'),
	employmentStatus: z
		.string({ required_error: 'Employment Status is required' })
		.min(1, 'Employment Status is required'),
	bio: z.string().max(150, 'Bio cannot exceed 150 characters').optional()
});

export async function load(event) {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}

	if (event.locals.user.role === Role.EMPLOYER) {
		throw redirect(302, '/account/employer/update');
	}

	const accountData = await db.user.findUnique({
		where: {
			id: event.locals.user.id
		}
	});
	const employmentStatuses = await db.employmentStatus.findMany();
	const form = await superValidate(
		{
			firstName: accountData?.firstName ?? '',
			lastName: accountData?.lastName ?? '',
			employmentStatus: String(accountData?.employmentStatusId ?? ''),
			bio: accountData?.bio ?? ''
		},
		updateSchema
	);

	return {
		form,
		employmentStatuses
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

		await db.user.update({
			where: {
				email: locals.user.email
			},
			data: {
				firstName: form.data.firstName,
				lastName: form.data.lastName,
				employmentStatusId: Number(form.data.employmentStatus),
				bio: form.data.bio
			}
		});

		throw redirect(303, '/account/user');
	}
};
