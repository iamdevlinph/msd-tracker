"use client";

import { arrayRemoveItem } from "common-utils-pkg";
import { useState } from "react";
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

	setCharacaterFilters({ selectedElements, selectedCharacterClass });

	return (
		<ButtonGroup className="flex flex-col md:flex-row">
			<ButtonGroup>
				{Object.values(ELEMENTS_DATA).map(({ id, image, element, hide }) => {
					if (hide) return null;

					const isElemSelected = selectedElements.includes(id);

					return (
						<Button
							variant={isElemSelected ? "secondary" : "outline"}
							key={id}
							onClick={() => handleSelectElement(id)}
							className={cn(isElemSelected && "border")}
						>
							<img src={image} width="25" height="25" alt={`${element} icon`} />
						</Button>
					);
				})}
			</ButtonGroup>

			<ButtonGroup>
				{Object.values(CHARACTER_CLASS_DATA).map(
					({ id, image, character_class }) => {
						const isCharClassSelected = selectedCharacterClass.includes(id);

						return (
							<Button
								variant={isCharClassSelected ? "secondary" : "outline"}
								key={id}
								onClick={() => handleSelectClass(id)}
								className={cn(isCharClassSelected && "border")}
							>
								<img
									src={image}
									width="25"
									height="25"
									alt={`${character_class} icon`}
								/>
							</Button>
						);
					},
				)}
			</ButtonGroup>
		</ButtonGroup>
	);
};
