import { PinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { STAT_DATA, STAT_ID_BY_STAT } from "@/data/stats/STAT_DATA";
import type { LoadoutCharacterSlot } from "@/stores/loadouts-slice";

const STATS = [
	["atk", STAT_ID_BY_STAT.ATK],
	["hp", STAT_ID_BY_STAT.HP],
	["crit_rate", STAT_ID_BY_STAT.CRIT_RATE],
	["crit_dmg", STAT_ID_BY_STAT.CRIT_DMG],
	["special_skill_cd", STAT_ID_BY_STAT.SPECIAL_SKILL_CD],
	["elem_weak_dmg_boost", STAT_ID_BY_STAT.ELEM_WEAK_DMG_BOOST],
	["boss_enemy_dmg_boost", STAT_ID_BY_STAT.BOSS_ENEMIES_DMG_BOOST],
] as const;

type LoadoutCharacterStatsFieldsProps = {
	slot: LoadoutCharacterSlot;
	onChange: (slot: LoadoutCharacterSlot) => void;
};

export const LoadoutCharacterStatsFields = ({
	slot,
	onChange,
}: LoadoutCharacterStatsFieldsProps) => (
	<div className="col-span-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
		{STATS.map(([key, statId], index) => {
			const pinnedStats = slot.pinned_stat_ids ?? [];
			const pinOrder = pinnedStats.indexOf(key) + 1;
			const isPinDisabled = !pinOrder && pinnedStats.length >= 5;
			return (
				<label
					key={key}
					htmlFor={`loadout-stat-${key}`}
					className={`min-w-0 grid gap-1 text-xs font-medium ${index >= 4 ? "col-span-2" : ""}`}
				>
					<span className="flex items-center justify-between gap-1">
						{STAT_DATA[statId].stat}
						<Button
							type="button"
							size="icon-sm"
							variant="ghost"
							className="relative overflow-visible"
							disabled={isPinDisabled}
							aria-label={`${pinOrder ? "Unpin" : "Pin"} ${STAT_DATA[statId].stat}`}
							onClick={() => {
								const pinned_stat_ids = pinOrder
									? pinnedStats.filter((item) => item !== key)
									: [...pinnedStats, key];
								onChange({ ...slot, pinned_stat_ids });
							}}
						>
							<PinIcon fill={pinOrder ? "currentColor" : "none"} />
							{pinOrder > 0 && (
								<sup className="absolute right-0 top-0 grid size-3 place-items-center rounded-full bg-primary text-[8px] leading-none text-primary-foreground">
									{pinOrder}
								</sup>
							)}
						</Button>
					</span>
					<Input
						id={`loadout-stat-${key}`}
						type="number"
						min="0"
						step="any"
						value={slot.stat_values?.[key] ?? ""}
						onChange={(event) => {
							const stat_values = { ...(slot.stat_values ?? {}) };
							const value = event.target.valueAsNumber;
							if (event.target.value === "" || !Number.isFinite(value))
								delete stat_values[key];
							else stat_values[key] = Math.max(0, value);
							onChange({ ...slot, stat_values });
						}}
					/>
				</label>
			);
		})}
	</div>
);
