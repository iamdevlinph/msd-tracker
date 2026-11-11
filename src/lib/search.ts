export const normalizeSearchText = (value: string) =>
	value
		.normalize("NFKD")
		.toLocaleLowerCase()
		.replace(/[^\p{L}\p{N}]/gu, "");

export const matchesSearchText = (value: string, search: string) =>
	normalizeSearchText(value).includes(normalizeSearchText(search));
