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

	if (user) {
		const company = await db.company.findUnique({
			where: {
				userId: user.id
			},
			select: {
				id: true,
				name: true
			}
		});
		event.locals.user = {
			email: user.email,
			id: user.id,
			name: user.name
		};
		if (company) {
			event.locals.user.company = company.name;
			event.locals.user.companyId = company.id;
		}
	}

	return await resolve(event);
};
