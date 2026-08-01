import { Trash2Icon } from "lucide-react";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { Button } from "@/components/ui/button";
import type {
	Equipment,
	EquipmentPartType,
} from "@/data/equipment/EQUIPMENT_DATA";

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
}: LoadoutEditorEquipmentSelectorProps) => (
	<div className="relative aspect-square min-w-0">
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
				</div>
			) : (
				<span className="capitalize">Select {partType}</span>
			)}
		</button>
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
