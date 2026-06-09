import { toSentenceCase } from "common-utils-pkg";
import { CharacterFilter } from "@/components/characters/components/character-filter";
import { PageTitle } from "@/components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { CHARACTERS_DATA } from "@/data/CHARACTERS_DATA";

export const CharactersPage = () => {
	return (
		<div>
			<PageTitle title="Characters" />

			<div className="flex gap-5 flex-col">
				<CharacterFilter />

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
