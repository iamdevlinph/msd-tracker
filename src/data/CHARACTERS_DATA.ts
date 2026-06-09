import { CLASS_ID_BY_CLASS } from "@/data/CHARACTER_CLASS_DATA";
import { ELEMENT_ID_BY_ELEMENT, type ElementId } from "@/data/ELEMENTS_DATA";
import { TIER_ID_BY_TIER, type TierId } from "@/data/TIERS_DATA";

export type Character = {
	id: number;
	name: string;
	class: number;
	element: ElementId;
	portraitImage: string;
	fullImage: string;
	tier: TierId;
};

export const CHARACTERS_DATA: Character[] = [
	{
		id: 1,
		name: "Angel",
		class: CLASS_ID_BY_CLASS.ASSASSIN,
		element: ELEMENT_ID_BY_ELEMENT.FIRE,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Angel_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Angel.png",
		tier: TIER_ID_BY_TIER.PRIME_5,
	},
	{
		id: 2,
		name: "Benjamin",
		class: CLASS_ID_BY_CLASS.ASSASSIN,
		element: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Benjamin_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Benjamin.png",
		tier: TIER_ID_BY_TIER.CHOICE_4,
	},
	{
		id: 3,
		name: "Mina",
		class: CLASS_ID_BY_CLASS.FIGHTER,
		element: ELEMENT_ID_BY_ELEMENT.FIRE,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Mina_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Mina.png",
		tier: TIER_ID_BY_TIER.PRIME_5,
	},
	{
		id: 4,
		name: "Narae",
		class: CLASS_ID_BY_CLASS.SUPPORT,
		element: ELEMENT_ID_BY_ELEMENT.ICE,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Narae_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Narae.png",
		tier: TIER_ID_BY_TIER.PRIME_5,
	},
	{
		id: 5,
		name: "Francis",
		class: CLASS_ID_BY_CLASS.SUPPORT,
		element: ELEMENT_ID_BY_ELEMENT.EARTH,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Francis_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Francis.png",
		tier: TIER_ID_BY_TIER.CHOICE_4,
	},
	{
		id: 6,
		name: "Flare",
		class: CLASS_ID_BY_CLASS.DESTROYER,
		element: ELEMENT_ID_BY_ELEMENT.FIRE,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Flare_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Flare.png",
		tier: TIER_ID_BY_TIER.PRIME_5,
	},
	{
		id: 7,
		name: "Ophelia",
		class: CLASS_ID_BY_CLASS.FIGHTER,
		element: ELEMENT_ID_BY_ELEMENT.ICE,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Ophelia_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Ophelia.png",
		tier: TIER_ID_BY_TIER.PRIME_5,
	},
	{
		id: 8,
		name: "Penny",
		class: CLASS_ID_BY_CLASS.FIGHTER,
		element: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Penny_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Penny.png",
		tier: TIER_ID_BY_TIER.PRIME_5,
	},
	{
		id: 9,
		name: "Jiwon",
		class: CLASS_ID_BY_CLASS.SUPPORT,
		element: ELEMENT_ID_BY_ELEMENT.WIND,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Jiwon_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Jiwon.png",
		tier: TIER_ID_BY_TIER.PRIME_5,
	},
	{
		id: 10,
		name: "Esther",
		class: CLASS_ID_BY_CLASS.ASSASSIN,
		element: ELEMENT_ID_BY_ELEMENT.WIND,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895190/msd/Character_Portrait/portrait_Esde_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Esde.png",
		tier: TIER_ID_BY_TIER.PRIME_5,
	},
	{
		id: 11,
		name: "Gabi",
		class: CLASS_ID_BY_CLASS.FIGHTER,
		element: ELEMENT_ID_BY_ELEMENT.EARTH,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Gabi_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Gabi.png",
		tier: TIER_ID_BY_TIER.PRIME_5,
	},
	{
		id: 12,
		name: "Cloud",
		class: CLASS_ID_BY_CLASS.DESTROYER,
		element: ELEMENT_ID_BY_ELEMENT.ICE,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Cloud_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Cloud.png",
		tier: TIER_ID_BY_TIER.CHOICE_4,
	},
	{
		id: 13,
		name: "Yeonhwa",
		class: CLASS_ID_BY_CLASS.ASSASSIN,
		element: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Yeonhwa_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Yeonhwa.png",
		tier: TIER_ID_BY_TIER.CHOICE_4,
	},
	{
		id: 14,
		name: "Reina",
		class: CLASS_ID_BY_CLASS.DESTROYER,
		element: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Reina_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Reina.png",
		tier: TIER_ID_BY_TIER.CHOICE_4,
	},
	{
		id: 15,
		name: "Bonnie",
		class: CLASS_ID_BY_CLASS.SUPPORT,
		element: ELEMENT_ID_BY_ELEMENT.WIND,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Bonney_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Bonney.png",
		tier: TIER_ID_BY_TIER.CHOICE_4,
	},
	{
		id: 16,
		name: "Verna",
		class: CLASS_ID_BY_CLASS.FIGHTER,
		element: ELEMENT_ID_BY_ELEMENT.FIRE,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Verna_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Verna.png",
		tier: TIER_ID_BY_TIER.CHOICE_4,
	},
	{
		id: 17,
		name: "Ellie",
		class: CLASS_ID_BY_CLASS.DESTROYER,
		element: ELEMENT_ID_BY_ELEMENT.EARTH,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Ellie_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Ellie.png",
		tier: TIER_ID_BY_TIER.CHOICE_4,
	},
	{
		id: 18,
		name: "Sera",
		class: CLASS_ID_BY_CLASS.FIGHTER,
		element: ELEMENT_ID_BY_ELEMENT.ICE,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Sera_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Sera.png",
		tier: TIER_ID_BY_TIER.CHOICE_4,
	},
	{
		id: 19,
		name: "Sangun",
		class: CLASS_ID_BY_CLASS.FIGHTER,
		element: ELEMENT_ID_BY_ELEMENT.WIND,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Sangun_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Sangun.png",
		tier: TIER_ID_BY_TIER.PRIME_5,
	},
	{
		id: 20,
		name: "Leeho",
		class: CLASS_ID_BY_CLASS.ASSASSIN,
		element: ELEMENT_ID_BY_ELEMENT.FIRE,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Leeho_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Leeho.png",
		tier: TIER_ID_BY_TIER.CHOICE_4,
	},
	{
		id: 21,
		name: "Daisy",
		class: CLASS_ID_BY_CLASS.SUPPORT,
		element: ELEMENT_ID_BY_ELEMENT.EARTH,
		portraitImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895150/msd/Character_Portrait/portrait_Daisy_00.png",
		fullImage:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895146/msd/Character_Full/Img_CharacterIllust_Daisy.png",
		tier: TIER_ID_BY_TIER.CHOICE_4,
	},
];
