import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { MonsterlingFilter } from "@/components/monsterlings/components/monsterling-filter";
import type { MonsterlingOwned } from "@/components/monsterlings/components/monsterling-form";
import type { LinkChainLevel } from "@/components/monsterlings/components/monsterling-link-chain-utils";
import type { MonsterlingFilters } from "@/components/monsterlings/store/monsterlings-filter-store";
import type { MonsterCodexEntry } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { cn } from "@/lib/utils";

export type LoadoutMonsterlingOption = MonsterlingOwned & {
	id: string;
	info: MonsterCodexEntry;
	linkChainLevel: LinkChainLevel;
};

type LoadoutMonsterlingPickerProps = {
	filters: MonsterlingFilters;
	onFiltersChange: (filters: MonsterlingFilters) => void;
	options: LoadoutMonsterlingOption[];
	selectedRegularIds: Set<string>;
	currentCharacterRegularIds: Set<string>;
	currentId: string | null;
	legendary: boolean;
	onSelect: (id: string) => void;
};

export const LoadoutMonsterlingPicker = ({
	filters,
	onFiltersChange,
	options,
	selectedRegularIds,
	currentCharacterRegularIds,
	currentId,
	legendary,
	onSelect,
}: LoadoutMonsterlingPickerProps) => (
	<>
		<div className="mb-4">
			<MonsterlingFilter
				filters={filters}
				onChange={onFiltersChange}
				autoFocus
			/>
		</div>
		<div className="grid gap-2 overflow-x-auto [scrollbar-width:none] md:grid-cols-2 xl:grid-cols-3 [&::-webkit-scrollbar]:hidden">
			{options.map((monsterling) => {
				const disabled =
					currentId === monsterling.id ||
					(!legendary &&
						selectedRegularIds.has(monsterling.id) &&
						!currentCharacterRegularIds.has(monsterling.id));
				return (
					<button
						key={monsterling.id}
						type="button"
						disabled={disabled}
						onClick={() => onSelect(monsterling.id)}
						className={cn(
							"grid w-max justify-self-center rounded-md border p-2 text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
							disabled && "cursor-not-allowed opacity-50",
						)}
					>
						<MonsterlingCard
							monsterling_id={monsterling.monsterling_id}
							tier_id={monsterling.tier_id}
							linkChainLevel={monsterling.linkChainLevel}
							traits={monsterling.traits}
						/>
					</button>
				);
			})}
			{options.length === 0 && (
				<p className="col-span-full rounded-md border border-dashed p-4 text-sm text-muted-foreground">
					No owned monsterlings found.
				</p>
			)}
		</div>
	</>
);
