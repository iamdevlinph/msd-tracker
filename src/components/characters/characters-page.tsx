import { toSentenceCase } from "common-utils-pkg";
import { PageTitle } from "@/components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { CHARACTER_CLASS_DATA } from "@/data/CHARACTER_CLASS_DATA";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";
import { ELEMENTS_DATA } from "@/data/ELEMENTS_DATA";

export const CharactersPage = () => {
	return (
		<div>
			<PageTitle title="Characters" />

			<div className="flex gap-5 flex-col">
				<div className="flex gap-2 flex-wrap">
					{Object.values(ELEMENTS_DATA).map(({ id, image, element, hide }) => {
						if (hide) return null;

						return (
							<Card key={id} className="p-2 -px-5">
								<CardContent className="flex items-center gap-2 px-2">
									<img
										src={image}
										width="30"
										height="30"
										alt={`${element} icon`}
									/>
									{toSentenceCase(element)}
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="flex gap-2 flex-wrap">
					{Object.values(CHARACTER_CLASS_DATA).map(
						({ id, image, character_class }) => {
							return (
								<Card key={id} className="p-2 -px-5">
									<CardContent className="flex items-center gap-2 px-2">
										<img
											src={image}
											width="30"
											height="30"
											alt={`${character_class} icon`}
										/>
										{toSentenceCase(character_class)}
									</CardContent>
								</Card>
							);
						},
					)}
				</div>

				<div className="flex gap-2 flex-wrap">
					{Object.values(CHARACTERS_DATA)
						.sort((a, b) => a.name.localeCompare(b.name))
						.map(({ id, portraitImage, name }) => {
							return (
								<Card key={id} className="p-2 -px-5">
									<CardContent className="flex flex-col items-center gap-2 px-2">
										<img
											src={portraitImage}
											width="120"
											height="120"
											alt={`${name} icon`}
										/>
										{toSentenceCase(name)}
									</CardContent>
								</Card>
							);
						})}
				</div>
			</div>
		</div>
	);
};
