import { ELEMENT_ID_BY_ELEMENT } from "@/data/ELEMENTS_DATA";
import type { MonsterCodexData } from "@/data/MONSTERLINGS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";

export const MONSTERLING_DATA_MUWON: MonsterCodexData = {
	145: {
		id: 145,
		name: "Baby Spirit",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChildGhost.png",
		image: "/images/Monsterling_Icons/MonsterlingChildGhost.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"DMG +5% against normal enemies for 5s upon attacking Wind enemy 10 times",
	},
	146: {
		id: 146,
		name: "Chipmunk Spirit",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChildGhostSquirrel.png",
		image: "/images/Monsterling_Icons/MonsterlingChildGhostSquirrel.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"DMG +5% against normal enemies for 5s upon attacking Wind enemy 10 times",
	},
	147: {
		id: 147,
		name: "Wind Spirit",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGhostWind.png",
		image: "/images/Monsterling_Icons/MonsterlingGhostWind.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "ATK +2.5% upon attacking Wind enemy 10 times",
	},
	148: {
		id: 148,
		name: "Grudge Spirit",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGhostWindMiddle.png",
		image: "/images/Monsterling_Icons/MonsterlingGhostWindMiddle.png",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon using a Switch Skill",
	},
	149: {
		id: 149,
		name: "Grudge Revenant",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGhostWindMiddleRed.png",
		image: "/images/Monsterling_Icons/MonsterlingGhostWindMiddleRed.png",
		element_id: ELEMENT_ID_BY_ELEMENT.DARK,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon using a Switch Skill",
	},
	150: {
		id: 150,
		name: "Phantom Snow Tiger",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSnowyBeast.png",
		image: "/images/Monsterling_Icons/MonsterlingSnowyBeast.png",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE, SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Suppression DMG +5.5% for 5s upon using a Switch Skill",
	},
	151: {
		id: 151,
		name: "Phantom Stone Tiger",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSnowyBeastBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingSnowyBeastBlack.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Suppression DMG +5.5% for 5s upon using a Switch Skill",
	},
	152: {
		id: 152,
		name: "Lizarcher",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanLizardBow.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanLizardBow.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DEF +3.75% for 5s upon attacking Fire enemy 10 times",
	},
	153: {
		id: 153,
		name: "Sun Lizarcher",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanLizardBowRed.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanLizardBowRed.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "DEF +3.75% for 5s upon attacking Fire enemy 10 times",
	},
	154: {
		id: 154,
		name: "Lizcout",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanLizard.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanLizard.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Earth ATK +5% for 10s upon being hit (Cooldown: 20s)",
	},
	155: {
		id: 155,
		name: "Master Lizcout",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanLizardHat.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanLizardHat.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Earth ATK +5% for 10s upon being hit (Cooldown: 20s)",
	},
	156: {
		id: 156,
		name: "Kroko",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanCrocodile.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanCrocodile.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DEF +3.75% for 5s upon attacking normal enemy 10 times",
	},
	157: {
		id: 157,
		name: "Krokomander",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanCrocodileDora.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanCrocodileDora.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "DEF +3.75% for 5s upon attacking normal enemy 10 times",
	},
	158: {
		id: 158,
		name: "Bunnie Swordsman",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKnightRabbit_Evil.png",
		image: "/images/Monsterling_Icons/MonsterlingKnightRabbit_Evil.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Target's Wind RES -5% for 5s upon using Evasion Counter",
	},
	159: {
		id: 159,
		name: "Toad-alee",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriShield.png",
		image: "/images/Monsterling_Icons/MonsterlingMeoguriShield.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "All teammates' DEF +4.13% for 5s upon being hit by a boss enemy ",
	},
	160: {
		id: 160,
		name: "Irontoise",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtle.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanTurtle.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"All teammates' DEF +4.13% for 10s upon landing a critical hit on a boss enemy",
	},
	161: {
		id: 161,
		name: "Treetoise",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtleBrown.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanTurtleBrown.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"All teammates' DEF +4.13% for 10s upon landing a critical hit on a boss enemy",
	},
	162: {
		id: 162,
		name: "Sunek",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNagiMiddle.png",
		image: "/images/Monsterling_Icons/MonsterlingNagiMiddle.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DEF +3.75% for 5s upon attacking Wind enemy 10 times",
	},
	163: {
		id: 163,
		name: "Suhwa",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNagiMiddlePink.png",
		image: "/images/Monsterling_Icons/MonsterlingNagiMiddlePink.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "DEF +3.75% for 5s upon attacking Wind enemy 10 times",
	},
	164: {
		id: 164,
		name: "Red Shadow",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWetlandMaster.png",
		image: "/images/Monsterling_Icons/MonsterlingWetlandMaster.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability: "Crit DMG +6% for 4s upon using a Ice Special Skill",
	},
	165: {
		id: 165,
		name: "Blue Shadow",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWetlandMasterBlue.png",
		image: "/images/Monsterling_Icons/MonsterlingWetlandMasterBlue.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Ice DMG +6% upon attacking with a Ice Special Skill",
	},
};
