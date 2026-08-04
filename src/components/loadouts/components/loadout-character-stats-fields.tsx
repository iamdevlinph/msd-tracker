import { PinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { STAT_DATA, STAT_ID_BY_STAT } from "@/data/stats/STAT_DATA";
import {
	LOADOUT_STAT_KEYS,
	type LoadoutCharacterSlot,
	type LoadoutStatKey,
	normalizePinnedStats,
} from "@/stores/loadouts-slice";

const STATS = [
	["atk", STAT_ID_BY_STAT.ATK],
	["hp", STAT_ID_BY_STAT.HP],
	["crit_rate", STAT_ID_BY_STAT.CRIT_RATE],
	["crit_dmg", STAT_ID_BY_STAT.CRIT_DMG],
	["boss_enemy_dmg_boost", STAT_ID_BY_STAT.BOSS_ENEMIES_DMG_BOOST],
	["special_skill_cd", STAT_ID_BY_STAT.SPECIAL_SKILL_CD],
	["elem_weak_dmg_boost", STAT_ID_BY_STAT.ELEM_WEAK_DMG_BOOST],
	["element_atk", null],
] as const;

const EDITOR_STAT_LABELS: Partial<Record<LoadoutStatKey, string>> = {
	special_skill_cd: "Special Skill CD",
	elem_weak_dmg_boost: "Elemental Weakness",
	boss_enemy_dmg_boost: "DMG Boost Boss",
	element_atk: "Element ATK",
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
		{STATS.map(([key, statId]) => {
			const selectedPinnedStats = normalizePinnedStats(slot.pinned_stat_ids);
			const isPinned = selectedPinnedStats.includes(key);
			const isPinDisabled = !isPinned && selectedPinnedStats.length >= 5;
			const label =
				EDITOR_STAT_LABELS[key] ?? (statId ? STAT_DATA[statId].stat : key);
			return (
				<label
					key={key}
					htmlFor={`loadout-stat-${key}`}
					className="min-w-0 grid gap-1 text-xs font-medium sm:col-span-3"
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
