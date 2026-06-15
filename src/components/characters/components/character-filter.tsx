import { arrayRemoveItem, toSentenceCase } from "common-utils-pkg";
import { XIcon } from "lucide-react";
import { useCharacterFilter } from "@/components/characters/store/characters-filter-store";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	CHARACTER_CLASS_DATA,
	type CharacterClassId,
} from "@/data/CHARACTER_CLASS_DATA";
import { ELEMENTS_DATA, type ElementId } from "@/data/ELEMENTS_DATA";
import { cn } from "@/lib/utils";

export const CharacterFilter = () => {
	const setCharacaterFilters = useCharacterFilter(
		(s) => s.setCharacaterFilters,
	);
	const { selectedElements, selectedCharacterClass } = useCharacterFilter(
		(s) => s.characterFilters,
	);

	const handleSelectElement = (elemId: ElementId) => {
		if (selectedElements.includes(elemId)) {
			const newArr = arrayRemoveItem(selectedElements, elemId);
			setCharacaterFilters({
				selectedCharacterClass,
				selectedElements: [...newArr],
			});
		} else {
			setCharacaterFilters({
				selectedCharacterClass,
				selectedElements: [...selectedElements, elemId],
			});
		}
	};

	const handleSelectClass = (charClassId: CharacterClassId) => {
		if (selectedCharacterClass.includes(charClassId)) {
			const newArr = arrayRemoveItem(selectedCharacterClass, charClassId);
			setCharacaterFilters({
				selectedCharacterClass: [...newArr],
				selectedElements,
			});
		} else {
			setCharacaterFilters({
				selectedCharacterClass: [...selectedCharacterClass, charClassId],
				selectedElements,
			});
		}
	};

	return (
		<ButtonGroup className="flex flex-col md:flex-row">
			<ButtonGroup>
				{Object.values(ELEMENTS_DATA).map(({ id, image, element, hide }) => {
					if (hide) return null;

					const isElemSelected = selectedElements.includes(id);

					return (
						<Button
							variant={isElemSelected ? "default" : "outline"}
							key={id}
							onClick={() => handleSelectElement(id)}
							className={cn(isElemSelected && "border")}
							title={element}
						>
							<img src={image} width="25" height="25" alt={`${element} icon`} />
						</Button>
					);
				})}

				<Button
					variant={"secondary"}
					size={"icon"}
					type="button"
					onClick={() =>
						setCharacaterFilters({
							selectedCharacterClass,
							selectedElements: [],
						})
					}
				>
					<XIcon />
				</Button>
			</ButtonGroup>

			<ButtonGroup>
				{Object.values(CHARACTER_CLASS_DATA).map(
					({ id, image, character_class }) => {
						const isCharClassSelected = selectedCharacterClass.includes(id);
						const elementName = toSentenceCase(character_class);

						return (
							<Button
								variant={isCharClassSelected ? "default" : "outline"}
								key={id}
								onClick={() => handleSelectClass(id)}
								className={cn(isCharClassSelected && "border")}
								title={elementName}
							>
								<img
									src={image}
									width="25"
									height="25"
									alt={`${elementName} icon`}
								/>
							</Button>
						);
					},
				)}

				<Button
					variant={"secondary"}
					size={"icon"}
					type="button"
					onClick={() =>
						setCharacaterFilters({
							selectedCharacterClass: [],
							selectedElements,
						})
					}
				>
					<XIcon />
				</Button>
			</ButtonGroup>
		</ButtonGroup>
	);
};
