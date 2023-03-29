import { db } from '$lib/db';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}
	// TODO: application

	const job = await db.job.findUnique({
		where: {
			id: Number(event.params.id)
		}
	});

	if (!job) {
		throw redirect(302, '/jobs');
	}

	return {
		job
	};
};
