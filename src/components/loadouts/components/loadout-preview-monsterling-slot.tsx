import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { getMonsterlingLinkChainLevel } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import type { StoreState } from "@/stores/app-store";
import { LoadoutPreviewPlaceholder } from "./loadout-preview-placeholder-slot";

type LoadoutPreviewMonsterlingProps = {
	id: string | null;
	owned: StoreState["monsterlingsOwned"];
	levels: StoreState["monsterlingLinkChainLevels"];
	label: string;
	statsDisplay: "icons" | "full";
	onEdit?: (id: string) => void;
};
export const LoadoutPreviewMonsterling = ({
	id,
	owned,
	levels,
	label,
	statsDisplay,
	onEdit,
}: LoadoutPreviewMonsterlingProps) => {
	const monsterling = id ? owned[id] : null;
	const info = monsterling && MONSTERLINGS_DATA[monsterling.monsterling_id];
	if (!monsterling || !info || !id)
		return <LoadoutPreviewPlaceholder label={label} />;
	const card = (
		<MonsterlingCard
			{...monsterling}
			linkChainLevel={getMonsterlingLinkChainLevel(
				monsterling.monsterling_id,
				levels,
			)}
			statsDisplay={statsDisplay}
			className={!onEdit ? "hover:border-border" : undefined}
		/>
	);
	return onEdit ? (
		<button
			type="button"
			aria-label={`Edit ${info.name} monsterling`}
			onClick={() => onEdit(id)}
			className="grid w-fit rounded-lg text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
		>
			{card}
		</button>
	) : (
		card
	);
};
