import { db } from '$lib/db';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { redirect, fail } from '@sveltejs/kit';

export async function load(event) {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}
	// TODO: application

	const job = await db.job.findUnique({
		select: {
			title: true,
			location: true,
			type: true,
			salary: true
		},
		where: {
			id: Number(event.params.id)
		}
	});

	if (!job) {
		return fail(404);
	}

	return {
		job
	};
}
