import { Role } from '$lib/constants/Role';
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
			firstName: true,
			lastName: true,
			role: true
		}
	});

	if (user) {
		event.locals.user = {
			email: user.email,
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			role: user.role.id
		};

		if (user.role.id === Role.EMPLOYER) {
			const matchingCompany = await db.company.findUnique({
				where: {
					userId: user.id
				},
				select: {
					id: true,
					name: true
				}
			});
			if (matchingCompany) {
				event.locals.user.company = matchingCompany.name;
				event.locals.user.companyId = matchingCompany.id;
			}
		}
	}

	return await resolve(event);
};
