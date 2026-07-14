export const nextLoadoutName = (names: string[]) => {
	const used = new Set(names);
	if (!used.has("New Loadout")) return "New Loadout";
	let number = 2;
	while (used.has(`New Loadout #${number}`)) number++;
	return `New Loadout #${number}`;
};

export const showFutureLoadoutSlots = (environment?: string) =>
	environment === "development";
