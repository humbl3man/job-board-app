import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { superValidate } from 'sveltekit-superforms/server';

import type { PageServerLoad, Action, Actions } from './$types';
import { Role } from '$lib/constants/Role';

const loginSchema = z.object({
	email: z
		.string({
			required_error: 'Email is required'
		})
		.min(1, 'Email is required')
		.email('Please provide a valid email'),
	password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required')
});

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		throw redirect(301, '/account');
	}

	const form = await superValidate(event, loginSchema);

	return {
		form
	};
};

const login: Action = async (event) => {
	const form = await superValidate(event, loginSchema);

	if (!form.valid) {
		return fail(400, { form });
	}

	const user = await db.user.findUnique({
		where: {
			email: String(form.data.email)
		}
	});

	if (!user) {
		form.data.password = '';

		return fail(400, {
			form,
			invalidUser: true
		});
	}

	const passwordMatch = await bcrypt.compare(form.data.password, user.passwordHash);

	if (!passwordMatch) {
		form.data.password = '';
		return fail(400, {
			form,
			invalidCredentials: true
		});
	}

	try {
		const authenticatedUser = await db.user.update({
			where: {
				email: form.data.email
			},
			data: {
				userAuthToken: crypto.randomUUID()
			}
		});

		event.cookies.set('app_session', authenticatedUser.userAuthToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production' ? true : false,
			maxAge: 60 * 60 * 24 * 30
		});

		if (authenticatedUser.roleId === Role.ADMIN) {
			throw redirect(302, '/admin');
		}

		throw redirect(302, '/account');
	} catch (error) {
		return fail(400, {
			serverError: 'Something went wrong'
		});
	}
};

export const actions: Actions = {
	login
};
