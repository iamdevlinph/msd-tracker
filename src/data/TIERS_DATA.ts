type TiersData = Record<
	TierId,
	{ id: TierId; full: string; base: string; trait_image: string }
>;

export const TIER_ID_BY_TIER = {
	FODDER_1: 1,
	STANDARD_2: 2,
	SELECT_3: 3,
	CHOICE_4: 4,
	PRIME_5: 5,
} as const;
export type TierId = (typeof TIER_ID_BY_TIER)[keyof typeof TIER_ID_BY_TIER];

export const TIERS_DATA: TiersData = {
	1: {
		id: TIER_ID_BY_TIER.FODDER_1,
		// full: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962254/msd/Tiers/Img_SlotTIerBase_04.png",
		// base: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962365/msd/Tiers/Img_SlotTIerBase_04_02.png",
		full: "/images/Tiers/Img_SlotTIerBase_01.png",
		base: "/images/Tiers/Img_SlotTIerBase_01_02.png",
		trait_image: "/images/Character/Img_potential_Base01.png",
	},
	2: {
		id: TIER_ID_BY_TIER.STANDARD_2,
		// full: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962254/msd/Tiers/Img_SlotTIerBase_04.png",
		// base: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962365/msd/Tiers/Img_SlotTIerBase_04_02.png",
		full: "/images/Tiers/Img_SlotTIerBase_02.png",
		base: "/images/Tiers/Img_SlotTIerBase_02_02.png",
		trait_image: "/images/Character/Img_potential_Base02.png",
	},
	3: {
		id: TIER_ID_BY_TIER.SELECT_3,
		// full: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962254/msd/Tiers/Img_SlotTIerBase_04.png",
		// base: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962365/msd/Tiers/Img_SlotTIerBase_04_02.png",
		full: "/images/Tiers/Img_SlotTIerBase_03.png",
		base: "/images/Tiers/Img_SlotTIerBase_03_02.png",
		trait_image: "/images/Character/Img_potential_Base03.png",
	},
	4: {
		id: TIER_ID_BY_TIER.CHOICE_4,
		// full: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962254/msd/Tiers/Img_SlotTIerBase_04.png",
		// base: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962365/msd/Tiers/Img_SlotTIerBase_04_02.png",
		full: "/images/Tiers/Img_SlotTIerBase_04.png",
		base: "/images/Tiers/Img_SlotTIerBase_04_02.png",
		trait_image: "/images/Character/Img_potential_Base04.png",
	},
	5: {
		id: TIER_ID_BY_TIER.PRIME_5,
		// full: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962365/msd/Tiers/Img_SlotTIerBase_05.png",
		// base: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962367/msd/Tiers/Img_SlotTIerBase_05_02.png",
		full: "/images/Tiers/Img_SlotTIerBase_05.png",
		base: "/images/Tiers/Img_SlotTIerBase_05_02.png",
		trait_image: "/images/Character/Img_potential_Base05.png",
	},
};
