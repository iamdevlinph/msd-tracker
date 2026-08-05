import { useEffect, useMemo, useRef, useState } from "react";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { MutationFamilyTree } from "@/components/monster-codex/components/mutation-family-tree";
import { getMonsterlingMutationFamily } from "@/components/monster-codex/utils/mutation-family";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MONSTERLING_MUTATIONS_DATA } from "@/data/monsterling-mutations/MONSTERLING_MUTATIONS_DATA";
import {
	MONSTERLINGS_SOURCE_DATA,
	SOURCE_ID_BY_SOURCE,
} from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

type CodexDetailsTab = "source" | "mutation";

type CodexDetailsFrame = {
	monsterlingId: number;
	tab: CodexDetailsTab;
	scrollLeft: number;
	scrollTop: number;
};

type CodexDetailsDialogProps = {
	monsterlingId: number | null;
	onClose: () => void;
};

const createFrame = (monsterlingId: number): CodexDetailsFrame => ({
	monsterlingId,
	tab: "source",
	scrollLeft: 0,
	scrollTop: 0,
});

export const CodexDetailsDialog = ({
	monsterlingId,
	onClose,
}: CodexDetailsDialogProps) => {
	const ga = useGoogleAnalytics();
	const mutationScrollRef = useRef<HTMLDivElement>(null);
	const [stack, setStack] = useState<CodexDetailsFrame[]>([]);
	const frame = stack.at(-1);
	const frameMonsterlingId = frame?.monsterlingId;
	const monsterling = frame
		? MONSTERLINGS_DATA[frame.monsterlingId]
		: undefined;
	const family = useMemo(
		() =>
			frameMonsterlingId !== undefined
				? getMonsterlingMutationFamily(
						frameMonsterlingId,
						MONSTERLING_MUTATIONS_DATA,
					)
				: undefined,
		[frameMonsterlingId],
	);
	const hasMutation = Boolean(family?.recipes.length);

	useEffect(() => {
		if (monsterlingId === null) {
			setStack([]);
			return;
		}
		setStack([createFrame(monsterlingId)]);
	}, [monsterlingId]);

	useEffect(() => {
		if (!frame || frame.tab !== "mutation" || !mutationScrollRef.current) {
			return;
		}
		mutationScrollRef.current.scrollLeft = frame.scrollLeft;
		mutationScrollRef.current.scrollTop = frame.scrollTop;
	}, [frame]);

	const withCurrentScroll = (current: CodexDetailsFrame[]) => {
		const next = [...current];
		if (next.length === 0 || !mutationScrollRef.current) return next;
		next[next.length - 1] = {
			...next[next.length - 1],
			scrollLeft: mutationScrollRef.current.scrollLeft,
			scrollTop: mutationScrollRef.current.scrollTop,
		};
		return next;
	};

	const handleCloseOne = () => {
		setStack((current) => {
			const next = withCurrentScroll(current);
			if (next.length > 1) return next.slice(0, -1);
			onClose();
			return [];
		});
	};

	const handleOpenMonsterling = (nextMonsterlingId: number) => {
		if (nextMonsterlingId === frame?.monsterlingId) return;
		setStack((current) => {
			const next = withCurrentScroll(current);
			const existingIndex = next.findIndex(
				(entry) => entry.monsterlingId === nextMonsterlingId,
			);
			if (existingIndex >= 0) return next.slice(0, existingIndex + 1);
			return [...next, createFrame(nextMonsterlingId)];
		});
		ga.event(ANALYTICS_EVENTS.CODEX_MUTATION_TREE_OPEN, {
			monsterling_id: nextMonsterlingId,
		});
	};

	const handleTabChange = (tab: string) => {
		setStack((current) => {
			const next = withCurrentScroll(current);
			if (next.length === 0) return next;
			next[next.length - 1] = {
				...next[next.length - 1],
				tab: tab as CodexDetailsTab,
			};
			return next;
		});
	};

	return (
		<Dialog
			open={monsterlingId !== null}
			onOpenChange={(isOpen) => {
				if (!isOpen) handleCloseOne();
			}}
		>
			<DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-4xl">
				{monsterling && frame && family && (
					<>
						<DialogHeader className="pr-8">
							<div className="flex items-center gap-3 text-left">
								<img
									src={monsterling.image}
									alt=""
									width="64"
									height="64"
									className="size-16 object-contain drop-shadow-lg"
								/>
								<div>
									<DialogTitle>{monsterling.name}</DialogTitle>
									<DialogDescription>
										No. {monsterling.display_id ?? monsterling.id}
									</DialogDescription>
								</div>
							</div>
						</DialogHeader>
						<div className="rounded-lg border bg-muted/30 px-3 py-2 text-sm">
							<p className="font-medium">Ability</p>
							<p className="mt-1 text-muted-foreground">
								{monsterling.ability || "No published ability available."}
							</p>
						</div>

						<Tabs
							value={hasMutation ? frame.tab : "source"}
							onValueChange={handleTabChange}
						>
							<TabsList
								className={
									hasMutation
										? "grid w-full grid-cols-2"
										: "grid w-full grid-cols-1"
								}
							>
								<TabsTrigger value="source">Source</TabsTrigger>
								{hasMutation && (
									<TabsTrigger
										value="mutation"
										onClick={() => handleTabChange("mutation")}
									>
										Mutation Combination
									</TabsTrigger>
								)}
							</TabsList>
							<TabsContent value="source" className="pt-3">
								<div className="grid w-full gap-2">
									{monsterling.source_id.map((sourceId) => (
										<details
											key={sourceId}
											className="rounded-lg border bg-card text-sm"
										>
											<summary className="cursor-pointer px-3 py-2 font-medium">
												{MONSTERLINGS_SOURCE_DATA[sourceId].label}
											</summary>
											{sourceId === SOURCE_ID_BY_SOURCE.CAPTURE && (
												<div className="border-t px-3 py-2 text-muted-foreground">
													Locations coming soon.
												</div>
											)}
										</details>
									))}
								</div>
							</TabsContent>
							{hasMutation && (
								<TabsContent value="mutation" className="pt-3">
									{family.recipes.length === 0 ? (
										<p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
											No known mutation combinations for this Monsterling.
										</p>
									) : (
										<MutationFamilyTree
											family={family}
											selectedMonsterlingId={frame.monsterlingId}
											onSelectMonsterling={handleOpenMonsterling}
											scrollContainerRef={mutationScrollRef}
										/>
									)}
								</TabsContent>
							)}
						</Tabs>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};
