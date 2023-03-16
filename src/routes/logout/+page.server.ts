import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	throw redirect(301, '/login');
};

export const actions: Actions = {
	default: ({ locals, cookies }) => {
		if (!locals.user) {
			throw redirect(301, '/login');
		}

		cookies.set('app_session', '', {
			path: '/',
			expires: new Date(0)
		});

		throw redirect(301, '/login');
	}
};
