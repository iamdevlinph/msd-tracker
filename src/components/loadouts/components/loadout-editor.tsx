import { isArtifactVisible } from "@/components/artifacts/utils/artifact-utils";
import { isCharacterVisible } from "@/components/characters/utils/character-utils";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";
import {
	EQUIPMENT_DATA,
	EQUIPMENT_PART_TYPES,
} from "@/data/equipment/EQUIPMENT_DATA";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { UNKNOWN_CHARACTER_PORTRAIT_IMAGE } from "@/image-constants";
import type { StoreState } from "@/stores/app-store";
import type {
	LoadoutCharacterSlot,
	LoadoutOwned,
} from "@/stores/loadouts-slice";
import { DEFAULT_PINNED_STAT_IDS } from "@/stores/loadouts-slice";
import { LoadoutCharacterStatsFields } from "./loadout-character-stats-fields";
import { LoadoutEditorArtifactSelector } from "./loadout-editor-artifact-selector";
import { LoadoutEditorCharacterSelector } from "./loadout-editor-character-selector";
import { LoadoutEditorEquipmentSelector } from "./loadout-editor-equipment-selector";
import { LoadoutEditorMonsterlingSelector } from "./loadout-editor-monsterling-selector";
import { CHARACTER_SLOT_INDEXES as SLOT_INDEXES } from "./loadout-slot-constants";

type LoadoutEditorProps = {
	draft: Omit<LoadoutOwned, "id">;
	activeTab: string;
	monsterlingsOwned: StoreState["monsterlingsOwned"];
	artifactsOwned: StoreState["artifactsOwned"];
	onNameChange: (name: string) => void;
	onNotesChange: (notes: string) => void;
	onActiveTabChange: (tab: string) => void;
	onOpenCharacterPicker: (characterIndex: number) => void;
	onOpenMonsterlingPicker: (
		characterIndex: number,
		legendary: boolean,
		monsterlingIndex?: number,
	) => void;
	onOpenArtifactPicker: (characterIndex: number) => void;
	onOpenEquipmentPicker: (
		characterIndex: number,
		partType: (typeof EQUIPMENT_PART_TYPES)[number],
	) => void;
	onUpdateSlot: (
		index: number,
		updater: (slot: LoadoutCharacterSlot) => LoadoutCharacterSlot,
	) => void;
};

export const LoadoutEditor = ({
	draft,
	activeTab,
	monsterlingsOwned,
	artifactsOwned,
	onNameChange,
	onNotesChange,
	onActiveTabChange,
	onOpenCharacterPicker,
	onOpenMonsterlingPicker,
	onOpenArtifactPicker,
	onOpenEquipmentPicker,
	onUpdateSlot,
}: LoadoutEditorProps) => (
	<div className="grid gap-4">
		<label htmlFor="loadout-name" className="grid gap-2 text-sm font-medium">
			Name
			<Input
				id="loadout-name"
				value={draft.name}
				onChange={(event) => onNameChange(event.target.value)}
			/>
		</label>
		<label htmlFor="loadout-notes" className="grid gap-2 text-sm font-medium">
			Notes
			<Textarea
				id="loadout-notes"
				value={draft.notes ?? ""}
				maxLength={2000}
				onChange={(event) => onNotesChange(event.target.value)}
				aria-describedby="loadout-notes-count"
			/>
			<span id="loadout-notes-count" className="text-xs text-muted-foreground">
				{(draft.notes ?? "").length}/2000
			</span>
		</label>
		<Tabs value={activeTab} onValueChange={onActiveTabChange} className="gap-4">
			<TabsList className="grid w-full grid-cols-3 divide-x divide-border group-data-[orientation=horizontal]/tabs:h-[4.375rem]">
				{SLOT_INDEXES.map((index) => {
					const characterId = draft.characters[index].characterId;
					const catalogCharacter =
						characterId === null ? null : CHARACTERS_DATA[characterId];
					const character =
						catalogCharacter && isCharacterVisible(catalogCharacter)
							? catalogCharacter
							: null;
					return (
						<TabsTrigger
							key={index}
							value={String(index)}
							className="h-16 min-w-0 px-1 py-2 after:hidden data-[state=active]:bg-primary/20 dark:data-[state=active]:bg-primary/25"
						>
							<img
								src={
									character?.portraitImage ?? UNKNOWN_CHARACTER_PORTRAIT_IMAGE
								}
								alt=""
								className="size-10 shrink-0 rounded-sm object-cover"
							/>
							<span className="min-w-0 truncate">
								{character?.name ?? `Character ${index + 1}`}
							</span>
						</TabsTrigger>
					);
				})}
			</TabsList>
			{SLOT_INDEXES.map((index) => {
				const slot = draft.characters[index];
				const catalogCharacter =
					slot.characterId === null ? null : CHARACTERS_DATA[slot.characterId];
				const character =
					catalogCharacter && isCharacterVisible(catalogCharacter)
						? catalogCharacter
						: null;
				const artifactId = slot.artifactInstanceId;
				const artifactOwned = artifactId ? artifactsOwned[artifactId] : null;
				const catalogArtifact = artifactOwned
					? ARTIFACTS_DATA[artifactOwned.artifact_id]
					: null;
				const artifact =
					catalogArtifact && isArtifactVisible(catalogArtifact)
						? catalogArtifact
						: null;
				const equipmentIds = slot.equipment_ids ?? [null, null, null, null];
				return (
					<TabsContent
						key={index}
						value={String(index)}
						className="grid gap-4 rounded-md border p-3"
					>
						<LoadoutEditorCharacterSelector
							character={character}
							characterId={slot.characterId}
							characterIndex={index}
							onOpen={() => onOpenCharacterPicker(index)}
							onClear={() =>
								onUpdateSlot(index, (current) => ({
									...current,
									characterId: null,
									stat_values: {},
									pinned_stat_ids: [...DEFAULT_PINNED_STAT_IDS],
								}))
							}
						/>
						<div className="grid grid-cols-4 gap-2">
							<div className="col-span-4 grid grid-cols-4 gap-2">
								<LoadoutEditorArtifactSelector
									artifact={artifact}
									owned={artifactOwned}
									artifactId={artifactId}
									onOpen={() => onOpenArtifactPicker(index)}
									onClear={() =>
										onUpdateSlot(index, (current) => ({
											...current,
											artifactInstanceId: null,
										}))
									}
								/>
								<LoadoutCharacterStatsFields
									slot={slot}
									onChange={(next) => onUpdateSlot(index, () => next)}
								/>
							</div>
							<div className="col-span-4 grid grid-cols-4 gap-2">
								{EQUIPMENT_PART_TYPES.map((partType, equipmentIndex) => {
									const equipmentId = equipmentIds[equipmentIndex];
									return (
										<LoadoutEditorEquipmentSelector
											key={partType}
											partType={partType}
											equipment={
												equipmentId ? EQUIPMENT_DATA[equipmentId] : null
											}
											onOpen={() => onOpenEquipmentPicker(index, partType)}
											onClear={() =>
												onUpdateSlot(index, (current) => {
													const equipment_ids = [
														...(current.equipment_ids ?? [
															null,
															null,
															null,
															null,
														]),
													] as NonNullable<
														LoadoutCharacterSlot["equipment_ids"]
													>;
													equipment_ids[equipmentIndex] = null;
													return { ...current, equipment_ids };
												})
											}
										/>
									);
								})}
							</div>
							{[...SLOT_INDEXES, "legendary" as const].map((monsterIndex) => {
								const legendary = monsterIndex === "legendary";
								const id = legendary
									? (slot.legendaryMonsterlingId ?? null)
									: slot.monsterlingIds[monsterIndex];
								const owned = id ? monsterlingsOwned[id] : null;
								const info = owned
									? MONSTERLINGS_DATA[owned.monsterling_id]
									: null;
								return (
									<LoadoutEditorMonsterlingSelector
										key={String(monsterIndex)}
										info={info}
										tier={owned?.tier_id ?? null}
										id={id}
										monsterIndex={monsterIndex}
										onOpen={() =>
											onOpenMonsterlingPicker(
												index,
												legendary,
												legendary ? undefined : monsterIndex,
											)
										}
										onClear={() =>
											onUpdateSlot(index, (current) =>
												legendary
													? { ...current, legendaryMonsterlingId: null }
													: {
															...current,
															monsterlingIds: current.monsterlingIds.map(
																(value, itemIndex) =>
																	itemIndex === monsterIndex ? null : value,
															) as LoadoutCharacterSlot["monsterlingIds"],
														},
											)
										}
									/>
								);
							})}
						</div>
					</TabsContent>
				);
			})}
		</Tabs>
	</div>
);
