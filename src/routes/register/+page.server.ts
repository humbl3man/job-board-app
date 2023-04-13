import { Role } from '$lib/constants/Role';
import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms/server';

const registerSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required'
		})
		.min(1, 'Email is required')
		.email('Please provide a valid email'),
	password: z
		.string({ required_error: 'Password is required' })
		.min(1, 'Pasword is required')
		.min(8, 'Password is too short, must be at least 8 characters')
		.max(16, 'Password cannot exceed 16 characters'),
	isEmployer: z.boolean(),
	company: z.string().optional()
});

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		throw redirect(302, '/account');
	}

	const registerForm = await superValidate(event, registerSchema);

	return {
		registerForm
	};
};

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		let registerForm = await superValidate(formData, registerSchema);

		// if user checks isEmployer, re-validate form company field
		if (registerForm.data.isEmployer) {
			const schemaWithCompanyRequired = registerSchema.merge(
				z.object({
					company: z.string().min(1, 'Company name is required')
				})
			);
			registerForm = await superValidate(formData, schemaWithCompanyRequired);
		}

		// check validity
		if (!registerForm.valid) {
			return fail(400, { registerForm });
		}

		// check if user already exists
		const user = await db.user.findUnique({
			where: {
				email: registerForm.data.email
			}
		});

		// if user already exists, throw error
		if (user) {
			return setError(registerForm, 'email', 'User already exists. Please use a different email.');
		}

		if (registerForm.data?.company) {
			// check if user is trying to register as employer
			const companyRecordFound = await db.company.findUnique({
				where: {
					name: registerForm.data.company
				}
			});
			if (companyRecordFound) {
				return setError(registerForm, 'company', 'This company name is taken.');
			}

			const newUser = await db.user.create({
				data: {
					email: registerForm.data.email,
					passwordHash: await bcrypt.hash(registerForm.data.password, 10),
					userAuthToken: crypto.randomUUID(),
					role: {
						connect: {
							id: Role.EMPLOYER
						}
					}
				}
			});

			await db.company.create({
				data: {
					name: registerForm.data.company,
					userId: newUser.id
				}
			});
		} else {
			// otherwise, create new user with USER role
			await db.user.create({
				data: {
					email: registerForm.data.email,
					passwordHash: await bcrypt.hash(registerForm.data.password, 10),
					userAuthToken: crypto.randomUUID(),
					role: {
						connect: {
							id: Role.USER
						}
					}
				}
			});
		}

		// finally if all is successful, redirect to login
		const redirectTo = event.url.searchParams.get('redirectTo');
		if (redirectTo) {
			throw redirect(303, `/login?redirectTo=${redirectTo}`);
		}
		throw redirect(303, '/login');
	}
};
