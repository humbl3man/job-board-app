import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { Action, Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// TODO:
};

enum Role {
	EMPLOYER = 1,
	APPLICANT = 2
}

const register: Action = async ({ request }) => {
	const data = await request.formData();
	const email = data.get('email')?.toString() ?? '';
	const password = data.get('password')?.toString() ?? '';
	const company = data.get('company')?.toString();

	if (!email.length || !password.length) {
		return fail(400, {
			credentials: true
		});
	}

	const user = await db.user.findUnique({
		where: {
			email
		}
	});

	if (user) {
		return fail(400, {
			exists: true
		});
	}

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
				email,
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

	throw redirect(301, '/login');
};

export const actions: Actions = {
	register
};
