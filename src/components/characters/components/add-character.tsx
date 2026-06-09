import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import CharacterCard from "@/components/characters/components/character-card";
import { CharacterPortrait } from "@/components/characters/components/character-portrait";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CHARACTERS_DATA, type Character } from "@/data/CHARACTERS_DATA";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

export function AddCharacter() {
	const setCharacterOwned = useAppStore((s) => s.setCharacterOwned);
	const charactersOwned = useAppStore((s) => s.charactersOwned);

	const [charToAdd, setCharToAdd] = useState<null | Character>(null);
	const hasSelectedChar = !!charToAdd;

	useEffect(() => {}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default" className="w-min">
					Add Character
				</Button>
			</DialogTrigger>
			<DialogContent
				className={cn(
					"overflow-y-scroll max-h-screen",
					"max-w-sm sm:min-w-min lg:min-w-218",
					hasSelectedChar && "lg:min-w-max",
					"h-[calc(100dvh-50px)] lg:h-min",
				)}
				onCloseAutoFocus={() => setCharToAdd(null)}
			>
				<DialogHeader>
					<DialogTitle>
						{!hasSelectedChar && "Add Character"}
						{hasSelectedChar && (
							<div className="flex gap-5 items-center">
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full"
									onClick={() => setCharToAdd(null)}
								>
									<ArrowLeft />
								</Button>
								<div className="flex items-center gap-2 relative">
									<CharacterPortrait
										portraitImg={charToAdd.portraitImage}
										portraitSize={50}
										tier={charToAdd.tier}
									/>
									<span>{charToAdd.name}</span>
								</div>
							</div>
						)}
					</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className="">
					{!hasSelectedChar && (
						<div className="flex flex-wrap gap-5">
							{Object.values(CHARACTERS_DATA)
								.sort((a, b) => a.name.localeCompare(b.name))
								.map((character) => {
									// dont display if already owned
									const isOwned = charactersOwned.find(
										(ownedChar) => ownedChar.id === character.id,
									);

									if (isOwned) return null;

									return (
										<button
											key={character.id}
											onClick={() => setCharToAdd(character)}
											type="button"
										>
											<CharacterCard {...character} />
										</button>
									);
								})}
						</div>
					)}

					{hasSelectedChar && <div>TO DO: idk what to put lol</div>}
				</div>
				{hasSelectedChar && (
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<DialogClose asChild>
							<Button
								type="submit"
								onClick={() => setCharacterOwned(charToAdd)}
							>
								Add
							</Button>
						</DialogClose>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
}
