export function formatName(firstname: string, lastname: string, shortenedLast?: boolean) {
	if (shortenedLast) {
		return `${firstname} ${lastname.slice(0, 1)}.`;
	}

	return `${firstname} ${lastname}`;
}
