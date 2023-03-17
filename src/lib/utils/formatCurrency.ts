const numberFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export const formatCurrency = (value: number) => {
	return numberFormatter.format(value);
};
