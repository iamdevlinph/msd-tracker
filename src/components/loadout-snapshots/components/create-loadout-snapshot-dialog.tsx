import { useEffect, useState } from "react";
import {
	LOADOUT_SNAPSHOT_TAG_LABELS,
	LOADOUT_SNAPSHOT_TAGS,
	type LoadoutSnapshotTag,
} from "@/components/loadout-snapshots/utils/loadout-snapshot-domain-values";
import { Button } from "@/components/ui/button";
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
import type { LoadoutOwned } from "@/stores/loadouts-slice";

type CreateLoadoutSnapshotDialogProps = {
	loadout: LoadoutOwned | null;
	onOpenChange: (open: boolean) => void;
	onCreate: (name: string, tag: LoadoutSnapshotTag) => void;
};

export const CreateLoadoutSnapshotDialog = ({
	loadout,
	onOpenChange,
	onCreate,
}: CreateLoadoutSnapshotDialogProps) => {
	const [name, setName] = useState("");
	const [tag, setTag] = useState<LoadoutSnapshotTag>(
		LOADOUT_SNAPSHOT_TAGS.OTHERS,
	);
	useEffect(() => {
		if (!loadout) return;
		setName(`${new Date().toLocaleDateString()} ${loadout.name} Snapshot`);
		setTag(LOADOUT_SNAPSHOT_TAGS.OTHERS);
	}, [loadout]);

	return (
		<Dialog open={loadout !== null} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<form
					className="grid gap-4"
					onSubmit={(event) => {
						event.preventDefault();
						if (name.trim()) onCreate(name.trim(), tag);
					}}
				>
					<DialogHeader>
						<DialogTitle>
							Name your “{loadout?.name ?? "loadout"}” snapshot
						</DialogTitle>
						<DialogDescription>
							Record this loadout and its current stats for future reference.
						</DialogDescription>
					</DialogHeader>
					<label
						htmlFor="loadout-snapshot-name"
						className="grid gap-2 text-sm font-medium"
					>
						Name
						<Input
							id="loadout-snapshot-name"
							autoFocus
							value={name}
							onChange={(event) => setName(event.target.value)}
							onFocus={(event) => event.currentTarget.select()}
						/>
					</label>
					<label
						htmlFor="loadout-snapshot-tag"
						className="grid gap-2 text-sm font-medium"
					>
						Tag
						<Select
							value={tag}
							onValueChange={(value) => setTag(value as LoadoutSnapshotTag)}
						>
							<SelectTrigger
								id="loadout-snapshot-tag"
								aria-label="Snapshot tag"
							>
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
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={!name.trim()}>
							Create snapshot
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
