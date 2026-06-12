import { ELEMENT_ID_BY_ELEMENT } from "@/data/ELEMENTS_DATA";
import type { MonsterCodexData } from "@/data/MONSTERLINGS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";

export const MONSTERLING_DATA_VARHINE: MonsterCodexData = {
	40: {
		id: 40,
		name: "Rock Fist Dude",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingStoneguy.png",
		image: "/images/Monsterling_Icons/MonsterlingStoneguy.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Attacks' Earth DMG +6% upon attacking with Elemental Weakness",
	},
	41: {
		id: 41,
		name: "Golden Fist Dude",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingStoneGuyGold.png",
		image: "/images/Monsterling_Icons/MonsterlingStoneGuyGold.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Attack Neutralization DMG +6.3% upon attacking with Elemental Weakness",
	},
	42: {
		id: 42,
		name: "Orc Warrior",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOrc.png",
		image: "/images/Monsterling_Icons/MonsterlingOrc.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5% against normal enemies (Cooldown: 20s)",
	},
	43: {
		id: 43,
		name: "Pink Orc Dude",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOrcAxePink.png",
		image: "/images/Monsterling_Icons/MonsterlingOrcAxePink.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Physical DMG +5.25% against normal enemies (Cooldown: 20s)",
	},
	44: {
		id: 44,
		name: "Orc Raider",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOrcAxe.png",
		image: "/images/Monsterling_Icons/MonsterlingOrcAxe.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +5% against normal enemies (Cooldown: 20s)",
	},
	45: {
		id: 45,
		name: "Rockymander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyong.png",
		image: "/images/Monsterling_Icons/MonsterlingDoranyong.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +5% for 5s upon being hit 10 times",
	},
	46: {
		id: 46,
		name: "Leafymander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyongMutation01.png",
		image: "/images/Monsterling_Icons/MonsterlingDoranyongMutation01.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit DMG +5.25% for 5s upon being hit 10 times",
	},
	47: {
		id: 47,
		name: "Bouldermander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyong.png",
		image: "/images/Monsterling_Icons/MonsterlingDoranyong.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill DMG +5% for 5s upon being hit 10 times",
	},
	48: {
		id: 48,
		name: "Vikkymander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyongKingHat.png",
		image: "/images/Monsterling_Icons/MonsterlingDoranyongKingHat.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill DMG +5.25% for 5s upon being hit 10 times",
	},
	49: {
		id: 49,
		name: "Troll",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTroll.png",
		image: "/images/Monsterling_Icons/MonsterlingTroll.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ultimate Skill Neutralization DMG +5%",
	},
	50: {
		id: 50,
		name: "Noxtroll",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTrollBlue.png",
		image: "/images/Monsterling_Icons/MonsterlingTrollBlue.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Ultimate Skill Neutralization DMG + 5.25%",
	},
	51: {
		id: 51,
		name: "Urgash",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTrollKing.png",
		image: "/images/Monsterling_Icons/MonsterlingTrollKing.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ultimate Skill Elemental Weakness DMG +5.5%",
	},
	52: {
		id: 52,
		name: "Wolf",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolf.png",
		image: "/images/Monsterling_Icons/MonsterlingWolf.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5% for 5s upon landing a critical hit",
	},
	53: {
		id: 53,
		name: "Albino Wolf",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingWolfWhite.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Physical DMG +5.25% for 5s upon landing a critical hit",
	},
	54: {
		id: 54,
		name: "Behemo-Wolf",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfHuge.png",
		image: "/images/Monsterling_Icons/MonsterlingWolfHuge.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Suppression DMG +5.5% for 10s upon landing a critical hit",
	},
	55: {
		id: 55,
		name: "Scar",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfHugeScar.png",
		image: "/images/Monsterling_Icons/MonsterlingWolfHugeScar.png",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"DMG +5.5% against boss enemies for 5s upon landing a critical hit",
	},
	56: {
		id: 56,
		name: "Frostbite",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfHugeScarWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingWolfHugeScarWhite.png",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill DMG +5.78% for 10s upon landing a critical hit",
	},
	57: {
		id: 57,
		name: "Shellymander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSoranyong.png",
		image: "/images/Monsterling_Icons/MonsterlingSoranyong.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5% for 5s upon being hit 10 times",
	},
	58: {
		id: 58,
		name: "Mollumander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSoranyongMutation01.png",
		image: "/images/Monsterling_Icons/MonsterlingSoranyongMutation01.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Physical DMG +5.25% for 5s upon being hit 10 times",
	},
	59: {
		id: 59,
		name: "Swellymander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSoranyongKing.png",
		image: "/images/Monsterling_Icons/MonsterlingSoranyongKing.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Basic Attack DMG +5% for 5s upon being hit 10 times",
	},
	60: {
		id: 60,
		name: "Harvester",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageSoldier.png",
		image: "/images/Monsterling_Icons/MonsterlingBlackKnightageSoldier.png",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +5% for 5s upon being hit (Cooldown: 20s)",
	},
	61: {
		id: 61,
		name: "Enforcer",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageSoldierSpear.png",
		image:
			"/images/Monsterling_Icons/MonsterlingBlackKnightageSoldierSpear.png",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DEF +3.75% for 5s upon being hit (Cooldown: 20s)",
	},
	62: {
		id: 62,
		name: "Void Friar",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageMonk.png",
		image: "/images/Monsterling_Icons/MonsterlingBlackKnightageMonk.png",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Elemental Weakness DMG +5% for 5s upon being hit (Cooldown: 20s)",
	},
	63: {
		id: 63,
		name: "Monk's Shadow",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageMonkWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingBlackKnightageMonkWhite.png",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Elemental Weakness DMG +5.25% for 5s upon being hit (Cooldown: 20s)",
	},
	64: {
		id: 64,
		name: "Vectus",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightagePriest.png",
		image: "/images/Monsterling_Icons/MonsterlingBlackKnightagePriest.png",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "ATK +2.75% for 10s upon being hit (Cooldown: 20s)",
	},
	65: {
		id: 65,
		name: "Mountaintaur",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMinotaMountain.png",
		image: "/images/Monsterling_Icons/MonsterlingMinotaMountain.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Crit DMG +6% against Staggered boss enemies",
	},
	66: {
		id: 66,
		name: "Tealtaur",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMinotaForestWind.png",
		image: "/images/Monsterling_Icons/MonsterlingMinotaForestWind.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Fire DMG +6.3% against Staggered boss enemies",
	},
	67: {
		id: 67,
		name: "Amon",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAmon.png",
		image: "/images/Monsterling_Icons/MonsterlingAmon.png",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"All teammates' Crit Rate +6% for 10s upon attacking a boss enemy 10 times",
	},
	68: {
		id: 68,
		name: "Amon's Shadow",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAmonWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingAmonWhite.png",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"All teammates' Crit Rate +6.3% for 10s upon using Evasion Counter",
	},
};
