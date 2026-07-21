export const nextLoadoutName = (names: string[], baseName = "New Loadout") => {
	const used = new Set(names);
	if (!used.has(baseName)) return baseName;
	let number = 2;
	while (used.has(`${baseName} #${number}`)) number++;
	return `${baseName} #${number}`;
};

export const nextDuplicateLoadoutName = (name: string, names: string[]) => {
	const baseName = name.replace(/ #\d+$/, "");
	const used = new Set(names);
	let number = 2;
	while (used.has(`${baseName} #${number}`)) number++;
	return `${baseName} #${number}`;
};

export const showFutureLoadoutSlots = (environment?: string) =>
	environment === "development";
