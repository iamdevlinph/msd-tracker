import CharacterCard from "@/components/characters/components/character-card";
import { useAppStore } from "@/stores/app-store";

export const CharacterOwnedList = () => {
	const charactersOwned = useAppStore((s) => s.charactersOwned);

	return (
		<div className="mt-5 gap-y-15 gap-x-5 flex flex-wrap">
			{charactersOwned.length === 0 && <h1>No owned characters</h1>}

			{charactersOwned.length > 0 &&
				charactersOwned
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((value) => {
						return (
							<CharacterCard
								key={value.id}
								{...value}
								portraitSize={130}
								iconSize={30}
							/>
						);
					})}
		</div>
	);
};
