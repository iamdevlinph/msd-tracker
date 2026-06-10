type Elements =
	| "earth"
	| "fire"
	| "ice"
	| "lightning"
	| "wind"
	| "water"
	| "dark"
	| "physical";
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
		element: "earth",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/earth.png",
		image: "/images/Elements/icons/earth.png",
	},
	[ELEMENT_ID_BY_ELEMENT.FIRE]: {
		id: ELEMENT_ID_BY_ELEMENT.FIRE,
		element: "fire",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/fire.png",
		image: "/images/Elements/icons/fire.png",
	},
	[ELEMENT_ID_BY_ELEMENT.ICE]: {
		id: ELEMENT_ID_BY_ELEMENT.ICE,
		element: "ice",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/ice.png",
		image: "/images/Elements/icons/ice.png",
	},
	[ELEMENT_ID_BY_ELEMENT.LIGHTNING]: {
		id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		element: "lightning",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/lightning.png",
		image: "/images/Elements/icons/lightning.png",
	},
	[ELEMENT_ID_BY_ELEMENT.WIND]: {
		id: ELEMENT_ID_BY_ELEMENT.WIND,
		element: "wind",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/wind.png",
		image: "/images/Elements/icons/wind.png",
	},
	[ELEMENT_ID_BY_ELEMENT.WATER]: {
		id: ELEMENT_ID_BY_ELEMENT.WATER,
		element: "water",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/water.png",
		image: "/images/Elements/icons/water.png",
		hide: true,
	},
	[ELEMENT_ID_BY_ELEMENT.DARK]: {
		id: ELEMENT_ID_BY_ELEMENT.DARK,
		element: "dark",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/dark.png",
		image: "/images/Elements/icons/dark.png",
		hide: true,
	},
	[ELEMENT_ID_BY_ELEMENT.PHYSICAL]: {
		id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		element: "physical",
		// image:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780896331/msd/Elements/icons/physical.png",
		image: "/images/Elements/icons/physical.png",
		hide: true,
	},
};
