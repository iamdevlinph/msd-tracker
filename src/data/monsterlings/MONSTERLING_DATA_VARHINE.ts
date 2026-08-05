import { ELEMENT_ID_BY_ELEMENT } from "@/data/elements/ELEMENTS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";
import type { MonsterCodexData } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { REGION_ID_BY_REGION } from "@/data/regions/REGIONS_DATA";
import { TIER_ID_BY_TIER } from "@/data/tiers/TIERS_DATA";

export const MONSTERLING_DATA_VARHINE: MonsterCodexData = {
	40: {
		id: 40,
		name: "Rock Fist Dude",
		linkChain: {
			unlock_level: 11,
			sort_order: 1,
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Frangible Pebble",
			trigger: ["Using a Switch Skill"],
			effect: "Unleashes energy toward the enemy, dealing Earth DMG.",
			bonusEffects: ["5% Earth RES Reduction (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingStoneguy.png",
		image: "/images/Monsterling_Icons/MonsterlingStoneguy.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Attacks' Earth DMG +11% upon attacking with Elemental Weakness.",
	},
	41: {
		id: 41,
		name: "Golden Fist Dude",
		linkChain: {
			unlock_level: 13,
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Golden Heart",
			trigger: ["Using a Switch Skill"],
			effect: "Takes a defensive stance and grants nearby allies Super Armor.",
			bonusEffects: ["Super Armor (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingStoneGuyGold.png",
		image: "/images/Monsterling_Icons/MonsterlingStoneGuyGold.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Attack Neutralization DMG +11.55% upon attacking with Elemental Weakness",
	},
	42: {
		id: 42,
		name: "Orc Warrior",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOrc.png",
		image: "/images/Monsterling_Icons/MonsterlingOrc.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +6.25% against normal enemies (Cooldown: 20s)",
	},
	43: {
		id: 43,
		name: "Pink Orc Dude",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOrcAxePink.png",
		image: "/images/Monsterling_Icons/MonsterlingOrcAxePink.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Physical DMG +6.57% against normal enemies (Cooldown: 20s)",
	},
	44: {
		id: 44,
		name: "Orc Raider",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOrcAxe.png",
		image: "/images/Monsterling_Icons/MonsterlingOrcAxe.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +6.25% against normal enemies (Cooldown: 20s)",
	},
	45: {
		id: 45,
		name: "Rockymander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyong.png",
		image: "/images/Monsterling_Icons/MonsterlingDoranyong.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +6.25% for 5s upon being hit 10 times",
	},
	46: {
		id: 46,
		name: "Leafymander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyongMutation01.png",
		image: "/images/Monsterling_Icons/MonsterlingDoranyongMutation01.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit DMG +6.57% for 5s upon being hit 10 times",
	},
	47: {
		id: 47,
		name: "Bouldermander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyong.png",
		image: "/images/Monsterling_Icons/MonsterlingDoranyong.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill DMG +6.25% for 5s upon being hit 10 times",
	},
	48: {
		id: 48,
		name: "Vikkymander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyongKingHat.png",
		image: "/images/Monsterling_Icons/MonsterlingDoranyongKingHat.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill DMG +6.57% 5s upon being hit 10 times",
	},
	49: {
		id: 49,
		name: "Troll",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTroll.png",
		image: "/images/Monsterling_Icons/MonsterlingTroll.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ultimate Skill's Neutralization DMG +6.25%",
	},
	50: {
		id: 50,
		name: "Noxtroll",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTrollBlue.png",
		image: "/images/Monsterling_Icons/MonsterlingTrollBlue.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Ultimate Skill's Neutralization DMG +6.57%",
	},
	51: {
		id: 51,
		name: "Urgash",
		linkChain: {
			unlock_level: 12,
			sort_order: 1,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Destroyer's Horn",
			trigger: ["When Burst is triggered"],
			effect:
				"Leaps at the enemy and strikes several times, dealing Physical DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTrollKing.png",
		image: "/images/Monsterling_Icons/MonsterlingTrollKing.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ultimate Skill Elemental Weakness DMG +8%",
	},
	52: {
		id: 52,
		name: "Wolf",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolf.png",
		image: "/images/Monsterling_Icons/MonsterlingWolf.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +6.3% for 5s upon landing a critical hit",
	},
	53: {
		id: 53,
		name: "Albino Wolf",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingWolfWhite.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Physical DMG +6.6% for 5s upon landing a critical hit",
	},
	54: {
		id: 54,
		name: "Behemo-Wolf",
		linkChain: {
			unlock_level: 12,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Giant Wolf's Fang",
			trigger: ["Landing an attack"],
			effect:
				"Leaps toward the enemy and roars, dealing Physical DMG to nearby targets.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfHuge.png",
		image: "/images/Monsterling_Icons/MonsterlingWolfHuge.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Suppression DMG +8% for 10s upon landing a critical hit",
	},
	55: {
		id: 55,
		name: "Scar",
		linkChain: {
			unlock_level: 13,
			sort_order: 1,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Void's Crimson Bead",
			trigger: ["Landing a critical hit"],
			effect:
				"Charges repeatedly, then attacks with Wolf's Soul, dealing Dark DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfHugeScar.png",
		image: "/images/Monsterling_Icons/MonsterlingWolfHugeScar.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DMG +8% against boss enemies for 5s upon landing a critical hit",
	},
	56: {
		id: 56,
		name: "Frostbite",
		linkChain: {
			unlock_level: 14,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Giant Wolf's Helm",
			trigger: ["Landing a critical hit"],
			effect:
				"Opens a Void rift and strikes with a sword, dealing Dark DMG and rendering the enemy Airborne.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfHugeScarWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingWolfHugeScarWhite.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill DMG +8.4% for 10s upon landing a critical hit",
	},
	57: {
		id: 57,
		name: "Shellymander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSoranyong.png",
		image: "/images/Monsterling_Icons/MonsterlingSoranyong.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +6.25% for 5s upon being hit 10 times",
	},
	58: {
		id: 58,
		name: "Mollumander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSoranyongMutation01.png",
		image: "/images/Monsterling_Icons/MonsterlingSoranyongMutation01.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Physical DMG +6.57% for 5s upon being hit 10 times",
	},
	59: {
		id: 59,
		name: "Swellymander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSoranyongKing.png",
		image: "/images/Monsterling_Icons/MonsterlingSoranyongKing.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Basic Attack DMG +6.25% for 5s upon being hit 10 times",
	},
	60: {
		id: 60,
		name: "Harvester",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageSoldier.png",
		image: "/images/Monsterling_Icons/MonsterlingBlackKnightageSoldier.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +6.25% for 5s upon being hit (Cooldown: 20s)",
	},
	61: {
		id: 61,
		name: "Enforcer",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageSoldierSpear.png",
		image:
			"/images/Monsterling_Icons/MonsterlingBlackKnightageSoldierSpear.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DEF +4.69% for 5s upon being hit (Cooldown: 20s)",
	},
	62: {
		id: 62,
		name: "Void Friar",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageMonk.png",
		image: "/images/Monsterling_Icons/MonsterlingBlackKnightageMonk.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Elemental Weakness DMG +6.25% for 5s upon being hit (Cooldown: 20s)",
	},
	63: {
		id: 63,
		name: "Monk's Shadow",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageMonkWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingBlackKnightageMonkWhite.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Elemental Weakness DMG +6.57% for 5s upon being hit (Cooldown: 20s)",
	},
	64: {
		id: 64,
		name: "Vectus",
		linkChain: {
			unlock_level: 13,
			sort_order: 2,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Void's Balance",
			trigger: ["Landing a critical hit"],
			effect:
				"Detonates a thorny crown around the enemy, dealing Dark DMG and rendering them Airborne.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightagePriest.png",
		image: "/images/Monsterling_Icons/MonsterlingBlackKnightagePriest.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "ATK +4% for 10s upon being hit (Cooldown: 20s)",
	},
	65: {
		id: 65,
		name: "Mountaintaur",
		linkChain: {
			unlock_level: 10,
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Bloodstained Bridle",
			trigger: ["Using a Switch Skill"],
			effect: "Breathes flames at the enemy, dealing Fire DMG.",
			bonusEffects: ["5% Fire RES Reduction (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMinotaMountain.png",
		image: "/images/Monsterling_Icons/MonsterlingMinotaMountain.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Crit DMG +11% against Staggered boss enemies",
	},
	66: {
		id: 66,
		name: "Tealtaur",
		linkChain: {
			unlock_level: 12,
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Weathered Hoof",
			trigger: ["Using a Switch Skill"],
			effect:
				"Strikes twice with an axe, dealing Fire DMG and rendering the enemy Airborne.",
			bonusEffects: ["10% Fire RES Reduction (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMinotaForestWind.png",
		image: "/images/Monsterling_Icons/MonsterlingMinotaForestWind.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Fire DMG +11.55% against Staggered boss enemies",
	},
	67: {
		id: 67,
		name: "Amon",
		linkChain: {
			unlock_level: 14,
			tier_id: TIER_ID_BY_TIER.PRIME_5,
			name: "Void's Seed",
			trigger: ["Using a Special Skill"],
			effect:
				"Jumps toward the enemy and strikes with a sword, dealing Dark DMG and rendering them Airborne.",
			bonusEffects: ["5% Elemental Weakness DMG Boost (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAmon.png",
		image: "/images/Monsterling_Icons/MonsterlingAmon.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"All teammates' Crit Rate +11% for 10s upon attacking boss enemy 10 times",
	},
	68: {
		id: 68,
		name: "Amon's Shadow",
		linkChain: {
			unlock_level: 16,
			tier_id: TIER_ID_BY_TIER.PRIME_5,
			name: "Token of Obedience",
			trigger: ["Using a Special Skill", "Landing an Ultimate Skill"],
			effect:
				"Attacks with dual swords, then lands a final strike that deals Dark DMG and renders the enemy Airborne.",
			bonusEffects: ["15% Elemental Weakness DMG Boost (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAmonWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingAmonWhite.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"All teammates' Crit Rate +11.55% for 10s upon using Evasion Counter",
	},
};
