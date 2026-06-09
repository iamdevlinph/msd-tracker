type Classes = "fighter" | "asassin" | "destroyer" | "support";
type ClassesData = Record<
	CharacterClassId,
	{ id: CharacterClassId; character_class: Classes; image: string }
>;

export const CLASS_ID_BY_CLASS = {
	FIGHTER: 1,
	ASSASSIN: 2,
	DESTROYER: 3,
	SUPPORT: 4,
} as const;
export type CharacterClassId =
	(typeof CLASS_ID_BY_CLASS)[keyof typeof CLASS_ID_BY_CLASS];

export const CHARACTER_CLASS_DATA: ClassesData = {
	// 0: {
	//   id: CHARACTER_CLASS_DATA.ALL,
	//   element: 'all',
	//   image: ""
	// },
	[CLASS_ID_BY_CLASS.FIGHTER]: {
		id: CLASS_ID_BY_CLASS.FIGHTER,
		character_class: "fighter",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780962739/msd/Class/icons/class-fighter.png",
	},
	[CLASS_ID_BY_CLASS.ASSASSIN]: {
		id: CLASS_ID_BY_CLASS.ASSASSIN,
		character_class: "asassin",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780962739/msd/Class/icons/class-assassin.png",
	},
	[CLASS_ID_BY_CLASS.DESTROYER]: {
		id: CLASS_ID_BY_CLASS.DESTROYER,
		character_class: "destroyer",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780962739/msd/Class/icons/class-destroyer.png",
	},
	[CLASS_ID_BY_CLASS.SUPPORT]: {
		id: CLASS_ID_BY_CLASS.SUPPORT,
		character_class: "support",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780962739/msd/Class/icons/class-support.png",
	},
};
