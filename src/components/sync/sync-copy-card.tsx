import { readableBytes } from "common-utils-pkg";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { StoreState } from "@/stores/app-store";

type SyncCopy = NonNullable<StoreState["syncConflict"]>["local"];

type SyncCopyCardProps = {
	title: string;
	copy: SyncCopy;
	isNewer: boolean;
	isLarger: boolean;
};

export const SyncCopyCard = ({
	title,
	copy,
	isNewer,
	isLarger,
}: SyncCopyCardProps) => (
	<div className="min-w-0 max-w-full rounded border p-3">
		<div className="font-medium">{title}</div>
		<div>
			Last updated:{" "}
			<span
				className={isNewer ? "text-green-600 dark:text-green-400" : undefined}
			>
				{new Date(copy.updatedAt).toLocaleString()}
			</span>
		</div>
		<div>
			Size:{" "}
			<span
				className={isLarger ? "text-green-600 dark:text-green-400" : undefined}
			>
				{readableBytes(copy.size, { decimals: 2, minUnit: "kB" })}
			</span>
		</div>
		<Table className="min-w-[30rem]">
			<TableHeader>
				<TableRow>
					<TableHead scope="col">Characters</TableHead>
					<TableHead scope="col">Monsterlings</TableHead>
					<TableHead scope="col">Loadouts</TableHead>
					<TableHead scope="col">Codex</TableHead>
					<TableHead scope="col">Artifacts</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>{copy.metadata.charactersOwned}</TableCell>
					<TableCell>{copy.metadata.monsterlingsOwned}</TableCell>
					<TableCell>{copy.metadata.loadouts}</TableCell>
					<TableCell>{copy.metadata.codexCompleted}</TableCell>
					<TableCell>{copy.metadata.artifactsOwned ?? 0}</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	</div>
);
