import { z } from 'zod';

export const jobSchema = z.object({
	title: z
		.string({ required_error: 'Title is required' })
		.min(1, 'Title is required')
		.max(62, 'Title cannot exceed 62 characters'),
	location: z.string({ required_error: 'Location is required' }).min(1, 'Location is required'),
	categoryId: z.number({ required_error: 'Category is required' }).min(1, 'Category is required'),
	typeId: z.number({ required_error: 'Job Type is required' }).min(1, 'Job Type is required'),
	description: z
		.string({ required_error: 'Description is required' })
		.min(1, 'Description is required'),
	salary: z.number({ required_error: 'Salary is required' }).min(1, 'Salary is required')
});
