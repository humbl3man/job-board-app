import type { PageLoad } from './$types';

import { collectionGroup, getDocs, type DocumentData } from 'firebase/firestore';
import { db } from '$lib/firebase/db';

export const load = (async () => {
	const jobsData = await getDocs(collectionGroup(db, 'jobs'));
	const jobs: DocumentData[] = [];
	jobsData.forEach((doc) => {
		jobs.push({
			...doc.data(),
			id: doc.id
		});
	});
	return { jobs };
}) satisfies PageLoad;
