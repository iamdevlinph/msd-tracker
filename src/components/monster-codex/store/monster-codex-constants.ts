import { SOURCE_MAPPING } from "@/components/monster-codex/data/SOURCE_MAPPING";

export const MONSTER_CODEX_SOURCE = SOURCE_MAPPING.map((item) => item.source);
export type MonsterCodexSource = (typeof MONSTER_CODEX_SOURCE)[number];

export type MonsterCodeEntry = {
	id: number;
	name: string;
	region_id: number;
	source_id: number;
};
