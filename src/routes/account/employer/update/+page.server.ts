// TODO: create another route for updating company profile

// if (locals.user.role === Role.EMPLOYER) {
// 	const companyName = (await request.formData()).get('company');
// 	const updateSchemaForUser = z.object({
// 		companyName: z
// 			.string({ required_error: 'Company name is required' })
// 			.min(1, 'Company name is required')
// 			.max(32, 'Company name cannot exceed 32 characters')
// 	});

// 	const result = updateSchemaForUser.safeParse({
// 		companyName
// 	});

// 	if (!result.success) {
// 		return fail(400, {
// 			...result.error.flatten(),
// 			data: {
// 				companyName: companyName?.toString().trim()
// 			}
// 		});
// 	}

// 	try {
// 		// check if company name is taken
// 		// TODO:
// 		// const companyExists = await db.company.findFirst({
// 		// 	where: {
// 		// 		name: {
// 		// 			startsWith: companyName?.toString().trim().toLowerCase()
// 		// 		}
// 		// 	}
// 		// });

// 		// // throw error if company name is taken
// 		// if (companyExists?.id !== locals.user.companyId) {
// 		// 	return fail(400, {
// 		// 		company_exists: true
// 		// 	});
// 		// }

// 		await db.company.update({
// 			where: {
// 				id: locals.user.companyId
// 			},
// 			data: {
// 				name: companyName?.toString()
// 			}
// 		});
// 	} catch {
// 		return fail(400, {
// 			error: true
// 		});
// 	}
// }
