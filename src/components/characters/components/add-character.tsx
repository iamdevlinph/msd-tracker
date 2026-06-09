import CharacterCard from "@/components/characters/components/character-card";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { cn } from "@/lib/utils";

export function AddCharacter() {
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
					"max-w-sm sm:min-w-148 lg:min-w-218",
					"h-[calc(100dvh-50px)] lg:h-min",
				)}
			>
				<DialogHeader>
					<DialogTitle>Add Character</DialogTitle>
				</DialogHeader>
				<div className="">
					<div className="flex flex-wrap gap-5">
						{Object.values(CHARACTERS_DATA)
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((character) => {
								return <CharacterCard key={character.id} {...character} />;
							})}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
