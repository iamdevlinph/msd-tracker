export function getAwakeningBonus(awakeningBoost: number) {
	if (awakeningBoost >= 5) return 4;
	if (awakeningBoost >= 3) return 2;
	return 0;
}

export const isMaxSkill = (level: number) => {
	return level === 15;
};
