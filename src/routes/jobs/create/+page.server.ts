import { redirect } from '@sveltejs/kit';
import type { Actions, Action, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
	if (!locals.user.company) {
		throw redirect(302, '/jobs');
	}
};

const createjob: Action = async ({ request, cookies, locals }) => {
	const formData = await request.formData();
	console.log(formData);
};

export const actions: Actions = {
	createjob
};
