import { ELEMENT_ID_BY_ELEMENT } from "@/data/elements/ELEMENTS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";
import type { MonsterCodexData } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { REGION_ID_BY_REGION } from "@/data/regions/REGIONS_DATA";
import { TIER_ID_BY_TIER } from "@/data/tiers/TIERS_DATA";

export const MONSTERLING_DATA_NAMRYUNG: MonsterCodexData = {
	121: {
		id: 121,
		name: "Black Hauntstack",
		linkChain: {
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Youkai's Giant Charm",
			trigger: ["Landing an attack"],
			effect:
				"Creates a whirlwind and finishes with a descending strike, dealing Water DMG and rendering the enemy Airborne.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingGeuseunsaeBlack.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ice DMG +5.5% against Staggered boss enemies",
	},
	122: {
		id: 122,
		name: "Ronin Bunnie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRabbitBackah.png",
		image: "/images/Monsterling_Icons/MonsterlingRabbitBackah.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Wind DMG +5% for 5s upon using Evasion Counter",
	},
	123: {
		id: 123,
		name: "Bleacher Bunnie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRabbitBackahWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingRabbitBackahWhite.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Wind DMG +5.3% for 5s upon using Evasion Counter",
	},
	124: {
		id: 124,
		name: "Ronin Raccoonie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRaccoonBackah.png",
		image: "/images/Monsterling_Icons/MonsterlingRaccoonBackah.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DMG +5% against boss enemies for 5s upon using Evasion Counter",
	},
	125: {
		id: 125,
		name: "Bleacher Raccoonie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRaccoonBackahWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingRaccoonBackahWhite.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "DMG +5.3% against boss enemies for 5s upon using Evasion Counter",
	},
	126: {
		id: 126,
		name: "Ronin Turtlie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtleBackah.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanTurtleBackah.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5% for 5s upon being hit by a boss enemy",
	},
	127: {
		id: 127,
		name: "Hop-alee",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguri.png",
		image: "/images/Monsterling_Icons/MonsterlingMeoguri.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Air Counter Crit Rate +5%",
	},
	128: {
		id: 128,
		name: "Salt-alee",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriBlue.png",
		image: "/images/Monsterling_Icons/MonsterlingMeoguriBlue.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Air Counter Crit Rate +5.3%",
	},
	129: {
		id: 129,
		name: "Brute-alee",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriRed.png",
		image: "/images/Monsterling_Icons/MonsterlingMeoguriRed.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Air Counter Crit DMG +5%",
	},
	130: {
		id: 130,
		name: "Borborg",
		linkChain: {
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Thorny Shield",
			trigger: ["Landing an attack"],
			effect: "Spins into the enemy, dealing Physical DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriShieldBoss.png",
		image: "/images/Monsterling_Icons/MonsterlingMeoguriShieldBoss.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE, SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "DEF +4.1% for 5s upon attacking a boss enemy 10 times",
	},
	131: {
		id: 131,
		name: "Goald",
		linkChain: {
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Gold-Plated Spiky Shield",
			trigger: ["Landing a Fire Attack"],
			effect: "Attacks the enemy and applies a Fire resistance reduction.",
			bonusEffects: ["5% Fire RES Reduction (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriShieldBossGold.png",
		image: "/images/Monsterling_Icons/MonsterlingMeoguriShieldBossGold.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "DEF +4.3% for 5s upon attacking a boss enemy 10 times",
	},
	132: {
		id: 132,
		name: "Cacabagge",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNachuchu.png",
		image: "/images/Monsterling_Icons/MonsterlingNachuchu.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Earth DMG +5% against normal enemies",
	},
	133: {
		id: 133,
		name: "Kimkimchi",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNachuchuKimchi.png",
		image: "/images/Monsterling_Icons/MonsterlingNachuchuKimchi.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Earth DMG +5.3% against normal enemies",
	},
	134: {
		id: 134,
		name: "Cocorn",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNasusu.png",
		image: "/images/Monsterling_Icons/MonsterlingNasusu.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +5% against normal enemies (Cooldown: 20s)",
	},
	135: {
		id: 135,
		name: "Rococorn",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNasusuButter.png",
		image: "/images/Monsterling_Icons/MonsterlingNasusuButter.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit DMG +5.3% against normal enemies (Cooldown: 20s)",
	},
	136: {
		id: 136,
		name: "Twisted Spineflower",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingFlowerBackah.png",
		image: "/images/Monsterling_Icons/MonsterlingFlowerBackah.png",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Lightning DMG +5% upon attacking Lightning enemy 10 times",
	},
	137: {
		id: 137,
		name: "Twisted Bloodflower",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingFlowerBackahMiddle.png",
		image: "/images/Monsterling_Icons/MonsterlingFlowerBackahMiddle.png",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Target's Lightning RES -5% for 5s upon attacking Lightning enemy 5 times (Cooldown: 20s)",
	},
	138: {
		id: 138,
		name: "Bruised Bloodflower",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingFlowerBackahMiddleBlue.png",
		image: "/images/Monsterling_Icons/MonsterlingFlowerBackahMiddleBlue.png",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Target's Lightning RES -5.3% for 5s upon attacking Lightning enemy 5 times",
	},
	139: {
		id: 139,
		name: "Manwol",
		linkChain: {
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Shining Hoof",
			trigger: ["Landing a Wind Attack"],
			effect:
				"Creates a feather-filled whirlwind that drags enemies in, dealing Wind DMG and rendering them Airborne.",
			bonusEffects: ["5% Wind RES Reduction (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingManwollok.png",
		image: "/images/Monsterling_Icons/MonsterlingManwollok.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Crit Rate +6% for 5s upon using Evasion Counter",
	},
	140: {
		id: 140,
		name: "Nokjung",
		linkChain: {
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Black Antler",
			trigger: ["Landing a Wind Attack"],
			effect:
				"Fires feathers, then charges the enemy, dealing Wind DMG and rendering them Airborne.",
			bonusEffects: ["10% Wind RES Reduction (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingManwollokBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingManwollokBlack.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit Rate +6.3% for 5s upon using Evasion Counter",
	},
	141: {
		id: 141,
		name: "Onsae",
		linkChain: {
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Flaming Fox Fur",
			trigger: ["Landing a Fire Attack"],
			effect: "Spins into the enemy, dealing Fire DMG.",
			bonusEffects: ["5% Fire RES Reduction (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHakaBackah.png",
		image: "/images/Monsterling_Icons/MonsterlingHakaBackah.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"Crit DMG +6% for 5s upon landing a critical hit with an Ultimate Skill",
	},
	142: {
		id: 142,
		name: "Cinder",
		linkChain: {
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Hot Furball",
			trigger: ["Landing a Fire Attack"],
			effect: "Breathes fire at the enemy, dealing Fire DMG.",
			bonusEffects: ["10% Fire RES Reduction (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHakaBackahBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingHakaBackahBlack.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Crit DMG +6.3% for 5s upon landing a critical hit with Ultimate Skill",
	},
	143: {
		id: 143,
		name: "Hahnul",
		linkChain: {
			tier_id: TIER_ID_BY_TIER.PRIME_5,
			name: "Giant Tiger's Claw",
			trigger: ["Using a Special Skill", "Landing an Ultimate Skill"],
			effect:
				"Leaps at the enemy and strikes with its paw, dealing Lightning DMG and rendering them Airborne.",
			bonusEffects: [
				"10% Lightning RES Reduction (5s)",
				"15% Neutralization RES Reduction (5s)",
			],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHanul.png",
		image: "/images/Monsterling_Icons/MonsterlingHanul.png",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"All teammates' Switch Skill DMG +6% for 10s upon landing a critical hit on a boss enemy",
	},
	144: {
		id: 144,
		name: "Gulgak",
		linkChain: {
			tier_id: TIER_ID_BY_TIER.PRIME_5,
			name: "Cursed Rosary",
			trigger: ["Using a Special Skill", "Landing an Ultimate Skill"],
			effect:
				"Strikes the ground and roars, dealing Lightning DMG and rendering enemies Airborne.",
			bonusEffects: [
				"5% Lightning RES Reduction (5s)",
				"15% Elemental Weakness DMG Boost (5s)",
			],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHanulWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingHanulWhite.png",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Target's DEF -4.7% for 5s upon landing a critical hit on a boss enemy.",
	},
};
