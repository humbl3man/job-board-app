import { db } from '$lib/firebase/db';
import { error } from '@sveltejs/kit';
import { doc, getDoc, type DocumentData } from 'firebase/firestore';
import type { PageLoad } from '../$types';

export const load = (async ({ params }) => {
	const detailRef = doc(db, 'jobs', params.id);
	const detailDoc = await getDoc(detailRef);

	if (!detailDoc.exists()) {
		throw error(404, {
			message: 'Job not found'
		});
	}

	const detail: DocumentData = {
		...detailDoc.data(),
		id: detailDoc.id
	};

	return {
		detail
	};
}) satisfies PageLoad;
