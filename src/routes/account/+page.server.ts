import { db } from '$lib/db';
import { redirect, fail } from '@sveltejs/kit';
import type { PageServerLoad, Action, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(301, '/login');
	}
};

const changename: Action = async ({ request, locals }) => {
	const newName = (await request.formData()).get('name');

	if (!newName) {
		return fail(400, {
			required: true
		});
	}

	await db.user.update({
		where: {
			id: locals.user.id
		},
		data: {
			name: newName.toString()
		}
	});

	return {
		updated: true
	};
};

export const actions: Actions = {
	changename
};
