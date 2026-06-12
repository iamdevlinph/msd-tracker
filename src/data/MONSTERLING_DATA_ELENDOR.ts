import { ELEMENT_ID_BY_ELEMENT } from "@/data/ELEMENTS_DATA";
import type { MonsterCodexData } from "@/data/MONSTERLINGS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";

export const MONSTERLING_DATA_ELENDOR: MonsterCodexData = {
	1: {
		id: 1,
		name: "Cappy",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopy.png",
		image: "/images/Monsterling_Icons/MonsterlingChopy.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Crit Rate +5% (Cooldown: 20s)",
	},
	2: {
		id: 2,
		name: "Cappyberry",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyPurple.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyPurple.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill Crit Rate + 5.25% (Cooldown: 20s)",
	},
	3: {
		id: 3,
		name: "Cappy Mama",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyKing.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyKing.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE, SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"Recovers 1.65% of Max HP upon landing a Special Skill (Cooldown: 15s)",
	},
	4: {
		id: 4,
		name: "Leafy Mama",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyKingSlimeling.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyKingSlimeling.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Recovers 1.74% of Max HP upon using a Special Skill (Cooldown: 15s)",
	},
	5: {
		id: 5,
		name: "Slimelet",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlime.png",
		image: "/images/Monsterling_Icons/MonsterlingSlime.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +5% against Physical enemies",
	},
	6: {
		id: 6,
		name: "Inklet",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeBlack.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit DMG +5.25% against Physical enemies",
	},
	7: {
		id: 7,
		name: "Goblin Recruit",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblin.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblin.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Crit DMG +5% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	8: {
		id: 8,
		name: "2nd Lt. Goblin",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinPink.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinPink.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Crit DMG +5.25% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	9: {
		id: 9,
		name: "Pvt. Goblin",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinBow.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinBow.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Physical DMG +5% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	10: {
		id: 10,
		name: "Cpl. Goblin",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinshield.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinshield.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Suppression DMG +5% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	11: {
		id: 11,
		name: "White Wolf Warrior",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolf.png",
		image: "/images/Monsterling_Icons/MonsterlingWerewolf.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Brawl DMG +5% for 5s upon landing a critical hit (Cooldown: 20s)",
	},
	12: {
		id: 12,
		name: "Black Wolf",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWhiteWolf_HostileBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingWhiteWolf_HostileBlack.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Brawl DMG +5.25% for 5s upon landing a critical hit (Cooldown: 20s)",
	},
	13: {
		id: 13,
		name: "Frostjaw",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolfMagic.png",
		image: "/images/Monsterling_Icons/MonsterlingWerewolfMagic.png",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Critical Ice DMG +5%",
	},
	14: {
		id: 14,
		name: "Crimsonjaw",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolfMagicianRed.png",
		image: "/images/Monsterling_Icons/MonsterlingWerewolfMagicianRed.png",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Critical Ice DMG +5.25%",
	},
	15: {
		id: 15,
		name: "Forkmugger",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpoonmuggerFork.png",
		image: "/images/Monsterling_Icons/MonsterlingSpoonmuggerFork.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Target's Physical RES -6% for 5s upon attacking with target's Elemental Weakness",
	},
	16: {
		id: 16,
		name: "King Slime",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeKing.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeKing.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"All teammates' DEF +4.5% for 5s upon attacking Water enemy (Cooldown: 10s)",
	},
	17: {
		id: 17,
		name: "Scarlet Queen",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeRed.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeRed.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "ATK +3.15% for 10s upon attacking Water enemy (Cooldown: 20s)",
	},
	18: {
		id: 18,
		name: "Taglock",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinChief.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinChief.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"ATK +3% for 10s upon making 20 successful attacks (Cooldown: 20s)",
	},
	19: {
		id: 19,
		name: "Big Bro Goblin",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinChiefWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinChiefWhite.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Restores 1.89% HP for all teammates upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	20: {
		id: 20,
		name: "Lupe",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHaka.png",
		image: "/images/Monsterling_Icons/MonsterlingHaka.png",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"Neutralization DMG +6% for 10s upon landing a critical hit (Cooldown: 20s)",
	},
	21: {
		id: 21,
		name: "Moon Shadow Lupe",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHakaPurple.png",
		image: "/images/Monsterling_Icons/MonsterlingHakaPurple.png",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Target's Ice RES -6.3% for 10s upon landing a critical hit",
	},
	22: {
		id: 22,
		name: "Ring Slime",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeLing.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeLing.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "ATK +2.75% against Physical enemies",
	},
	23: {
		id: 23,
		name: "Uncle Cappy",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyThrowUncle.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyThrowUncle.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Fire DMG +5.5% (Cooldown: 15s)",
	},
	24: {
		id: 24,
		name: "Green Cappy Bro",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopaThrowUncle1.png",
		image: "/images/Monsterling_Icons/MonsterlingChopaThrowUncle1.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill Fire DMG +5.78% (Cooldown: 15s)",
	},
	25: {
		id: 25,
		name: "Digger Mole",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDugi.png",
		image: "/images/Monsterling_Icons/MonsterlingDugi.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +5% against knocked-down targets",
	},
	26: {
		id: 26,
		name: "Gold Digger Mole",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDugiGold.png",
		image: "/images/Monsterling_Icons/MonsterlingDugiGold.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit Rate +5.25% against knocked-down targets",
	},
	27: {
		id: 27,
		name: "Tunneler Mole",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDugi_SlingShot.png",
		image: "/images/Monsterling_Icons/MonsterlingDugi_SlingShot.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Earth DMG +5% against knocked-down targets",
	},
	28: {
		id: 28,
		name: "Brown Cappy",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyThrow.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyThrow.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Crit DMG +5% (Cooldown: 20s)",
	},
	29: {
		id: 29,
		name: "Teal Cappy",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyThrowBlue.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyThrowBlue.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill Crit DMG + 5.25% (Cooldown: 20s)",
	},
	30: {
		id: 30,
		name: "Green Cappy",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyPoison.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyPoison.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Neutralization DMG +5% (Cooldown: 15s)",
	},
	31: {
		id: 31,
		name: "Orange Cappy",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyPoisonOrange.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyPoisonOrange.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill Neutralization DMG +5.25% (Cooldown: 15s)",
	},
	32: {
		id: 32,
		name: "Spark Slime",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeThunder.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeThunder.png",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +5% against Lightning enemies",
	},
	33: {
		id: 33,
		name: "Golden Spark Slime",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeThunderYellow.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeThunderYellow.png",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit Rate +5.25% against Lightning enemies",
	},
	34: {
		id: 34,
		name: "White Wolf Fulminator",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolf_MagicianLightning.png",
		image:
			"/images/Monsterling_Icons/MonsterlingWerewolf_MagicianLightning.png",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE, SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Critical Lightning DMG +5.5%",
	},
	35: {
		id: 35,
		name: "Moley Mole",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMolly.png",
		image: "/images/Monsterling_Icons/MonsterlingMolly.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE, SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Suppression DMG +5.5% against knocked-down targets",
	},
	36: {
		id: 36,
		name: "Gold Digger Moley Mole",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMoleyGold.png",
		image: "/images/Monsterling_Icons/MonsterlingMoleyGold.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Suppression DMG +5.78% against knocked-down targets",
	},
	37: {
		id: 37,
		name: "Green Cappy Papa",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopaDaddy.png",
		image: "/images/Monsterling_Icons/MonsterlingChopaDaddy.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill ATK +2.75% (Cooldown: 15s)",
	},
	38: {
		id: 38,
		name: "Custos",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGolemBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingGolemBlack.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"Target's DEF -4.5% for 5s upon landing a critical hit with an Earth Attack",
	},
	39: {
		id: 39,
		name: "El Dorado Guardian",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGolemGold.png",
		image: "/images/Monsterling_Icons/MonsterlingGolemGold.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"All teammates ATK +3.15% for 10s upon attacking a boss enemy with its Elemental Weakness (Cooldown: 20s)",
	},
};
