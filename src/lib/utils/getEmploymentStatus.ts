import { EmploymentStatus } from '$lib/constants/EmploymentStatus';

export function getEmploymentStatus(id: number | undefined | null) {
	switch (id) {
		case EmploymentStatus.UNEMPLOYED:
			return 'Unemployed';
		case EmploymentStatus.FULL_TIME:
			return 'Employed Full-Time';
		case EmploymentStatus.PART_TIME:
			return 'Employed Part-Time';
		default:
			return 'Unknown';
	}
}
