import { Trash2Icon } from "lucide-react";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { Button } from "@/components/ui/button";
import type {
	Equipment,
	EquipmentPartType,
} from "@/data/equipment/EQUIPMENT_DATA";
import { useAppStore } from "@/stores/app-store";
import { getEquipmentCaption } from "../utils/equipment-set-effects";
import { LoadoutEquipmentTooltip } from "./loadout-equipment-tooltip";

type LoadoutEditorEquipmentSelectorProps = {
	equipment: Equipment | null;
	partType: EquipmentPartType;
	onOpen: () => void;
	onClear: () => void;
};

export const LoadoutEditorEquipmentSelector = ({
	equipment,
	partType,
	onOpen,
	onClear,
}: LoadoutEditorEquipmentSelectorProps) => {
	const showEquipmentSetNames = useAppStore(
		(state) => state.showEquipmentSetNames,
	);
	const trigger = (
		<button
			type="button"
			aria-label={equipment?.name ?? `Select ${partType}`}
			onClick={onOpen}
			className="relative grid size-full place-items-center overflow-hidden rounded-md border border-dashed p-1 text-center text-[10px] text-muted-foreground hover:bg-accent"
		>
			{equipment ? (
				<div className="relative size-28 overflow-hidden rounded-sm">
					<TierPortrait
						tier={equipment.tier_id}
						portraitImg={equipment.image}
						portraitSize={112}
						name={equipment.name}
						portraitClassName="size-full object-contain p-1"
					/>
					<span className="absolute inset-x-1 bottom-1 truncate rounded bg-black/80 px-1 py-0.5 text-center text-[10px] text-white">
						{getEquipmentCaption(equipment, showEquipmentSetNames)}
					</span>
				</div>
			) : (
				<span className="capitalize">Select {partType}</span>
			)}
		</button>
	);

	return (
		<div className="relative aspect-square min-w-0">
			{equipment ? (
				<LoadoutEquipmentTooltip equipment={equipment} trigger={trigger} />
			) : (
				trigger
			)}
			{equipment && (
				<Button
					type="button"
					size="icon-sm"
					variant="destructive"
					className="absolute -right-1 -top-1 size-6"
					aria-label={`Clear ${partType}`}
					onClick={onClear}
				>
					<Trash2Icon />
				</Button>
			)}
		</div>
	);
};
