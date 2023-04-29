export const formatDate = (date: Date) =>
	new Intl.DateTimeFormat('en-us', {
		dateStyle: 'medium'
	}).format(date);
