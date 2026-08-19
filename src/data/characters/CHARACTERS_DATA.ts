import {
	type CharacterClassId,
	CLASS_ID_BY_CLASS,
} from "@/data/character-classes/CHARACTER_CLASS_DATA";
import {
	ELEMENT_ID_BY_ELEMENT,
	type ElementId,
} from "@/data/elements/ELEMENTS_DATA";
import { TIER_ID_BY_TIER, type TierId } from "@/data/tiers/TIERS_DATA";

export type CharId = number;

export type Character = {
	id: CharId;
	name: string;
	internal_name?: string;
	class_id: CharacterClassId;
	element_id: ElementId;
	portraitImage: string;
	fullImage: string;
	tier_id: TierId;
	variant?: "Summer Dive!";
	is_hidden?: boolean;
};

export const CHARACTERS_DATA: Record<number, Character> = {
	1: {
		id: 1,
		name: "Angel",
		class_id: CLASS_ID_BY_CLASS.ASSASSIN,
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Angel_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Angel.png",
		portraitImage: "/images/Character_Portrait/portrait_Angel_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Angel.webp",
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	2: {
		id: 2,
		name: "Benjamin",
		class_id: CLASS_ID_BY_CLASS.ASSASSIN,
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Benjamin_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Benjamin.png",
		portraitImage: "/images/Character_Portrait/portrait_Benjamin_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Benjamin.webp",
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	3: {
		id: 3,
		name: "Mina",
		class_id: CLASS_ID_BY_CLASS.FIGHTER,
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Mina_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Mina.png",
		portraitImage: "/images/Character_Portrait/portrait_Mina_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Mina.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	4: {
		id: 4,
		name: "Narae",
		class_id: CLASS_ID_BY_CLASS.SUPPORT,
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Narae_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Narae.png",
		portraitImage: "/images/Character_Portrait/portrait_Narae_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Narae.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	5: {
		id: 5,
		name: "Francis",
		class_id: CLASS_ID_BY_CLASS.SUPPORT,
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Francis_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Francis.png",
		portraitImage: "/images/Character_Portrait/portrait_Francis_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Francis.webp",
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	[200_005]: {
		id: 200_005,
		name: "Francis",
		internal_name: "Francis: Summer Dive!",
		class_id: CLASS_ID_BY_CLASS.SUPPORT,
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		portraitImage: "/images/Character_Portrait/portrait_FrancisSummer_01.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_FrancisSummer.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
		variant: "Summer Dive!",
	},
	6: {
		id: 6,
		name: "Flare",
		class_id: CLASS_ID_BY_CLASS.DESTROYER,
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Flare_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Flare.png",
		portraitImage: "/images/Character_Portrait/portrait_Flare_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Flare.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	7: {
		id: 7,
		name: "Ophelia",
		class_id: CLASS_ID_BY_CLASS.FIGHTER,
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Ophelia_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Ophelia.png",
		portraitImage: "/images/Character_Portrait/portrait_Ophelia_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Ophelia.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	8: {
		id: 8,
		name: "Penny",
		class_id: CLASS_ID_BY_CLASS.FIGHTER,
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Penny_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Penny.png",
		portraitImage: "/images/Character_Portrait/portrait_Penny_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Penny.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	9: {
		id: 9,
		name: "Jiwon",
		class_id: CLASS_ID_BY_CLASS.SUPPORT,
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Jiwon_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Jiwon.png",
		portraitImage: "/images/Character_Portrait/portrait_Jiwon_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Jiwon.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	10: {
		id: 10,
		name: "Esther",
		class_id: CLASS_ID_BY_CLASS.ASSASSIN,
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895190/msd/Character_Portrait/portrait_Esde_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Esde.png",
		portraitImage: "/images/Character_Portrait/portrait_Esde_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Esde.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	11: {
		id: 11,
		name: "Gabi",
		class_id: CLASS_ID_BY_CLASS.FIGHTER,
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Gabi_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Gabi.png",
		portraitImage: "/images/Character_Portrait/portrait_Gabi_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Gabi.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	12: {
		id: 12,
		name: "Cloud",
		class_id: CLASS_ID_BY_CLASS.DESTROYER,
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Cloud_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Cloud.png",
		portraitImage: "/images/Character_Portrait/portrait_Cloud_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Cloud.webp",
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	13: {
		id: 13,
		name: "Yeonhwa",
		class_id: CLASS_ID_BY_CLASS.ASSASSIN,
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Yeonhwa_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Yeonhwa.png",
		portraitImage: "/images/Character_Portrait/portrait_Yeonhwa_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Yeonhwa.webp",
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	14: {
		id: 14,
		name: "Reina",
		class_id: CLASS_ID_BY_CLASS.DESTROYER,
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Reina_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Reina.png",
		portraitImage: "/images/Character_Portrait/portrait_Reina_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Reina.webp",
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	15: {
		id: 15,
		name: "Bonnie",
		class_id: CLASS_ID_BY_CLASS.SUPPORT,
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Bonney_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Bonney.png",
		portraitImage: "/images/Character_Portrait/portrait_Bonney_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Bonney.webp",
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	16: {
		id: 16,
		name: "Verna",
		class_id: CLASS_ID_BY_CLASS.FIGHTER,
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Verna_00.png",
		// fullImage:a
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Verna.png",
		portraitImage: "/images/Character_Portrait/portrait_Verna_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Verna.webp",
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	[200_016]: {
		id: 200_016,
		name: "Verna",
		internal_name: "Verna: Summer Dive!",
		class_id: CLASS_ID_BY_CLASS.FIGHTER,
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		portraitImage: "/images/Character_Portrait/portrait_VernaSummer_01.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_VernaSummer.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
		variant: "Summer Dive!",
	},
	17: {
		id: 17,
		name: "Ellie",
		class_id: CLASS_ID_BY_CLASS.DESTROYER,
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Ellie_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Ellie.png",
		portraitImage: "/images/Character_Portrait/portrait_Ellie_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Ellie.webp",
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	18: {
		id: 18,
		name: "Sera",
		class_id: CLASS_ID_BY_CLASS.FIGHTER,
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Sera_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Sera.png",
		portraitImage: "/images/Character_Portrait/portrait_Sera_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Sera.webp",
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	19: {
		id: 19,
		name: "Sangun",
		class_id: CLASS_ID_BY_CLASS.FIGHTER,
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Sangun_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Sangun.png",
		portraitImage: "/images/Character_Portrait/portrait_Sangun_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Sangun.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	20: {
		id: 20,
		name: "Leeho",
		class_id: CLASS_ID_BY_CLASS.ASSASSIN,
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Leeho_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Leeho.png",
		portraitImage: "/images/Character_Portrait/portrait_Leeho_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Leeho.webp",
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	21: {
		id: 21,
		name: "Daisy",
		class_id: CLASS_ID_BY_CLASS.SUPPORT,
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		// portraitImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Daisy_00.png",
		// fullImage:
		// 	"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Daisy.png",
		portraitImage: "/images/Character_Portrait/portrait_Daisy_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Daisy.webp",
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	22: {
		id: 22,
		name: "Nagi",
		class_id: CLASS_ID_BY_CLASS.DESTROYER,
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		portraitImage: "/images/Character_Portrait/portrait_Nagi_00.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Nagi.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	23: {
		id: 23,
		name: "Mabel",
		class_id: CLASS_ID_BY_CLASS.DESTROYER,
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		portraitImage: "/images/Character_Portrait/portrait_Maybell_01.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Maybell.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	24: {
		id: 24,
		name: "Brisshell",
		class_id: CLASS_ID_BY_CLASS.ASSASSIN,
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		portraitImage: "/images/Character_Portrait/portrait_Brisshell_01.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Brisshell.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	25: {
		id: 25,
		name: "Vivian",
		class_id: CLASS_ID_BY_CLASS.FIGHTER,
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		portraitImage: "/images/Character_Portrait/portrait_Vivian_01.webp",
		fullImage: "/images/Character_Full/Img_CharacterIllust_Vivian.webp",
		tier_id: TIER_ID_BY_TIER.PRIME_5,
		is_hidden: true,
	},
};
