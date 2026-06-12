type TiersData = Record<TierId, { id: TierId; full: string; base: string }>;

export const TIER_ID_BY_TIER = {
	// FODDER_1: 1,
	// STANDARD_2: 2,
	// SELECT_3: 3,
	CHOICE_4: 4,
	PRIME_5: 5,
} as const;
export type TierId = (typeof TIER_ID_BY_TIER)[keyof typeof TIER_ID_BY_TIER];

export const TIERS_DATA: TiersData = {
	4: {
		id: TIER_ID_BY_TIER.CHOICE_4,
		// full: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962254/msd/Tiers/Img_SlotTIerBase_04.png",
		// base: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962365/msd/Tiers/Img_SlotTIerBase_04_02.png",
		full: "/images/Tiers/Img_SlotTIerBase_04.png",
		base: "/images/Tiers/Img_SlotTIerBase_04_02.png",
	},
	5: {
		id: TIER_ID_BY_TIER.PRIME_5,
		// full: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962365/msd/Tiers/Img_SlotTIerBase_05.png",
		// base: "https://res.cloudinary.com/dfrhytey3/image/upload/v1780962367/msd/Tiers/Img_SlotTIerBase_05_02.png",
		full: "/images/Tiers/Img_SlotTIerBase_05.png",
		base: "/images/Tiers/Img_SlotTIerBase_05_02.png",
	},
};
