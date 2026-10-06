import { StarIcon } from "lucide-react";
import { EQUIPMENT_SET_EFFECTS_DATA } from "@/data/equipment/EQUIPMENT_SET_EFFECTS_DATA";
import { TIERS_DATA } from "@/data/tiers/TIERS_DATA";
import type { EquipmentSetRow as EquipmentSetRowData } from "../utils/equipment-catalog";
import { EquipmentCard } from "./equipment-card";

type EquipmentSetRowProps = {
	row: EquipmentSetRowData;
};

export const EquipmentSetRow = ({ row }: EquipmentSetRowProps) => {
	const headingId = `equipment-set-${row.name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")}`;

	return (
		<section
			aria-labelledby={headingId}
			className="rounded-lg border bg-card p-4"
		>
			<div className="mb-4 flex flex-wrap items-center gap-2">
				<h2 id={headingId} className="text-lg font-semibold">
					{row.name}
				</h2>
				<span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
					Tier {row.tier}
					<StarIcon
						className="size-4"
						fill="currentColor"
						style={{ color: TIERS_DATA[row.tier].hex }}
						aria-hidden
					/>
				</span>
			</div>
			<div className="grid gap-4 lg:grid-cols-[auto_1fr] lg:items-start">
				<div className="flex flex-wrap justify-center gap-3 sm:justify-start">
					{row.equipment.map((piece) => (
						<EquipmentCard key={piece.id} equipment={piece} />
					))}
				</div>
				<ul className="grid gap-2 text-sm text-muted-foreground">
					{EQUIPMENT_SET_EFFECTS_DATA[row.name].map(({ pieces, effect }) => (
						<li key={pieces}>
							<span className="font-medium text-foreground">
								{pieces}-piece:
							</span>{" "}
							{effect}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};
