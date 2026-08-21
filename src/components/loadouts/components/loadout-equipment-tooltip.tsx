import { Tooltip } from "radix-ui";
import type { ReactElement } from "react";
import type { Equipment } from "@/data/equipment/EQUIPMENT_DATA";
import { EQUIPMENT_SET_EFFECTS_DATA } from "@/data/equipment/EQUIPMENT_SET_EFFECTS_DATA";

type LoadoutEquipmentTooltipProps = {
	equipment: Equipment;
	trigger: ReactElement;
};

export const LoadoutEquipmentTooltip = ({
	equipment,
	trigger,
}: LoadoutEquipmentTooltipProps) => {
	const effects = EQUIPMENT_SET_EFFECTS_DATA[equipment.set_name] ?? [];

	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content
					className="z-50 max-w-xs rounded-md border bg-popover px-3 py-2 text-xs text-popover-foreground shadow-md"
					sideOffset={6}
				>
					<div className="grid gap-3">
						<strong>{equipment.set_name}</strong>
						{effects.map((effect) => (
							<div key={effect.pieces}>
								{`[${effect.pieces} set] - ${effect.effect}`}
							</div>
						))}
					</div>
					<Tooltip.Arrow className="fill-popover" />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	);
};
