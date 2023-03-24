import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const jobTypes = ['Full-time', 'Part-time'];
const categories = [
	'Business',
	'Technology',
	'Retail',
	'Marketing',
	'Healthcare',
	'Home Improvement'
];
const roles = ['Admin', 'Employer', 'User'];

async function main() {
	for (const role of roles) {
		await db.role.create({
			data: {
				name: role
			}
		});
	}
	for (const category of categories) {
		await db.category.create({
			data: {
				name: category
			}
		});
	}
	for (const jobType of jobTypes) {
		await db.jobType.create({
			data: {
				name: jobType
			}
		});
	}
}

main()
	.then(async () => {
		await db.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await db.$disconnect();
		process.exit(1);
	});
