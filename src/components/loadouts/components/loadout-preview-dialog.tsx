import { CopyIcon, DownloadIcon } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useGoogleAnalytics } from "tanstack-router-ga4";
import { getAwakeningBonus } from "@/components/characters/utils/character-utils";
import { MonsterlingCard } from "@/components/monsterlings/components/monsterling-card";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/ELEMENTS_DATA";
import { IMAGE_MAPPING, IMAGE_MAPPING_ID } from "@/data/IMAGE_MAPPING_DATA";
import { MONSTERLINGS_DATA } from "@/data/MONSTERLINGS_DATA";
import { TIERS_DATA } from "@/data/TIERS_DATA";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { useAppStore } from "@/stores/app-store";
import type {
	LoadoutCharacterSlot,
	LoadoutOwned,
} from "@/stores/loadouts-slice";

const SLOTS = [0, 1, 2] as const;
const SKILLS = [
	["Basic", IMAGE_MAPPING_ID.SKILL_BASIC, "basic"],
	["Switch", IMAGE_MAPPING_ID.SKILL_SWITCH, "switch"],
	["Special", IMAGE_MAPPING_ID.SKILL_SPECIAL, "special"],
	["Ultimate", IMAGE_MAPPING_ID.SKILL_ULTIMATE, "ultimate"],
] as const;

type Props = {
	loadout: LoadoutOwned | null;
	onOpenChange: (open: boolean) => void;
};

const waitForAssets = async (node: HTMLElement) => {
	await document.fonts?.ready;
	await Promise.all(
		Array.from(node.querySelectorAll("img")).map(async (image) => {
			if (!image.complete) {
				await new Promise<void>((resolve) => {
					image.addEventListener("load", () => resolve(), { once: true });
					image.addEventListener("error", () => resolve(), { once: true });
				});
			}
			await image.decode?.().catch(() => undefined);
		}),
	);
};

const safeFilename = (name: string) =>
	`${
		name
			.normalize("NFKD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/[^a-zA-Z0-9]+/g, "-")
			.replace(/^-|-$/g, "")
			.toLowerCase() || "loadout"
	}.png`;

export const LoadoutPreviewDialog = ({ loadout, onOpenChange }: Props) => {
	const ga = useGoogleAnalytics();
	const surfaceRef = useRef<HTMLDivElement>(null);
	const [rendering, setRendering] = useState(false);
	const charactersOwned = useAppStore((s) => s.charactersOwned);
	const monsterlingsOwned = useAppStore((s) => s.monsterlingsOwned);

	const imageBlob = async () => {
		const node = surfaceRef.current;
		if (!node) throw new Error("Preview is not ready.");
		await waitForAssets(node);
		const { toBlob } = await import("html-to-image");
		const blob = await toBlob(node, {
			pixelRatio: 2,
			cacheBust: true,
			backgroundColor: getComputedStyle(node).backgroundColor,
		});
		if (!blob) throw new Error("Could not render the preview.");
		return blob;
	};

	const copy = async () => {
		ga.event(ANALYTICS_EVENTS.LOADOUT_COPY_ATTEMPT);
		setRendering(true);
		try {
			const blob = imageBlob();
			await navigator.clipboard.write([
				new ClipboardItem({ "image/png": blob }),
			]);
			toast.success("Loadout image copied");
			ga.event(ANALYTICS_EVENTS.LOADOUT_COPY_SUCCESS);
		} catch (error) {
			ga.event(ANALYTICS_EVENTS.LOADOUT_COPY_FAILURE);
			toast.error(
				error instanceof Error ? error.message : "Could not copy image",
			);
		} finally {
			setRendering(false);
		}
	};

	const download = async () => {
		ga.event(ANALYTICS_EVENTS.LOADOUT_DOWNLOAD_ATTEMPT);
		setRendering(true);
		try {
			const blob = await imageBlob();
			const url = URL.createObjectURL(blob);
			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.download = safeFilename(loadout?.name ?? "loadout");
			anchor.click();
			URL.revokeObjectURL(url);
			toast.success("Loadout image downloaded");
			ga.event(ANALYTICS_EVENTS.LOADOUT_DOWNLOAD_SUCCESS);
		} catch (error) {
			ga.event(ANALYTICS_EVENTS.LOADOUT_DOWNLOAD_FAILURE);
			toast.error(
				error instanceof Error ? error.message : "Could not download image",
			);
		} finally {
			setRendering(false);
		}
	};

	return (
		<Dialog open={!!loadout} onOpenChange={onOpenChange}>
			<DialogContent className="grid max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-none grid-rows-[auto_auto_minmax(0,1fr)] gap-0 overflow-hidden p-0 sm:max-w-[calc(100%-2rem)] 2xl:max-w-[1640px]">
				<DialogHeader className="border-b p-4 pr-14">
					<DialogTitle>{loadout?.name ?? "Loadout preview"}</DialogTitle>
					<DialogDescription>
						Share-ready character and monsterling overview.
					</DialogDescription>
				</DialogHeader>
				<div className="flex justify-end gap-2 border-b p-3">
					<Button onClick={copy} disabled={rendering} variant="outline">
						{rendering ? <Spinner /> : <CopyIcon />}
						Copy image
					</Button>
					<Button onClick={download} disabled={rendering} variant="outline">
						{rendering ? <Spinner /> : <DownloadIcon />}
						Download image
					</Button>
				</div>
				<div className="min-h-0 overflow-auto bg-muted/30 p-4">
					<div
						ref={surfaceRef}
						data-testid="loadout-share-surface"
						className="grid w-[1600px] gap-4 bg-background p-3 text-foreground"
					>
						<header className="flex items-baseline justify-between border-b border-primary/60 px-1 pb-3">
							<h2 className="text-2xl font-bold">{loadout?.name}</h2>
							<span className="text-sm text-muted-foreground">
								Team Loadout
							</span>
						</header>
						{loadout &&
							SLOTS.map((index) => (
								<PreviewRow
									key={`${loadout.id}-character-${index + 1}`}
									slot={loadout.characters[index]}
									characterOwned={
										loadout.characters[index].characterId === null
											? undefined
											: charactersOwned[loadout.characters[index].characterId]
									}
									monsterlingsOwned={monsterlingsOwned}
								/>
							))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

type RowProps = {
	slot: LoadoutCharacterSlot;
	characterOwned?: ReturnType<
		typeof useAppStore.getState
	>["charactersOwned"][number];
	monsterlingsOwned: ReturnType<
		typeof useAppStore.getState
	>["monsterlingsOwned"];
};

const PreviewRow = ({ slot, characterOwned, monsterlingsOwned }: RowProps) => {
	const character =
		slot.characterId === null ? null : CHARACTERS_DATA[slot.characterId];
	const validCharacter = character && characterOwned;

	return (
		<section className="grid grid-cols-[184px_repeat(3,330px)_342px] items-center gap-3 border-b border-border/70 pb-4 last:border-0 last:pb-0">
			{validCharacter ? (
				<div className="grid h-[120px] grid-cols-[80px_1fr] overflow-hidden rounded-lg border bg-card">
					<div
						className="relative bg-cover bg-center"
						style={{
							backgroundImage: `url(${TIERS_DATA[character.tier_id].full})`,
						}}
					>
						<img
							src={character.portraitImage}
							alt={`${character.name} portrait`}
							className="size-full object-contain"
						/>
					</div>
					<div className="grid content-center gap-2 p-2">
						<strong className="truncate text-sm">{character.name}</strong>
						<div className="flex gap-1.5">
							<img
								src={ELEMENTS_DATA[character.element_id].image}
								alt={`${ELEMENTS_DATA[character.element_id].element} icon`}
								className="size-6"
							/>
							<span
								className="grid size-6 place-items-center rounded-full bg-primary/20 text-xs font-bold text-primary"
								title={`Awakening ${characterOwned.awakening}`}
							>
								A{characterOwned.awakening}
							</span>
						</div>
						<div className="grid grid-cols-4 gap-1">
							{SKILLS.map(([label, icon, key]) => (
								<div
									key={key}
									className="grid place-items-center gap-0.5"
									title={`${label} level ${characterOwned.skills[key] + getAwakeningBonus(characterOwned.awakening)}`}
								>
									<img
										src={IMAGE_MAPPING[icon].image}
										alt={`${label} skill icon`}
										className="size-4"
									/>
									<span className="text-xs font-bold text-amber-400">
										{characterOwned.skills[key] +
											getAwakeningBonus(characterOwned.awakening)}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			) : (
				<Placeholder label="Character unavailable" />
			)}
			{SLOTS.map((index) => (
				<MonsterlingSlot
					key={index}
					id={slot.monsterlingIds[index]}
					owned={monsterlingsOwned}
					label={`Monsterling ${index + 1} unavailable`}
				/>
			))}
			<div className="border-l-2 border-primary pl-3">
				<MonsterlingSlot
					id={slot.legendaryMonsterlingId ?? null}
					owned={monsterlingsOwned}
					label="Legendary unavailable"
				/>
			</div>
		</section>
	);
};

const MonsterlingSlot = ({
	id,
	owned,
	label,
}: {
	id: string | null;
	owned: RowProps["monsterlingsOwned"];
	label: string;
}) => {
	const monsterling = id ? owned[id] : null;
	return monsterling && MONSTERLINGS_DATA[monsterling.monsterling_id] ? (
		<MonsterlingCard {...monsterling} />
	) : (
		<Placeholder label={label} />
	);
};

const Placeholder = ({ label }: { label: string }) => (
	<div className="grid h-[120px] w-full place-items-center rounded-lg border border-dashed bg-muted/20 text-sm text-muted-foreground">
		{label}
	</div>
);
