import { SearchIcon } from "lucide-react";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import type { MonsterlingOwned } from "@/components/monsterlings/components/monsterling-form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { MonsterCodexEntry } from "@/data/MONSTERLINGS_DATA";
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { cn } from "@/lib/utils";

export type LoadoutMonsterlingOption = MonsterlingOwned & {
	id: string;
	info: MonsterCodexEntry;
};

type LoadoutMonsterlingPickerProps = {
	search: string;
	onSearchChange: (search: string) => void;
	tier: string;
	onTierChange: (tier: string) => void;
	options: LoadoutMonsterlingOption[];
	selectedRegularIds: Set<string>;
	currentId: string | null;
	legendary: boolean;
	onSelect: (id: string) => void;
};

export const LoadoutMonsterlingPicker = ({
	search,
	onSearchChange,
	tier,
	onTierChange,
	options,
	selectedRegularIds,
	currentId,
	legendary,
	onSelect,
}: LoadoutMonsterlingPickerProps) => (
	<>
		<div className="mb-4 grid grid-cols-[1fr_auto] gap-2">
			<div className="relative">
				<SearchIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
				<Input
					autoFocus
					value={search}
					onChange={(event) => onSearchChange(event.target.value)}
					onFocus={(event) => event.currentTarget.select()}
					placeholder="Search name"
					className="pl-9"
				/>
			</div>
			<Select value={tier} onValueChange={onTierChange}>
				<SelectTrigger className="w-32">
					<SelectValue placeholder="Tier" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All tiers</SelectItem>
					{Object.values(TIERS_DATA).map((tierInfo) => (
						<SelectItem key={tierInfo.id} value={String(tierInfo.id)}>
							Tier {tierInfo.id}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
		<div className="grid gap-2 overflow-x-auto [scrollbar-width:none] md:grid-cols-2 xl:grid-cols-3 [&::-webkit-scrollbar]:hidden">
			{options.map((monsterling) => {
				const disabled =
					!legendary &&
					selectedRegularIds.has(monsterling.id) &&
					currentId !== monsterling.id;
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
