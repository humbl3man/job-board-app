import { Role } from '$lib/constants/Role';
import { db } from '$lib/db';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}

	if (event.locals.user.role !== Role.EMPLOYER) {
		throw redirect(302, '/account');
	}

	const createdJobs = await db.job.findMany({
		where: {
			companyId: event.locals.user.companyId
		},
		select: {
			id: true,
			title: true,
			createdAt: true,
			updatedAt: true,
			category: true,
			location: true,
			type: true
		}
	});

	return {
		createdJobs
	};
}
