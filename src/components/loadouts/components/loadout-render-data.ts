import type { StoreState } from "@/stores/app-store";

export type LoadoutRenderData = Pick<
	StoreState,
	| "charactersOwned"
	| "monsterlingsOwned"
	| "monsterlingLinkChainLevels"
	| "artifactsOwned"
>;
