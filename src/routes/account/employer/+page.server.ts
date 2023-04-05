import { Role } from '$lib/constants/Role';
import { db } from '$lib/db.js';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}

	if (event.locals.user.role !== Role.EMPLOYER) {
		throw redirect(302, '/account/user');
	}

	const accountData = await db.user.findUnique({
		where: {
			id: event.locals.user.id
		},
		select: {
			email: true,
			Company: {
				select: {
					name: true,
					description: true
				}
			}
		}
	});

	return {
		accountData
	};
}
