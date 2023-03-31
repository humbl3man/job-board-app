import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/db';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}

	const accountData = db.user.findUnique({
		where: {
			id: event.locals.user.id
		}
	});

	return {
		accountData
	};
};
