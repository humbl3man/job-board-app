import { Role } from '$lib/constants/Role.js';
import { db } from '$lib/db';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo';
import { redirect, error } from '@sveltejs/kit';

export async function load(event) {
	if (!event.locals.user) {
		throw redirect(302, handleLoginRedirectTo(event));
	}

	if (event.locals.user.role !== Role.USER) {
		throw redirect(302, '/');
	}

	const job = await db.job.findUnique({
		select: {
			id: true,
			title: true,
			location: true,
			type: true,
			salary: true
		},
		where: {
			id: Number(event.params.id)
		}
	});

	const resume = await db.resume.findUnique({
		where: {
			userId: event.locals.user.id
		},
		select: {
			url: true
		}
	});

	if (!resume) {
		throw error(401, {
			message: 'You need to provide a resume URL or file to apply'
		});
	}

	if (!job) {
		throw error(404);
	}

	return {
		job,
		resume
	};
}

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const resumeURL = String(formData.get('resume_url'));
		const jobId = Number(formData.get('job_id'));

		await db.jobApplication.create({
			data: {
				status: 'pending',
				jobId,
				userId: event.locals.user.id,
				resumeURL
			}
		})
		
		// await db.jobApplication.create({
		// 	data: {
		// 		status: 'pending',
		// 		jobId: 
		// 	}
		// })

	}
};
