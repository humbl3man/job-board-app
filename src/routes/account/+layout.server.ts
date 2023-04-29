import { redirect } from '@sveltejs/kit';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { Role } from '$lib/constants/Role';

export async function load(event) {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}

	const { role } = event.locals.user;

	type AccountLink = {
		href: string;
		label: string;
		aliasHrefs?: string[];
	};

	let accountLinks: AccountLink[] = [];

	if (role === Role.EMPLOYER) {
		accountLinks = [
			{
				href: '/account/employer',
				label: 'Company Profile',
				aliasHrefs: ['/account/update/employer']
			},
			{
				href: '/account/employer/jobs',
				label: 'Company Jobs'
			},
			{
				href: '/account/employer/applications',
				label: 'Review Applications'
			}
		];
	}

	if (role === Role.USER) {
		accountLinks = [
			{
				href: '/account/user',
				label: 'Profile',
				aliasHrefs: ['/account/user/update']
			},
			{
				href: '/account/user/applications',
				label: 'Applications'
			},
			{
				href: '/account/user/resume',
				label: 'Resume'
			}
		];
	}

	return {
		accountLinks
	};
}
