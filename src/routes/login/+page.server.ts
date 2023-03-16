import { db } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import type { PageServerLoad, Action, Actions } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.user) {
		throw redirect(301, '/dashboard');
	}
	return {};
};

const login: Action = async ({ request, cookies }) => {
	const formData = await request.formData();
	const email = formData.get('email');
	const password = formData.get('password');

	const loginSchema = z.object({
		email: z
			.string({
				required_error: 'Email is required'
			})
			.min(1, 'Email is required')
			.email('Please provide a valid email'),
		password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required')
	});

	const result = loginSchema.safeParse({ email, password });

	if (!result.success) {
		return fail(400, {
			...result.error.flatten(),
			data: { email }
		});
	}

	const user = await db.user.findUnique({
		where: {
			email: String(email)
		}
	});

	if (!user) {
		return fail(400, {
			invalid: true
		});
	}

	const passwordMatch = await bcrypt.compare(String(password), user.passwordHash);

	if (!passwordMatch) {
		return fail(400, {
			credentials: true
		});
	}

	const authenticatedUser = await db.user.update({
		where: {
			email: String(email)
		},
		data: {
			userAuthToken: crypto.randomUUID()
		}
	});

	cookies.set('app_session', authenticatedUser.userAuthToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production' ? true : false,
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, '/dashboard');
};

export const actions: Actions = {
	login
};
