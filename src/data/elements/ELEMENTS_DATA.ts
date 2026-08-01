type Elements =
	| "Earth"
	| "Fire"
	| "Ice"
	| "Lightning"
	| "Wind"
	| "Water"
	| "ark"
	| "Physical";
type ElementsData = Record<
	ElementId,
	{ id: ElementId; element: Elements; image: string; hide?: boolean }
>;

export const ELEMENT_ID_BY_ELEMENT = {
	EARTH: 1,
	FIRE: 2,
	ICE: 3,
	LIGHTNING: 4,
	WIND: 5,
	WATER: 6,
	DARK: 7,
	PHYSICAL: 8,
} as const;
export type ElementId =
	(typeof ELEMENT_ID_BY_ELEMENT)[keyof typeof ELEMENT_ID_BY_ELEMENT];

export const ELEMENTS_DATA: ElementsData = {
	// 0: {
	//   id: ELEMENT_ID_BY_ELEMENT.ALL,
	//   element: 'all',
	//   image: ""
	// },
	[ELEMENT_ID_BY_ELEMENT.EARTH]: {
		id: ELEMENT_ID_BY_ELEMENT.EARTH,
		element: "Earth",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/earth.png",
		image: "/images/Elements/icons/earth.webp",
	},
	[ELEMENT_ID_BY_ELEMENT.FIRE]: {
		id: ELEMENT_ID_BY_ELEMENT.FIRE,
		element: "Fire",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/fire.png",
		image: "/images/Elements/icons/fire.webp",
	},
	[ELEMENT_ID_BY_ELEMENT.ICE]: {
		id: ELEMENT_ID_BY_ELEMENT.ICE,
		element: "Ice",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/ice.png",
		image: "/images/Elements/icons/ice.webp",
	},
	[ELEMENT_ID_BY_ELEMENT.LIGHTNING]: {
		id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		element: "Lightning",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/lightning.png",
		image: "/images/Elements/icons/lightning.webp",
	},
	[ELEMENT_ID_BY_ELEMENT.WIND]: {
		id: ELEMENT_ID_BY_ELEMENT.WIND,
		element: "Wind",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/wind.png",
		image: "/images/Elements/icons/wind.webp",
	},
	[ELEMENT_ID_BY_ELEMENT.WATER]: {
		id: ELEMENT_ID_BY_ELEMENT.WATER,
		element: "Water",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/water.png",
		image: "/images/Elements/icons/water.webp",
		hide: true,
	},
	[ELEMENT_ID_BY_ELEMENT.DARK]: {
		id: ELEMENT_ID_BY_ELEMENT.DARK,
		element: "ark",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/dark.png",
		image: "/images/Elements/icons/dark.webp",
		hide: true,
	},
	[ELEMENT_ID_BY_ELEMENT.PHYSICAL]: {
		id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		element: "Physical",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/physical.png",
		image: "/images/Elements/icons/physical.webp",
		hide: true,
	},
};
