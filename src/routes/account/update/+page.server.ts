import { fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { db } from '$lib/db';
import { Role } from '$lib/constants/Role';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
}) satisfies PageServerLoad;

const updateaccount: Action = async ({ request, locals }) => {
	if (locals.user.role === Role.USER) {
		const username = (await request.formData()).get('name');
		const updateSchemaForUser = z.object({
			name: z
				.string({ required_error: 'Name is required' })
				.min(1, 'Name is required')
				.max(64, 'Name cannot exceed 64 characters')
		});

		const result = updateSchemaForUser.safeParse({
			name: username
		});

		if (!result.success) {
			return fail(400, {
				...result.error.flatten(),
				data: {
					name: username?.toString()
				}
			});
		}

		await db.user.update({
			where: {
				email: locals.user.email
			},
			data: {
				name: username?.toString()
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
			const companyExists = await db.company.findFirst({
				where: {
					name: {
						startsWith: companyName?.toString().trim().toLowerCase()
					}
				}
			});

			// throw error if company name is taken
			if (companyExists?.id !== locals.user.companyId) {
				return fail(400, {
					company_exists: true
				});
			}

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

	throw redirect(301, '/account');
};
export const actions: Actions = {
	updateaccount
};
