import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	console.log('run layout server load');
	return {
		user: locals.user
	};
};
