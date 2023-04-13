import { Role } from '$lib/constants/Role';
import { db } from '$lib/db';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}

	if (event.locals.user.role === Role.EMPLOYER) {
		throw redirect(302, '/account/employer');
	}

	const applications = await db.jobApplication.findMany({
		where: {
			userId: event.locals.user.id
		},
		select: {
			id: true,
			createdAt: true,
			status: true,
			job: {
				include: {
					company: true
				}
			},
		}
	});

	return {
		applications
	};
}
