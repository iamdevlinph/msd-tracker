import { zodResolver } from "@hookform/resolvers/zod";
import { type FormEvent, type KeyboardEvent, useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import {
	LOADOUT_SNAPSHOT_CONQUEST_BOSS_IDS,
	LOADOUT_SNAPSHOT_DIFFICULTIES,
	LOADOUT_SNAPSHOT_DIFFICULTY_OPTIONS,
	LOADOUT_SNAPSHOT_ELEMENT_OPTIONS,
	LOADOUT_SNAPSHOT_TAG_LABELS,
	LOADOUT_SNAPSHOT_TAGS,
	type LoadoutSnapshotConquestBossId,
	type LoadoutSnapshotElement,
	type LoadoutSnapshotTag,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import {
	formatLoadoutSnapshotNameForTag,
	formatNewLoadoutSnapshotName,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-name";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ELEMENTS_DATA } from "@/data/elements/ELEMENTS_DATA";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import type {
	LoadoutSnapshot,
	LoadoutSnapshotDetails,
} from "@/stores/loadout-snapshots-slice";
import type { LoadoutOwned } from "@/stores/loadouts-slice";

const formSchema = z
	.object({
		name: z.string().trim().min(1),
		tag: z.enum(["conquest", "rift", "legendary_conquest", "others"]),
		notes: z.string().max(2000),
		difficulty: z.string(),
		level: z.string(),
		clear_time: z.string(),
		boss_id: z.string(),
		element_id: z.string(),
		res_element_ids: z.array(z.string()),
		score: z.string(),
	})
	.superRefine((value, context) => {
		const level = Number(value.level);
		const score = Number(value.score);
		if (value.tag === LOADOUT_SNAPSHOT_TAGS.CONQUEST) {
			if (
				!LOADOUT_SNAPSHOT_CONQUEST_BOSS_IDS.some(
					(id) => String(id) === value.boss_id,
				)
			)
				context.addIssue({
					code: "custom",
					path: ["boss_id"],
					message: "Select a boss",
				});
			if (
				!Object.values(LOADOUT_SNAPSHOT_DIFFICULTIES).includes(
					value.difficulty as never,
				)
			)
				context.addIssue({
					code: "custom",
					path: ["difficulty"],
					message: "Select a difficulty",
				});
			if (!Number.isInteger(level) || level < 1 || level > 10)
				context.addIssue({
					code: "custom",
					path: ["level"],
					message: "Select a level",
				});
			if (!/^\d{2}:[0-5]\d\.\d{2}$/.test(value.clear_time))
				context.addIssue({
					code: "custom",
					path: ["clear_time"],
					message: "Use MM:SS.cc",
				});
		}
		if (value.tag === LOADOUT_SNAPSHOT_TAGS.RIFT) {
			if (!Number.isInteger(level) || level < 1 || level > 50)
				context.addIssue({
					code: "custom",
					path: ["level"],
					message: "Enter a level from 1 to 50",
				});
			if (value.score !== "" && (!Number.isInteger(score) || score < 0))
				context.addIssue({
					code: "custom",
					path: ["score"],
					message: "Enter a nonnegative whole number",
				});
		}
		if (value.tag === LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST) {
			if (
				!LOADOUT_SNAPSHOT_ELEMENT_OPTIONS.some(
					({ value: id }) => String(id) === value.element_id,
				)
			)
				context.addIssue({
					code: "custom",
					path: ["element_id"],
					message: "Select an element",
				});
			if (value.score === "" || !Number.isInteger(score) || score < 0)
				context.addIssue({
					code: "custom",
					path: ["score"],
					message: "Enter a nonnegative whole number",
				});
		}
	});
type FormValues = z.input<typeof formSchema>;

const CONQUEST_BOSS_OPTIONS = LOADOUT_SNAPSHOT_CONQUEST_BOSS_IDS.map((id) => ({
	value: id,
	name: MONSTERLINGS_DATA[id].name,
	image: MONSTERLINGS_DATA[id].image,
}));

const formatLoadoutSnapshotClearTime = (raw: string): string => {
	const digits = raw.replace(/\D/g, "").slice(0, 6).padEnd(6, "0");
	return `${digits.slice(0, 2)}:${digits.slice(2, 4)}.${digits.slice(4)}`;
};

const CLEAR_TIME_SEGMENTS = [
	[0, 2],
	[3, 5],
	[6, 8],
] as const;

const valuesFor = (
	loadout: LoadoutOwned | null,
	snapshot?: LoadoutSnapshot | null,
): FormValues => {
	const details = snapshot?.details;
	return {
		name:
			snapshot?.name ??
			(loadout ? formatNewLoadoutSnapshotName(loadout.name) : ""),
		tag: snapshot?.tag ?? LOADOUT_SNAPSHOT_TAGS.OTHERS,
		notes: snapshot?.notes ?? "",
		difficulty:
			details && "difficulty" in details
				? details.difficulty
				: LOADOUT_SNAPSHOT_DIFFICULTIES.NORMAL,
		level: details && "level" in details ? String(details.level) : "1",
		clear_time:
			details && "clear_time" in details ? details.clear_time : "00:00.00",
		boss_id:
			details && "boss_id" in details && details.boss_id !== undefined
				? String(details.boss_id)
				: "",
		element_id:
			details && "element_id" in details ? String(details.element_id) : "1",
		res_element_ids:
			details && "res_element_ids" in details
				? (details.res_element_ids ?? []).map(String)
				: [],
		score:
			details && "score" in details && details.score !== undefined
				? String(details.score)
				: "",
	};
};

type SnapshotDialogProps = {
	loadout: LoadoutOwned | null;
	snapshot?: LoadoutSnapshot | null;
	onOpenChange: (open: boolean) => void;
	onSubmit: (value: {
		name: string;
		tag: LoadoutSnapshotTag;
		notes: string;
		details: LoadoutSnapshotDetails | null;
	}) => void;
};

export const LoadoutSnapshotDialog = ({
	loadout,
	snapshot = null,
	onOpenChange,
	onSubmit,
}: SnapshotDialogProps) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		mode: "onChange",
		defaultValues: valuesFor(loadout, snapshot),
	});
	const tag = useWatch({ control: form.control, name: "tag" });
	const notes = useWatch({ control: form.control, name: "notes" });
	const resElementIds = useWatch({
		control: form.control,
		name: "res_element_ids",
	});
	const bossId = useWatch({ control: form.control, name: "boss_id" });
	const clearTime = useWatch({ control: form.control, name: "clear_time" });
	const selectedBoss = bossId ? MONSTERLINGS_DATA[Number(bossId)] : undefined;
	const clearTimeSegment = useRef(0);
	const clearTimeDigit = useRef(0);
	const open = loadout !== null || snapshot !== null;
	useEffect(() => {
		if (open) form.reset(valuesFor(loadout, snapshot));
	}, [form, loadout, open, snapshot]);
	const watchedValues = form.watch();
	const isValid = formSchema.safeParse(watchedValues).success;
	const toggleResElement = (elementId: LoadoutSnapshotElement) => {
		const value = String(elementId);
		form.setValue(
			"res_element_ids",
			resElementIds.includes(value)
				? resElementIds.filter((id) => id !== value)
				: [...resElementIds, value],
			{ shouldDirty: true, shouldValidate: true },
		);
	};
	const setClampedInteger = (
		field: "level" | "score",
		rawValue: string,
		minimum: number,
		maximum?: number,
	) => {
		if (rawValue === "") {
			form.setValue(field, "", { shouldDirty: true, shouldValidate: true });
			return;
		}
		const numericValue = Number(rawValue);
		if (!Number.isFinite(numericValue)) return;
		const wholeValue = Math.trunc(numericValue);
		const clampedValue = Math.min(
			maximum ?? Number.POSITIVE_INFINITY,
			Math.max(minimum, wholeValue),
		);
		form.setValue(field, String(clampedValue), {
			shouldDirty: true,
			shouldValidate: true,
		});
	};
	const selectClearTimeSegment = (
		input: HTMLInputElement,
		segment: number,
		shouldDefer = false,
	) => {
		clearTimeSegment.current = segment;
		clearTimeDigit.current = 0;
		const [start, end] = CLEAR_TIME_SEGMENTS[segment];
		if (shouldDefer) {
			requestAnimationFrame(() => input.setSelectionRange(start, end));
			return;
		}
		input.setSelectionRange(start, end);
	};
	const handleClearTimeKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		const input = event.currentTarget;
		if (/^\d$/.test(event.key)) {
			event.preventDefault();
			const segment = clearTimeSegment.current;
			const digit = clearTimeDigit.current;
			const position = CLEAR_TIME_SEGMENTS[segment][0] + digit;
			const characters = clearTime.split("");
			characters[position] = event.key;
			form.setValue("clear_time", characters.join(""), {
				shouldDirty: true,
				shouldValidate: true,
			});
			if (digit === 1) {
				selectClearTimeSegment(
					input,
					Math.min(segment + 1, CLEAR_TIME_SEGMENTS.length - 1),
					true,
				);
				return;
			}
			clearTimeDigit.current = 1;
			input.setSelectionRange(position + 1, position + 2);
			return;
		}
		if (event.key === "Backspace" || event.key === "Delete") {
			event.preventDefault();
			const segment = clearTimeSegment.current;
			const [start, end] = CLEAR_TIME_SEGMENTS[segment];
			form.setValue(
				"clear_time",
				`${clearTime.slice(0, start)}00${clearTime.slice(end)}`,
				{ shouldDirty: true, shouldValidate: true },
			);
			selectClearTimeSegment(input, segment, true);
		}
	};
	const submit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const parsed = formSchema.safeParse(form.getValues());
		if (!parsed.success) return;
		const value = parsed.data;
		let details: LoadoutSnapshotDetails | null = null;
		if (value.tag === LOADOUT_SNAPSHOT_TAGS.CONQUEST)
			details = {
				difficulty:
					value.difficulty as typeof LOADOUT_SNAPSHOT_DIFFICULTIES.NORMAL,
				level: Number(value.level),
				clear_time: value.clear_time,
				boss_id: Number(value.boss_id) as LoadoutSnapshotConquestBossId,
				res_element_ids: value.res_element_ids.map(
					(elementId) => Number(elementId) as LoadoutSnapshotElement,
				),
			};
		if (value.tag === LOADOUT_SNAPSHOT_TAGS.RIFT)
			details = {
				level: Number(value.level),
				...(value.score === "" ? {} : { score: Number(value.score) }),
			};
		if (value.tag === LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST)
			details = {
				element_id: Number(value.element_id) as 1,
				score: Number(value.score),
				res_element_ids: value.res_element_ids.map(
					(elementId) => Number(elementId) as LoadoutSnapshotElement,
				),
			};
		onSubmit({
			name:
				snapshot && snapshot.tag !== value.tag
					? formatLoadoutSnapshotNameForTag(value.name, value.tag)
					: value.name.trim(),
			tag: value.tag,
			notes: value.notes,
			details,
		});
	};
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<form className="grid gap-4" onSubmit={submit}>
					<DialogHeader>
						<DialogTitle>
							{snapshot
								? "Edit loadout snapshot"
								: `${loadout?.name ?? "Loadout"} Snapshot`}
						</DialogTitle>
						<DialogDescription>
							Save category metadata without changing the captured build.
						</DialogDescription>
					</DialogHeader>
					<label
						htmlFor="snapshot-name"
						className="grid gap-2 text-sm font-medium"
					>
						Name
						<Input id="snapshot-name" autoFocus {...form.register("name")} />
					</label>
					<label
						htmlFor="snapshot-tag"
						className="grid gap-2 text-sm font-medium"
					>
						Tag
						<Select
							value={tag}
							onValueChange={(value) => {
								form.setValue("tag", value as LoadoutSnapshotTag, {
									shouldValidate: true,
								});
							}}
						>
							<SelectTrigger id="snapshot-tag" aria-label="Snapshot tag">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{Object.entries(LOADOUT_SNAPSHOT_TAG_LABELS).map(
									([value, label]) => (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									),
								)}
							</SelectContent>
						</Select>
					</label>
					{tag === LOADOUT_SNAPSHOT_TAGS.CONQUEST && (
						<>
							<label
								htmlFor="snapshot-conquest-boss"
								className="grid gap-2 text-sm font-medium"
							>
								Boss
								<Select
									value={bossId}
									onValueChange={(value) =>
										form.setValue("boss_id", value, {
											shouldValidate: true,
										})
									}
								>
									<SelectTrigger id="snapshot-conquest-boss" aria-label="Boss">
										<SelectValue placeholder="Select a boss">
											{selectedBoss ? (
												<>
													<img
														src={selectedBoss.image}
														width="24"
														height="24"
														alt={`${selectedBoss.name} icon`}
													/>
													{selectedBoss.name}
												</>
											) : undefined}
										</SelectValue>
									</SelectTrigger>
									<SelectContent>
										{CONQUEST_BOSS_OPTIONS.map((option) => (
											<SelectItem
												key={option.value}
												value={String(option.value)}
											>
												<img
													src={option.image}
													width="24"
													height="24"
													alt={`${option.name} icon`}
												/>
												{option.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</label>
							<label
								htmlFor="snapshot-difficulty"
								className="grid gap-2 text-sm font-medium"
							>
								Difficulty
								<Select
									value={form.watch("difficulty")}
									onValueChange={(value) =>
										form.setValue("difficulty", value, { shouldValidate: true })
									}
								>
									<SelectTrigger
										id="snapshot-difficulty"
										aria-label="Difficulty"
									>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{LOADOUT_SNAPSHOT_DIFFICULTY_OPTIONS.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</label>
							<fieldset className="grid gap-2">
								<legend className="text-sm font-medium">RES Element</legend>
								<ButtonGroup
									className="flex flex-wrap"
									aria-label="RES Element"
								>
									{LOADOUT_SNAPSHOT_ELEMENT_OPTIONS.map((option) => {
										const selected = resElementIds.includes(
											String(option.value),
										);
										return (
											<Button
												key={option.value}
												type="button"
												className="border"
												variant={selected ? "default" : "outline"}
												aria-label={`${option.label} RES Element`}
												aria-pressed={selected}
												onClick={() => toggleResElement(option.value)}
											>
												<img
													src={ELEMENTS_DATA[option.value].image}
													width="25"
													height="25"
													alt={`${option.label} icon`}
												/>
											</Button>
										);
									})}
								</ButtonGroup>
							</fieldset>
							<label
								htmlFor="snapshot-conquest-level"
								className="grid gap-2 text-sm font-medium"
							>
								Level
								<Select
									value={form.watch("level")}
									onValueChange={(value) =>
										form.setValue("level", value, { shouldValidate: true })
									}
								>
									<SelectTrigger
										id="snapshot-conquest-level"
										aria-label="Level"
									>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{Array.from({ length: 10 }, (_, index) =>
											String(index + 1),
										).map((level) => (
											<SelectItem key={level} value={level}>
												{level}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</label>
							<label
								htmlFor="snapshot-clear-time"
								className="grid gap-2 text-sm font-medium"
							>
								Clear time
								<Input
									id="snapshot-clear-time"
									inputMode="numeric"
									placeholder="MM:SS.cc"
									value={clearTime}
									onFocus={(event) =>
										selectClearTimeSegment(event.currentTarget, 0)
									}
									onClick={(event) =>
										selectClearTimeSegment(event.currentTarget, 0)
									}
									onKeyDown={handleClearTimeKeyDown}
									onChange={(event) => {
										form.setValue(
											"clear_time",
											formatLoadoutSnapshotClearTime(event.currentTarget.value),
											{ shouldDirty: true, shouldValidate: true },
										);
									}}
									onPaste={(event) => {
										event.preventDefault();
										form.setValue(
											"clear_time",
											formatLoadoutSnapshotClearTime(
												event.clipboardData.getData("text"),
											),
											{ shouldDirty: true, shouldValidate: true },
										);
										selectClearTimeSegment(event.currentTarget, 2, true);
									}}
								/>
								{form.formState.errors.clear_time && (
									<span className="text-xs text-destructive">
										{form.formState.errors.clear_time.message}
									</span>
								)}
							</label>
						</>
					)}
					{tag === LOADOUT_SNAPSHOT_TAGS.RIFT && (
						<>
							<label
								htmlFor="snapshot-rift-level"
								className="grid gap-2 text-sm font-medium"
							>
								Level
								<Input
									id="snapshot-rift-level"
									type="number"
									min={1}
									max={50}
									{...form.register("level")}
									onChange={(event) =>
										setClampedInteger("level", event.currentTarget.value, 1, 50)
									}
								/>
							</label>
							<label
								htmlFor="snapshot-rift-score"
								className="grid gap-2 text-sm font-medium"
							>
								Score (optional)
								<Input
									id="snapshot-rift-score"
									type="number"
									min={0}
									step={1}
									{...form.register("score")}
									onChange={(event) =>
										setClampedInteger("score", event.currentTarget.value, 0)
									}
								/>
							</label>
						</>
					)}
					{tag === LOADOUT_SNAPSHOT_TAGS.LEGENDARY_CONQUEST && (
						<>
							<fieldset className="grid gap-2">
								<legend className="text-sm font-medium">Element</legend>
								<ButtonGroup className="flex flex-wrap" aria-label="Element">
									{LOADOUT_SNAPSHOT_ELEMENT_OPTIONS.map((option) => (
										<Button
											key={option.value}
											type="button"
											className="border"
											variant={
												form.watch("element_id") === String(option.value)
													? "default"
													: "outline"
											}
											aria-pressed={
												form.watch("element_id") === String(option.value)
											}
											onClick={() =>
												form.setValue("element_id", String(option.value), {
													shouldValidate: true,
												})
											}
										>
											<img
												src={ELEMENTS_DATA[option.value].image}
												width="25"
												height="25"
												alt={`${option.label} icon`}
											/>
										</Button>
									))}
								</ButtonGroup>
							</fieldset>
							<fieldset className="grid gap-2">
								<legend className="text-sm font-medium">RES Element</legend>
								<ButtonGroup
									className="flex flex-wrap"
									aria-label="RES Element"
								>
									{LOADOUT_SNAPSHOT_ELEMENT_OPTIONS.map((option) => {
										const selected = resElementIds.includes(
											String(option.value),
										);
										return (
											<Button
												key={option.value}
												type="button"
												className="border"
												variant={selected ? "default" : "outline"}
												aria-label={`${option.label} RES Element`}
												aria-pressed={selected}
												onClick={() => toggleResElement(option.value)}
											>
												<img
													src={ELEMENTS_DATA[option.value].image}
													width="25"
													height="25"
													alt={`${option.label} icon`}
												/>
											</Button>
										);
									})}
								</ButtonGroup>
							</fieldset>
							<label
								htmlFor="snapshot-legendary-score"
								className="grid gap-2 text-sm font-medium"
							>
								Score
								<Input
									id="snapshot-legendary-score"
									type="number"
									min={0}
									step={1}
									{...form.register("score")}
									onChange={(event) =>
										setClampedInteger("score", event.currentTarget.value, 0)
									}
								/>
							</label>
						</>
					)}
					<label
						htmlFor="snapshot-notes"
						className="grid gap-2 text-sm font-medium"
					>
						Notes
						<Textarea
							id="snapshot-notes"
							maxLength={2000}
							{...form.register("notes")}
						/>
						<span className="text-right text-xs text-muted-foreground">
							{notes.length}/2000
						</span>
					</label>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={!isValid}>
							{snapshot ? "Save changes" : "Create snapshot"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

type CreateLoadoutSnapshotDialogProps = Omit<
	SnapshotDialogProps,
	"snapshot" | "onSubmit"
> & {
	onCreate: (
		name: string,
		tag: LoadoutSnapshotTag,
		notes: string,
		details: LoadoutSnapshotDetails | null,
	) => void;
};
export const CreateLoadoutSnapshotDialog = ({
	onCreate,
	...props
}: CreateLoadoutSnapshotDialogProps) => (
	<LoadoutSnapshotDialog
		{...props}
		onSubmit={({ name, tag, notes, details }) =>
			onCreate(name, tag, notes, details)
		}
	/>
);
