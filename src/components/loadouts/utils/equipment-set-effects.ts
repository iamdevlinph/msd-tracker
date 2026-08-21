import {
	EQUIPMENT_DATA,
	type EquipmentId,
} from "@/data/equipment/EQUIPMENT_DATA";
import {
	EQUIPMENT_SET_EFFECTS_DATA,
	type EquipmentSetName,
} from "@/data/equipment/EQUIPMENT_SET_EFFECTS_DATA";
import type { EquipmentIds } from "@/stores/loadouts-slice";

export const EQUIPMENT_SET_OUTLINE_CLASSES = [
	"outline-sky-400",
	"outline-amber-400",
] as const;

export type ActiveEquipmentSet = {
	name: EquipmentSetName;
	pieces: number;
	colorClass: (typeof EQUIPMENT_SET_OUTLINE_CLASSES)[number];
	equipmentIds: EquipmentId[];
};

export const deriveActiveEquipmentSets = (
	equipmentIds: EquipmentIds | readonly (EquipmentId | null)[],
): ActiveEquipmentSet[] => {
	const grouped = new Map<EquipmentSetName, EquipmentId[]>();
	for (const id of equipmentIds) {
		const equipment = id === null ? undefined : EQUIPMENT_DATA[id];
		if (!equipment) continue;
		const ids = grouped.get(equipment.set_name) ?? [];
		ids.push(equipment.id);
		grouped.set(equipment.set_name, ids);
	}
	return [...grouped.entries()]
		.filter(([, ids]) => ids.length >= 2)
		.map(([name, equipmentIds], index) => ({
			name,
			pieces: equipmentIds.length,
			colorClass:
				EQUIPMENT_SET_OUTLINE_CLASSES[
					Math.min(index, EQUIPMENT_SET_OUTLINE_CLASSES.length - 1)
				],
			equipmentIds,
		}));
};

export const getEquipmentCaption = (
	equipment: { name: string; set_name: EquipmentSetName },
	showSetName: boolean,
) => (showSetName ? equipment.set_name : equipment.name);

export const getActiveEquipmentSetEffects = (set: ActiveEquipmentSet) =>
	EQUIPMENT_SET_EFFECTS_DATA[set.name].filter(
		(effect) => effect.pieces <= set.pieces,
	);
