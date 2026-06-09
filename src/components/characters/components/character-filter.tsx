"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { CHARACTER_CLASS_DATA } from "@/data/CHARACTER_CLASS_DATA";
import { ELEMENTS_DATA } from "@/data/ELEMENTS_DATA";

export const CharacterFilter = () => {
	return (
		<ButtonGroup>
			<ButtonGroup>
				{Object.values(ELEMENTS_DATA).map(({ id, image, element, hide }) => {
					if (hide) return null;

					return (
						<Button variant="outline" key={id} className="cursor-pointer">
							<img src={image} width="25" height="25" alt={`${element} icon`} />
						</Button>
					);
				})}
			</ButtonGroup>

			<ButtonGroup>
				{Object.values(CHARACTER_CLASS_DATA).map(
					({ id, image, character_class }, idx) => {
						return (
							<Button variant="outline" key={id} className="">
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
