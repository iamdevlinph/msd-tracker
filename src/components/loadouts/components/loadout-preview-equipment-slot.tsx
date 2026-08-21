import { Tooltip } from "radix-ui";
import { PortraitWithName } from "@/components/shared/portrait-with-name";
import { TierPortrait } from "@/components/shared/tier-portrait";
import {
	EQUIPMENT_DATA,
	type EquipmentId,
} from "@/data/equipment/EQUIPMENT_DATA";
import {
	type ActiveEquipmentSet,
	getActiveEquipmentSetEffects,
	getEquipmentCaption,
} from "../utils/equipment-set-effects";
import { LOADOUT_PREVIEW_PORTRAIT_SIZE } from "./loadout-preview-constants";
import { LoadoutPreviewPlaceholder } from "./loadout-preview-placeholder-slot";

type LoadoutPreviewEquipmentProps = {
	id: EquipmentId | null;
	activeSets?: ActiveEquipmentSet[];
	showSetName?: boolean;
};

export const LoadoutPreviewEquipment = ({
	id,
	activeSets = [],
	showSetName = false,
}: LoadoutPreviewEquipmentProps) => {
	const equipment = id ? EQUIPMENT_DATA[id] : null;
	if (!equipment)
		return <LoadoutPreviewPlaceholder label="Equipment unavailable" />;
	const activeSet = activeSets.find((set) =>
		set.equipmentIds.includes(equipment.id),
	);
	const caption = getEquipmentCaption(equipment, showSetName);
	const tile = (
		<div className="relative">
			<PortraitWithName name={caption} className="size-[120px] overflow-hidden">
				<TierPortrait
					tier={equipment.tier_id}
					portraitImg={equipment.image}
					portraitSize={LOADOUT_PREVIEW_PORTRAIT_SIZE}
					name={equipment.name}
					portraitClassName="size-[120px] object-contain p-1"
				/>
			</PortraitWithName>
			{activeSet && (
				<span
					aria-hidden="true"
					className={`absolute right-0.5 bottom-[17px] z-20 size-3 rounded-full border-2 border-background ${activeSet.colorClass.replace("outline-", "bg-")}`}
				/>
			)}
		</div>
	);
	if (!activeSet) return tile;
	const trigger = (
		<button
			type="button"
			className="block size-[120px] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			aria-label={`${equipment.name}, ${activeSet.name} set`}
		>
			{tile}
		</button>
	);
	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content
					className="z-50 max-w-xs rounded-md border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md"
					sideOffset={6}
				>
					<div className="grid gap-3">
						{activeSets.map((set) => (
							<div key={set.name} className="grid gap-1.5">
								<strong>{set.name}</strong>
								{getActiveEquipmentSetEffects(set).map((effect) => (
									<div key={effect.pieces}>
										{`[${effect.pieces} set] - ${effect.effect}`}
									</div>
								))}
							</div>
						))}
					</div>
					<Tooltip.Arrow className="fill-popover" />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	);
};
