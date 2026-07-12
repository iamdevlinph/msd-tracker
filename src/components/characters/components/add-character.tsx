import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import CharacterCard from "@/components/characters/components/character-card";
import { CharacterOwnedDetailsForm } from "@/components/characters/components/character-details-form";
import { CharacterFilter } from "@/components/characters/components/character-filter";
import { TierPortrait } from "@/components/shared/tier-portrait";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

export function AddCharacter() {
	const charactersOwned = useAppStore((s) => s.charactersOwned);

	const [open, setOpen] = useState(false);
	const [charToAdd, setCharToAdd] = useState<null | number>(null);
	const hasSelectedChar = !!charToAdd;

	const charToAddInfo = hasSelectedChar ? CHARACTERS_DATA[charToAdd] : null;

	const ownedSet = new Set(Object.values(charactersOwned).map((c) => c.id));

	const noCharsToAdd =
		Object.keys(charactersOwned).length === Object.keys(CHARACTERS_DATA).length;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="default" className="w-min">
					Add Character
				</Button>
			</DialogTrigger>
			<DialogContent
				className={cn(
					"overflow-y-auto max-h-screen",
					"max-w-sm sm:min-w-min lg:min-w-218",
					hasSelectedChar && "lg:min-w-max",
					"h-[calc(100dvh-50px)] lg:h-min",
				)}
				onCloseAutoFocus={() => setCharToAdd(null)}
			>
				<DialogHeader>
					<div className="flex gap-5 items-center">
						<DialogTitle>
							{hasSelectedChar ? charToAddInfo?.name : "Add Character"}
						</DialogTitle>
						{hasSelectedChar && charToAddInfo && (
							<>
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full"
									onClick={() => setCharToAdd(null)}
								>
									<ArrowLeft />
								</Button>
								<div
									className="flex items-center gap-2 relative"
									aria-hidden="true"
								>
									<TierPortrait
										portraitImg={charToAddInfo.portraitImage}
										portraitSize={50}
										tier={charToAddInfo.tier_id}
										name={charToAddInfo.name}
									/>
								</div>
							</>
						)}
					</div>
					<DialogDescription>
						Select a character to add to your collection.
					</DialogDescription>
				</DialogHeader>
				<div className="">
					{!hasSelectedChar && (
						<div className="gap-2 flex flex-col">
							{!noCharsToAdd && <CharacterFilter />}

							<div className="flex flex-wrap gap-5 mt-5">
								{noCharsToAdd && (
									<h1 className="flex justify-center items-center w-full">
										No characters to add
									</h1>
								)}
								{Object.values(CHARACTERS_DATA)
									.sort((a, b) => a.name.localeCompare(b.name))
									.map((character) => {
										// dont display if already owned
										if (ownedSet.has(character.id)) return null;

										return (
											<button
												key={character.id}
												onClick={() => setCharToAdd(character.id)}
												type="button"
											>
												<CharacterCard
													//  {...character}
													portraitImage={character.portraitImage}
													name={character.name}
													element_id={character.element_id}
													class_id={character.class_id}
													tier_id={character.tier_id}
													variant={character.variant}
												/>
											</button>
										);
									})}
							</div>
						</div>
					)}

					{hasSelectedChar && (
						<CharacterOwnedDetailsForm
							id={charToAdd}
							onClose={() => setOpen(false)}
						/>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
