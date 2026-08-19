import { Info } from "lucide-react";
import { Tooltip } from "radix-ui";
import { ARTIFACTS_DATA } from "@/data/artifacts/ARTIFACTS_DATA";
import { CHARACTERS_DATA } from "@/data/characters/CHARACTERS_DATA";

type NavigationHiddenInfoProps = { catalog: "characters" | "artifacts" };

export const NavigationHiddenInfo = ({
	catalog,
}: NavigationHiddenInfoProps) => {
	const entries =
		catalog === "characters"
			? Object.values(CHARACTERS_DATA).flatMap((character) => [
					...(character.is_hidden ? [`Character: ${character.name}`] : []),
					...(character.costumes ?? [])
						.filter(({ is_hidden }) => is_hidden)
						.map(({ name }) => `Costume: ${character.name} — ${name}`),
				])
			: Object.values(ARTIFACTS_DATA)
					.filter(({ is_hidden }) => is_hidden)
					.map(({ name }) => `Artifact: ${name}`);

	return (
		<Tooltip.Provider delayDuration={200}>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<button
						type="button"
						aria-label={`Hidden ${catalog} details`}
						onPointerDown={(event) => event.preventDefault()}
						className="rounded p-1 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<Info className="size-4" />
					</button>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						side="right"
						sideOffset={8}
						className="z-50 w-56 rounded-md border bg-popover p-3 text-xs text-popover-foreground shadow-md"
					>
						<p className="font-semibold">Hidden in production</p>
						<ul>
							{entries.map((entry) => (
								<li key={entry}>{entry}</li>
							))}
						</ul>
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
};
