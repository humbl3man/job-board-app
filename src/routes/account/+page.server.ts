import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}
};
