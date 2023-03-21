import { redirect } from '@sveltejs/kit';
import { Role } from '$lib/constants/Role';
import type { Action, Actions, PageServerLoad } from './$types';
import { db } from '$lib/db';

export const load = (async ({ locals }) => {
	if (locals.user?.role !== Role.ADMIN) {
		throw redirect(302, '/');
	}

	const users = await db.user.findMany({
		select: {
			id: true,
			email: true,
			name: true,
			role: true,
			createdAt: true
		}
	});

	return {
		users
	};
}) satisfies PageServerLoad;

const deleteuser: Action = async ({ request }) => {
	const userid = (await request.formData()).get('userid');

	const user = await db.user.findUnique({
		where: {
			id: Number(userid)
		},
		include: {
			// include related company record
			Company: true
		}
	});

	if (user && user.roleId === Role.EMPLOYER) {
		const companyToDelete = user.Company;

		// delete all associated records first
		await db.job.deleteMany({
			where: {
				companyId: companyToDelete?.id
			}
		});

		// delete company record next
		await db.company.delete({
			where: {
				id: companyToDelete?.id
			}
		});

		// finally, delete user record
		await db.user.delete({
			where: {
				id: user.id
			}
		});
		return {
			deleted: true
		};
	}

	// Check if user has role=USER
	if (user && user.roleId === Role.USER) {
		//TODO: if user has role=User, we also need to delete all applications for that user

		await db.user.delete({
			where: {
				id: user.id
			}
		});
		return {
			deleted: true
		};
	}

	return {
		deleted: false
	};
};

export const actions: Actions = {
	deleteuser
};
