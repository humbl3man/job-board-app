import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db } from '$lib/db';

// Example only. It's not currently consumed by client
export const GET: RequestHandler = async () => {
	const jobs = await db.job.findMany();

	return json({
		jobs
	});
};
