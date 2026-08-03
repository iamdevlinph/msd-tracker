import { PinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { STAT_DATA, STAT_ID_BY_STAT } from "@/data/stats/STAT_DATA";
import {
	LOADOUT_STAT_KEYS,
	type LoadoutCharacterSlot,
	type LoadoutStatKey,
} from "@/stores/loadouts-slice";

const STATS = [
	["atk", STAT_ID_BY_STAT.ATK],
	["hp", STAT_ID_BY_STAT.HP],
	["crit_rate", STAT_ID_BY_STAT.CRIT_RATE],
	["crit_dmg", STAT_ID_BY_STAT.CRIT_DMG],
	["special_skill_cd", STAT_ID_BY_STAT.SPECIAL_SKILL_CD],
	["elem_weak_dmg_boost", STAT_ID_BY_STAT.ELEM_WEAK_DMG_BOOST],
	["boss_enemy_dmg_boost", STAT_ID_BY_STAT.BOSS_ENEMIES_DMG_BOOST],
] as const;

const EDITOR_STAT_LABELS: Partial<Record<LoadoutStatKey, string>> = {
	special_skill_cd: "Special Skill CD",
	elem_weak_dmg_boost: "Elemental Boost",
	boss_enemy_dmg_boost: "DMG Boost Boss",
};

type LoadoutCharacterStatsFieldsProps = {
	slot: LoadoutCharacterSlot;
	onChange: (slot: LoadoutCharacterSlot) => void;
};

export const LoadoutCharacterStatsFields = ({
	slot,
	onChange,
}: LoadoutCharacterStatsFieldsProps) => (
	<div className="col-span-3 grid grid-cols-2 gap-2 sm:grid-cols-12">
		{STATS.map(([key, statId], index) => {
			const pinnedStats = slot.pinned_stat_ids ?? [];
			const selectedPinnedStats = LOADOUT_STAT_KEYS.filter((item) =>
				pinnedStats.includes(item),
			).slice(0, 5);
			const isPinned = selectedPinnedStats.includes(key);
			const isPinDisabled = !isPinned && selectedPinnedStats.length >= 5;
			const label = EDITOR_STAT_LABELS[key] ?? STAT_DATA[statId].stat;
			return (
				<label
					key={key}
					htmlFor={`loadout-stat-${key}`}
					className={`min-w-0 grid gap-1 text-xs font-medium ${index >= 4 ? "col-span-2 sm:col-span-4" : "sm:col-span-3"}`}
				>
					<span className="flex items-center justify-between gap-1">
						{label}
						<Button
							type="button"
							size="icon-sm"
							variant="ghost"
							className="relative overflow-visible"
							disabled={isPinDisabled}
							aria-label={`${isPinned ? "Unpin" : "Pin"} ${label}`}
							onClick={() => {
								const selected = new Set(selectedPinnedStats);
								if (isPinned) selected.delete(key);
								else selected.add(key);
								const pinned_stat_ids = LOADOUT_STAT_KEYS.filter((item) =>
									selected.has(item),
								).slice(0, 5);
								onChange({ ...slot, pinned_stat_ids });
							}}
						>
							<PinIcon fill={isPinned ? "currentColor" : "none"} />
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
