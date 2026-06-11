import { useMemo, useState } from "react";
import CharacterCard from "@/components/characters/components/character-card";
import { CharacterDetailsForm } from "@/components/characters/components/character-details-form";
import { CharacterPortrait } from "@/components/characters/components/character-portrait";
import { CharacterSkillLevel } from "@/components/characters/components/character-skill-level";
import { useCharacterFilter } from "@/components/characters/store/characters-filter-store";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";

export const CharacterOwnedList = () => {
	const [open, setOpen] = useState(false);
	const [charToAdd, setCharToAdd] = useState<null | number>(null);
	const hasSelectedChar = !!charToAdd;

	const charToAddInfo = hasSelectedChar ? CHARACTERS_DATA[charToAdd] : null;

	const characterFilters = useCharacterFilter((s) => s.characterFilters);
	const charactersOwned = useAppStore((s) => s.charactersOwned);

	const { selectedCharacterClass, selectedElements } = characterFilters;

	const classSet = useMemo(
		() => new Set(selectedCharacterClass),
		[selectedCharacterClass],
	);

	const elementSet = useMemo(
		() => new Set(selectedElements),
		[selectedElements],
	);

	const enrichedCharacters = charactersOwned
		.map((c) => ({
			...c,
			info: CHARACTERS_DATA[c.id],
		}))
		.filter(({ info }) => {
			if (classSet.size && !classSet.has(info.class_id)) return false;
			if (elementSet.size && !elementSet.has(info.element_id)) return false;
			return true;
		})
		.sort((a, b) => a.info.name.localeCompare(b.info.name));

	return (
		<>
			{enrichedCharacters.length === 0 && (
				<h1 className="">No owned characters</h1>
			)}

			<div
				className="mt-5 gap-y-10 gap-x-5 grid sm:flex sm:flex-wrap justify-center sm:justify-start"
				style={{
					gridTemplateColumns: "repeat(auto-fit, 125px)",
				}}
			>
				{enrichedCharacters.length > 0 &&
					enrichedCharacters.map((charOwned) => {
						return (
							<button
								key={charOwned.id}
								type="button"
								onClick={() => {
									setOpen(true);
									setCharToAdd(charOwned.id);
								}}
							>
								<CharacterCard
									key={charOwned.id}
									portraitSize={130}
									iconSize={30}
									portraitImage={charOwned.info.portraitImage}
									name={charOwned.info.name}
									element_id={charOwned.info.element_id}
									class_id={charOwned.info.class_id}
									tier={charOwned.info.tier}
									awakening={charOwned.awakening}
								/>
								<CharacterSkillLevel charOwned={charOwned} />
							</button>
						);
					})}
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
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
							{hasSelectedChar && charToAddInfo && (
								<div className="flex gap-5 items-center">
									<div className="flex items-center gap-2 relative">
										<CharacterPortrait
											portraitImg={charToAddInfo.portraitImage}
											portraitSize={50}
											tier={charToAddInfo.tier}
											name={charToAddInfo.name}
										/>
										<span>{charToAddInfo.name}</span>
									</div>
								</div>
							)}
						</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<div className="">
						{hasSelectedChar && (
							<CharacterDetailsForm
								char_id={charToAdd}
								onClose={() => setOpen(false)}
							/>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
