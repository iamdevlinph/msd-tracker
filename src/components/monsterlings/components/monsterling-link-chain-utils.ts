export const LINK_CHAIN_LEVELS = [1, 2, 3, 4, 5] as const;
export type LinkChainLevel = (typeof LINK_CHAIN_LEVELS)[number];

export function getLinkChainLevelOrOne(value: unknown): LinkChainLevel {
	return typeof value === "number" &&
		LINK_CHAIN_LEVELS.includes(value as LinkChainLevel)
		? (value as LinkChainLevel)
		: 1;
}
