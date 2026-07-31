import { useForm } from "react-hook-form";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { TierSelectorInput } from "@/components/forms/tier-selector-input";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";
import {
	LINK_CHAIN_LEVELS,
	type LinkChainLevel,
} from "./monsterling-link-chain-utils";

export const LinkChainLevelDialog = ({
	monsterling,
	level,
	open,
	onOpenChange,
}: {
	monsterling: { id: number; name: string };
	level: LinkChainLevel;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}) => {
	const form = useForm<{ level: LinkChainLevel }>({ defaultValues: { level } });
	const setLevel = useAppStore((state) => state.setMonsterlingLinkChainLevel);
	const ga = useGoogleAnalytics();
	const save = () => {
		const selectedLevel = form.getValues("level");
		setLevel(monsterling.id, selectedLevel);
		ga.event(ANALYTICS_EVENTS.MONSTERLING_LINK_CHAIN_UPDATE, {
			monsterling_id: monsterling.id,
			monsterling_name: monsterling.name,
			level: selectedLevel,
		});
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{monsterling.name} Link Chain</DialogTitle>
					<DialogDescription>
						Choose the current Link Chain level for {monsterling.name}.
					</DialogDescription>
				</DialogHeader>
				<TierSelectorInput
					name="level"
					label="Link Chain Level"
					control={form.control}
					options={[...LINK_CHAIN_LEVELS]}
					buttonGroupClass="flex justify-center"
				/>
				<DialogFooter>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</Button>
					<Button type="button" onClick={save}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
