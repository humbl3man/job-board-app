import { db } from '$lib/firebase/db';
import { doc, setDoc } from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {
		ok: true
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		try {
			const formData = await request.formData();
			const title = formData.get('title');
			const createdBy = formData.get('createdBy');
			const company = formData.get('company');
			const salary = formData.get('salary');
			const description = formData.get('description');
			const expectations = formData.get('expectations');
			const category = formData.get('category');
			const skills = formData.get('skills');

			await setDoc(doc(db, 'jobs', uuidv4()), {
				title,
				createdBy,
				company,
				salary,
				description,
				category,
				expectations,
				skills: String(skills)
					.split(',')
					.map((s) => s.trim()),
				createdAt: new Date(),
				updatedAt: null
			});
			return {
				successMessage: 'Created new job',
				error: null
			};
		} catch (error: any) {
			return {
				successMessage: null,
				error: error.message
			};
		}
	}
} satisfies Actions;
