import { arrayRemoveItem, toSentenceCase } from "common-utils-pkg";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
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

	const [selectedElements, setSelectedElements] = useState<ElementId[]>([]);
	const [selectedCharacterClass, setSelectedCharacterClass] = useState<
		CharacterClassId[]
	>([]);

	const handleSelectElement = (elemId: ElementId) => {
		if (selectedElements.includes(elemId)) {
			const newArr = arrayRemoveItem(selectedElements, elemId);
			setSelectedElements([...newArr]);
		} else {
			setSelectedElements([...selectedElements, elemId]);
		}
	};

	const handleSelectClass = (charClassId: CharacterClassId) => {
		if (selectedCharacterClass.includes(charClassId)) {
			const newArr = arrayRemoveItem(selectedCharacterClass, charClassId);
			setSelectedCharacterClass([...newArr]);
		} else {
			setSelectedCharacterClass([...selectedCharacterClass, charClassId]);
		}
	};

	useEffect(() => {
		setCharacaterFilters({ selectedElements, selectedCharacterClass });
	}, [selectedElements, selectedCharacterClass, setCharacaterFilters]);

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
					onClick={() => setSelectedElements([])}
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
					onClick={() => setSelectedCharacterClass([])}
				>
					<XIcon />
				</Button>
			</ButtonGroup>
		</ButtonGroup>
	);
};
