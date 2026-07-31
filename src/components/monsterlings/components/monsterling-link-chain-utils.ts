import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";

export const LINK_CHAIN_LEVELS = [1, 2, 3, 4, 5] as const;
export type LinkChainLevel = (typeof LINK_CHAIN_LEVELS)[number];

export type MonsterlingLinkChainLevels = Partial<
	Record<number, LinkChainLevel>
>;

export function getLinkChainLevelOrOne(value: unknown): LinkChainLevel {
	return typeof value === "number" &&
		LINK_CHAIN_LEVELS.includes(value as LinkChainLevel)
		? (value as LinkChainLevel)
		: 1;
}

export function getMonsterlingLinkChainLevel(
	monsterlingId: number,
	monsterlingLinkChainLevels: MonsterlingLinkChainLevels | undefined,
): LinkChainLevel {
	return getLinkChainLevelOrOne(monsterlingLinkChainLevels?.[monsterlingId]);
}

type LegacyMonsterlingOwned = {
	monsterling_id: number;
	link_chain_level?: unknown;
};

export function consolidateMonsterlingLinkChainLevels<
	T extends LegacyMonsterlingOwned,
>(
	monsterlingsOwned: Record<string, T> | undefined,
	monsterlingLinkChainLevels?: MonsterlingLinkChainLevels,
): {
	monsterlingsOwned: Record<string, Omit<T, "link_chain_level">>;
	monsterlingLinkChainLevels: MonsterlingLinkChainLevels;
} {
	const sharedLinkChainLevels: MonsterlingLinkChainLevels = {};
	for (const [monsterlingIdText, linkChainLevel] of Object.entries(
		monsterlingLinkChainLevels ?? {},
	)) {
		const monsterlingId = Number(monsterlingIdText);
		const validLinkChainLevel = getLinkChainLevelOrOne(linkChainLevel);
		if (
			Number.isInteger(monsterlingId) &&
			validLinkChainLevel > 1 &&
			MONSTERLINGS_DATA[monsterlingId]?.linkChain
		) {
			sharedLinkChainLevels[monsterlingId] = validLinkChainLevel;
		}
	}
	const ownedMonsterlingsWithoutLegacyLevels = Object.fromEntries(
		Object.entries(monsterlingsOwned ?? {}).map(([id, monsterling]) => {
			const { link_chain_level, ...monsterlingWithoutLegacyLevel } =
				monsterling;
			const validLegacyLinkChainLevel =
				getLinkChainLevelOrOne(link_chain_level);
			if (
				validLegacyLinkChainLevel > 1 &&
				MONSTERLINGS_DATA[monsterling.monsterling_id]?.linkChain
			) {
				const monsterlingId = monsterling.monsterling_id;
				sharedLinkChainLevels[monsterlingId] = Math.max(
					sharedLinkChainLevels[monsterlingId] ?? 1,
					validLegacyLinkChainLevel,
				) as LinkChainLevel;
			}
			return [id, monsterlingWithoutLegacyLevel];
		}),
	) as Record<string, Omit<T, "link_chain_level">>;
	return {
		monsterlingsOwned: ownedMonsterlingsWithoutLegacyLevels,
		monsterlingLinkChainLevels: sharedLinkChainLevels,
	};
}
