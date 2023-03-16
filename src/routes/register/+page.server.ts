import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import type { Action, Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(301, '/dashboard');
	}
};

enum Role {
	EMPLOYER = 1,
	APPLICANT = 2
}

const register: Action = async ({ request }) => {
	const formData = await request.formData();
	const email = formData.get('email').toString();
	const password = formData.get('password').toString();
	const company = formData.get('company')?.toString();

	const registerSchema = z.object({
		email: z
			.string({
				required_error: 'Email is required'
			})
			.min(1, 'Email is required')
			.email('Please provide a valid email'),
		password: z
			.string({ required_error: 'Password is required' })
			.min(1, 'Password is required')
			.max(16, 'Password must not exceed 16 characters')
	});

	const result = registerSchema.safeParse({ email, password });

	// validate user and password
	if (!result.success) {
		return fail(400, {
			...result.error.flatten(),
			data: {
				email,
				company
			}
		});
	}

	// check if user already exists
	const user = await db.user.findUnique({
		where: {
			email
		}
	});

	// throw exists error
	if (user) {
		return fail(400, {
			exists: true
		});
	}

	// check if user provided company value, if so register a "Employer" type user
	if (company) {
		const companyRecordFound = await db.company.findUnique({
			where: {
				name: company
			}
		});
		if (companyRecordFound) {
			return fail(400, {
				exists: true
			});
		}

		const newUser = await db.user.create({
			data: {
				email,
				passwordHash: await bcrypt.hash(password, 10),
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
				name: company,
				userId: newUser.id
			}
		});
	} else {
		// if no company provided, create new user with applicant role
		await db.user.create({
			data: {
				email: email,
				passwordHash: await bcrypt.hash(password, 10),
				userAuthToken: crypto.randomUUID(),
				role: {
					connect: {
						id: Role.APPLICANT
					}
				}
			}
		});
	}

	// finally if all is successful, redirect to login
	throw redirect(301, '/login');
};

export const actions: Actions = {
	register
};
