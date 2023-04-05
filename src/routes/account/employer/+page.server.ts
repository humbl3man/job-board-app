import { Role } from '$lib/constants/Role';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}

	if (event.locals.user.role !== Role.EMPLOYER) {
		throw redirect(302, '/account/user');
	}
}
