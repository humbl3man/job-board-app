import { Role } from '$lib/constants/Role.js';
import { db } from '$lib/db.js';
import { handleLoginRedirectTo } from '$lib/utils/handleLoginRedirectTo.js';
import { redirect } from '@sveltejs/kit';

export async function load(event) {

  if (!event.locals.user) {
    throw redirect(302, handleLoginRedirectTo(event))
  }

  if (event.locals.user.role !== Role.EMPLOYER) {
    throw redirect(302, '/')
  }

  const applications = await db.jobApplication.findMany({
    where: {
      job: {
        companyId: event.locals.user.companyId
      }
    },
    select: {
      id: true,
      createdAt: true,
      resumeURL: true,
      status: true,
      job: {
        select: {
          id: true,
          title: true,
          location: true
        }
      },

      user: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    }
  })

  return {
    applications
  }

}