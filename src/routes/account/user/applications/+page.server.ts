import { Role } from '$lib/constants/Role';
import { db } from '$lib/db';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { redirect } from '@sveltejs/kit';
import type { Action } from './$types.js';

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

const withdraw: Action = async (event) => {

	const data = await event.request.formData();
	const id = Number(data.get('application_id'));

	if (id) {
		await db.jobApplication.delete({
			where: {
				id
			}
		})
	}

}

export const actions = {
	withdraw
}