import { doc, setDoc } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {
		ok: true
	};
}) satisfies PageServerLoad;
