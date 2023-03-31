import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { db } from '$lib/db';
import { Role } from '$lib/constants/Role';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';

export async function load(event) {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}
}

export const actions = {
	default: async ({ request, locals }) => {
		if (locals.user.role === Role.USER) {
			const formData = await request.formData();
			const firstName = formData.get('firstname');
			const lastName = formData.get('lastname');
			const updateSchemaForUser = z.object({
				firstName: z
					.string({ required_error: 'First Name is required' })
					.min(1, 'First Name is required')
					.max(64, 'First Name cannot exceed 64 characters'),
				lastName: z
					.string({ required_error: 'Last Name is required' })
					.min(1, 'Last Name is required')
					.max(64, 'Last Name cannot exceed 64 characters')
			});

			const result = updateSchemaForUser.safeParse({
				firstName,
				lastName
			});

			if (!result.success) {
				return fail(400, {
					...result.error.flatten(),
					data: {
						firstName: firstName?.toString(),
						lastName: lastName?.toString()
					}
				});
			}

			await db.user.update({
				where: {
					email: locals.user.email
				},
				data: {
					firstName: firstName?.toString(),
					lastName: lastName?.toString()
				}
			});
		}

		if (locals.user.role === Role.EMPLOYER) {
			const companyName = (await request.formData()).get('company');
			const updateSchemaForUser = z.object({
				companyName: z
					.string({ required_error: 'Company name is required' })
					.min(1, 'Company name is required')
					.max(32, 'Company name cannot exceed 32 characters')
			});

			const result = updateSchemaForUser.safeParse({
				companyName
			});

			if (!result.success) {
				return fail(400, {
					...result.error.flatten(),
					data: {
						companyName: companyName?.toString().trim()
					}
				});
			}

			try {
				// check if company name is taken
				// TODO:
				// const companyExists = await db.company.findFirst({
				// 	where: {
				// 		name: {
				// 			startsWith: companyName?.toString().trim().toLowerCase()
				// 		}
				// 	}
				// });

				// // throw error if company name is taken
				// if (companyExists?.id !== locals.user.companyId) {
				// 	return fail(400, {
				// 		company_exists: true
				// 	});
				// }

				await db.company.update({
					where: {
						id: locals.user.companyId
					},
					data: {
						name: companyName?.toString()
					}
				});
			} catch {
				return fail(400, {
					error: true
				});
			}
		}

		throw redirect(303, '/account');
	}
};
