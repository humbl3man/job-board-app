import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/db';
import { Role } from '$lib/constants/Role';

export async function load(event) {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}

	if (event.locals.user.role === Role.EMPLOYER) {
		throw redirect(302, '/account/employer');
	}

	const accountData = db.user.findUnique({
		where: {
			id: event.locals.user.id
		}
	});

	return {
		accountData
	};
}
