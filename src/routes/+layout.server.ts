import { Role } from '$lib/constants/Role';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const navigation = [
		{
			href: '/jobs',
			label: 'Jobs'
		}
	];

	if (locals.user) {
		if (locals.user.role === Role.EMPLOYER) {
			navigation.push({ href: '/jobs/create', label: '&plus; Create Job' });
		}
		if (locals.user.role === Role.ADMIN) {
			navigation.concat({ href: '/account/admin', label: 'Admin' });
		}
	}
	return {
		user: locals.user,
		navigation
	};
};
