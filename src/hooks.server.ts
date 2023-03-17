import { db } from '$lib/db';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get('app_session');

	if (!sessionCookie) return await resolve(event);

	const user = await db.user.findUnique({
		where: {
			userAuthToken: sessionCookie
		},
		select: {
			email: true,
			id: true,
			name: true
		}
	});

	const company = await db.company.findUnique({
		where: {
			userId: user?.id
		}
	});

	if (user) {
		event.locals.user = {
			email: user.email,
			id: user.id,
			name: user.name
		};
	}

	if (company) {
		event.locals.user.company = company.name;
	}

	return await resolve(event);
};
