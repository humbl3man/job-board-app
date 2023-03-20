import { db } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ request, locals, params }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}
	// TODO: application

	const job = await db.job.findUnique({
		where: {
			id: Number(params.id)
		}
	});

	if (!job) {
		throw redirect(302, '/jobs');
	}

	return {
		job
	};
}) satisfies PageServerLoad;
