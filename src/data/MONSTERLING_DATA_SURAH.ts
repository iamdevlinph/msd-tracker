import { ELEMENT_ID_BY_ELEMENT } from "@/data/ELEMENTS_DATA";
import type { MonsterCodexData } from "@/data/MONSTERLINGS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";

export const MONSTERLING_DATA_SURAH: MonsterCodexData = {
	96: {
		id: 96,
		name: "Lil' Hauntstack",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeSmall.png",
		image: "/images/Monsterling_Icons/MonsterlingGeuseunsaeSmall.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Switch Skill Crit DMG +5%",
	},
	97: {
		id: 97,
		name: "Sacred Hauntstack",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeSky.png",
		image: "/images/Monsterling_Icons/MonsterlingGeuseunsaeSky.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Switch Skill Crit DMG +5.25%",
	},
	98: {
		id: 98,
		name: "Hauntstack",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsae.png",
		image: "/images/Monsterling_Icons/MonsterlingGeuseunsae.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Switch Skill Crit Rate +5",
	},
	99: {
		id: 99,
		name: "Brush Hauntstack",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeGreen.png",
		image: "/images/Monsterling_Icons/MonsterlingGeuseunsaeGreen.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Ice DMG +5.25% against Staggered boss enemies",
	},
	100: {
		id: 100,
		name: "Bop-kkaebi",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKkebi.png",
		image: "/images/Monsterling_Icons/MonsterlingKkebi.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ultimate Skill Crit DMG 5%",
	},
	101: {
		id: 101,
		name: "Pew-kkaebi",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKkebiGreen.png",
		image: "/images/Monsterling_Icons/MonsterlingKkebiGreen.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ultimate Skill Fire DMG +5%",
	},
	102: {
		id: 102,
		name: "Kkaebi Herder",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinShieldKkebi.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinShieldKkebi.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"DMG +5% against normal enemies for 5s upon using an Ultimate Skill",
	},
	103: {
		id: 103,
		name: "Odong Seed",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOdongseed.png",
		image: "/images/Monsterling_Icons/MonsterlingOdongseed.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Crit Rate +5% (Cooldown: 20s)",
	},
	104: {
		id: 104,
		name: "Odong",
		linkChain: {
			name: "Mysterious Branch",
			trigger: ["Using a Special Skill"],
			effect: "Summons roots beneath the enemy, dealing Earth DMG.",
			bonusEffects: ["Shackle (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKimodong.png",
		image: "/images/Monsterling_Icons/MonsterlingKimodong.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Switch Skill ATK +3%",
	},
	105: {
		id: 105,
		name: "Maple Odong",
		linkChain: {
			name: "Autumn Branch",
			trigger: ["Using a Special Skill"],
			effect: "Creates a poisonous rooted area, dealing Earth DMG.",
			bonusEffects: ["10% Earth RES Reduction (5s)", "Shackle (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKimodongMaple.png",
		image: "/images/Monsterling_Icons/MonsterlingKimodongMaple.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Switch Skill ATK +3.15%",
	},
	106: {
		id: 106,
		name: "Tree Youkai",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTreeBackah.png",
		image: "/images/Monsterling_Icons/MonsterlingTreeBackah.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Switch Skill Fire DMG +5%",
	},
	107: {
		id: 107,
		name: "Stumpster",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTreeBackahAxe.png",
		image: "/images/Monsterling_Icons/MonsterlingTreeBackahAxe.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Switch Skill Fire DMG +5%",
	},
	108: {
		id: 108,
		name: "Bunnie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRabbitPojol.png",
		image: "/images/Monsterling_Icons/MonsterlingRabbitPojol.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5% for 5s upon using Evasion Counter",
	},
	109: {
		id: 109,
		name: "Masked Bunnie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRabbitKkebiGreen.png",
		image: "/images/Monsterling_Icons/MonsterlingRabbitKkebiGreen.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Physical DMG +5.25% for 5s upon using Evasion Counter",
	},
	110: {
		id: 110,
		name: "Raccoonie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRaccoonPojol.png",
		image: "/images/Monsterling_Icons/MonsterlingRaccoonPojol.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Target's Physical RES -5% for 5s upon using Evasion Counter",
	},
	111: {
		id: 111,
		name: "Masked Raccoonie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRaccoonMask.png",
		image: "/images/Monsterling_Icons/MonsterlingRaccoonMask.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Target's Physical RES -5.25% for 5s upon using Evasion Counter",
	},
	112: {
		id: 112,
		name: "Battle Spirit",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniMiddle.png",
		image: "/images/Monsterling_Icons/MonsterlingDuoxiniMiddle.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Fire DMG +5% against boss enemies",
	},
	113: {
		id: 113,
		name: "White Wraith",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniMiddleWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingDuoxiniMiddleWhite.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Fire DMG +5.25% against boss enemies",
	},
	114: {
		id: 114,
		name: "Shademask",
		linkChain: {
			name: "Dokkaebi Mask",
			trigger: ["Landing an attack"],
			effect: "Leaps at the enemy and attacks, dealing Fire DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniMiddleBoss.png",
		image: "/images/Monsterling_Icons/MonsterlingDuoxiniMiddleBoss.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Target's ATK -2.75% for 10s upon attacking a boss enemy (Cooldown: 20s)",
	},
	115: {
		id: 115,
		name: "Ashen Mask",
		linkChain: {
			name: "Ancient Dokkaebi's White Mask",
			trigger: ["Using a Special Skill"],
			effect:
				"Throws a fireball that creates Fire, Earth, and Ice elemental zones.",
			bonusEffects: [
				"Elemental Zone Duration (5s)",
				"3% Fire RES Reduction",
				"3% Earth RES Reduction",
				"3% Ice RES Reduction",
			],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniMiddleBossWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingDuoxiniMiddleBossWhite.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Target's ATK -2.75% for 10s upon attacking a boss enemy (Cooldown: 20s)",
	},
	116: {
		id: 116,
		name: "Turtlie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtlePojol.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanTurtlePojol.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon being hit by a boss enemy",
	},
	117: {
		id: 117,
		name: "Silvershell",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtleSilver.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanTurtleSilver.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon being hit by a boss enemy",
	},
	118: {
		id: 118,
		name: "Swamp Odong",
		linkChain: {
			name: "Fabric Talismans",
			trigger: ["Using a Special Skill"],
			effect: "Creates a poisonous area, dealing Earth DMG.",
			bonusEffects: ["3% Earth RES Reduction (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKimodongSwamp.png",
		image: "/images/Monsterling_Icons/MonsterlingKimodongSwamp.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Target's Earth RES -5.5% for 10s upon using a Switch Skill",
	},
	119: {
		id: 119,
		name: "Duoxini",
		linkChain: {
			name: "Dokkaebi King's Mask",
			trigger: ["Using a Special Skill", "Landing an Ultimate Skill"],
			effect:
				"Summons a totem that drags enemies in and explodes, dealing Fire DMG and rendering them Airborne.",
			bonusEffects: [
				"10% Fire RES Reduction (5s)",
				"15% Neutralization RES Reduction (5s)",
			],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxini.png",
		image: "/images/Monsterling_Icons/MonsterlingDuoxini.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"Target's Fire RES -6% for 10s upon attacking with a Fire Special Skill",
	},
	120: {
		id: 120,
		name: "Fiend",
		linkChain: {
			name: "Ancient Dokkaebi's Bat",
			trigger: ["Using a Special Skill", "Landing an Ultimate Skill"],
			effect:
				"Throws and climbs a totem before crashing down, dealing Fire DMG and rendering enemies Airborne.",
			bonusEffects: [
				"Totem Duration (10s)",
				"Super Armor for nearby allies",
				"15% Elemental Weakness DMG Boost against nearby enemies",
			],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniRed.png",
		image: "/images/Monsterling_Icons/MonsterlingDuoxiniRed.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Fire DMG +6.3% upon attacking with a Fire Special Skill",
	},
};
