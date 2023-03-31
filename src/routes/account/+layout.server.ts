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

	let accountLinks: AccountLink[] = [
		{
			href: '/account',
			label: 'Profile',
			aliasHrefs: ['/account/update']
		}
	];

	if (role === Role.EMPLOYER) {
		accountLinks = [
			...accountLinks,
			{
				href: '/account/jobs',
				label: 'Created Jobs'
			}
		];
	}

	if (role === Role.USER) {
		accountLinks = [
			...accountLinks,
			{
				href: '/account/applications',
				label: 'Applications'
			}
		];
	}

	return {
		accountLinks
	};
}
