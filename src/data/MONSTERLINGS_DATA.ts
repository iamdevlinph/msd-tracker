import { SOURCE_ID_BY_SOURCE } from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";

export type MonsterCodexEntry = {
	id: number;
	name: string;
	region_id: number;
	source_id: number[];
	image: string;
	element: string;
	ability: string;
};

// TODO: Double check [SOURCE_ID_BY_SOURCE.REQUEST] if can also capture

export const MONSTERLINGS_DATA: MonsterCodexEntry[] = [
	{
		id: 1,
		name: "Cappy",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopy.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Crit Rate +5% (Cooldown: 20s)",
	},
	{
		id: 2,
		name: "Cappyberry",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyPurple.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill Crit Rate + 5.25% (Cooldown: 20s)",
	},
	{
		id: 3,
		name: "Cappy Mama",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyKing.png",
		element: "Earth ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Recovers 1.65% of Max HP upon landing a Special Skill (Cooldown: 15s)",
	},
	{
		id: 4,
		name: "Leafy Mama",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyKingSlimeling.png",
		element: "Earth ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Recovers 1.74% of Max HP upon using a Special Skill (Cooldown: 15s)",
	},
	{
		id: 5,
		name: "Slimelet",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlime.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +5% against Physical enemies",
	},
	{
		id: 6,
		name: "Inklet",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeBlack.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit DMG +5.25% against Physical enemies",
	},
	{
		id: 7,
		name: "Goblin Recruit",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblin.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Crit DMG +5% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	{
		id: 8,
		name: "2nd Lt. Goblin",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinPink.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Crit DMG +5.25% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	{
		id: 9,
		name: "Pvt. Goblin",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinBow.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Physical DMG +5% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	{
		id: 10,
		name: "Cpl. Goblin",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinshield.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Suppression DMG +5% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	{
		id: 11,
		name: "White Wolf Warrior",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolf.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Brawl DMG +5% for 5s upon landing a critical hit (Cooldown: 20s)",
	},
	{
		id: 12,
		name: "Black Wolf",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWhiteWolf_HostileBlack.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Brawl DMG +5.25% for 5s upon landing a critical hit (Cooldown: 20s)",
	},
	{
		id: 13,
		name: "Frostjaw",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolfMagic.png",
		element: "Ice",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Critical Ice DMG +5%",
	},
	{
		id: 14,
		name: "Crimsonjaw",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolfMagicianRed.png",
		element: "Ice",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Critical Ice DMG +5.25%",
	},
	{
		id: 15,
		name: "Forkmugger",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpoonmuggerFork.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"Target's Physical RES -6% for 5s upon attacking with target's Elemental Weakness",
	},
	{
		id: 16,
		name: "King Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeKing.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"All teammates' DEF +4.5% for 5s upon attacking Water enemy (Cooldown: 10s)",
	},
	{
		id: 17,
		name: "Scarlet Queen",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeRed.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "ATK +3.15% for 10s upon attacking Water enemy (Cooldown: 20s)",
	},
	{
		id: 18,
		name: "Taglock",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinChief.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"ATK +3% for 10s upon making 20 successful attacks (Cooldown: 20s)",
	},
	{
		id: 19,
		name: "Big Bro Goblin",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinChiefWhite.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Restores 1.89% HP for all teammates upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	{
		id: 20,
		name: "Lupe",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHaka.png",
		element: "Ice",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"Neutralization DMG +6% for 10s upon landing a critical hit (Cooldown: 20s)",
	},
	{
		id: 21,
		name: "Moon Shadow Lupe",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHakaPurple.png",
		element: "Ice",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Target's Ice RES -6.3% for 10s upon landing a critical hit",
	},
	{
		id: 22,
		name: "Ring Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeLing.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "ATK +2.75% against Physical enemies",
	},
	{
		id: 23,
		name: "Uncle Cappy",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyThrowUncle.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Special Skill Fire DMG +5.5% (Cooldown: 15s)",
	},
	{
		id: 24,
		name: "Green Cappy Bro",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopaThrowUncle1.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill Fire DMG +5.78% (Cooldown: 15s)",
	},
	{
		id: 25,
		name: "Digger Mole",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDugi.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +5% against knocked-down targets",
	},
	{
		id: 26,
		name: "Gold Digger Mole",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDugiGold.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit Rate +5.25% against knocked-down targets",
	},
	{
		id: 27,
		name: "Tunneler Mole",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDugi_SlingShot.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Earth DMG +5% against knocked-down targets",
	},
	{
		id: 28,
		name: "Brown Cappy",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyThrow.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Crit DMG +5% (Cooldown: 20s)",
	},
	{
		id: 29,
		name: "Teal Cappy",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyThrowBlue.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill Crit DMG + 5.25% (Cooldown: 20s)",
	},
	{
		id: 30,
		name: "Green Cappy",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyPoison.png",
		element: "Earth ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Neutralization DMG +5% (Cooldown: 15s)",
	},
	{
		id: 31,
		name: "Orange Cappy",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyPoisonOrange.png",
		element: "Earth ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill Neutralization DMG +5.25% (Cooldown: 15s)",
	},
	{
		id: 32,
		name: "Spark Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeThunder.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +5% against Lightning enemies",
	},
	{
		id: 33,
		name: "Golden Spark Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeThunderYellow.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit Rate +5.25% against Lightning enemies",
	},
	{
		id: 34,
		name: "White Wolf Fulminator",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolf_MagicianLightning.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Critical Lightning DMG +5.5%",
	},
	{
		id: 35,
		name: "Moley Mole",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMolly.png",
		element: "Earth ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Suppression DMG +5.5% against knocked-down targets",
	},
	{
		id: 36,
		name: "Gold Digger Moley Mole",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMoleyGold.png",
		element: "Earth ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Suppression DMG +5.78% against knocked-down targets",
	},
	{
		id: 37,
		name: "Green Cappy Papa",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopaDaddy.png",
		element: "Earth ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Special Skill ATK +2.75% (Cooldown: 15s)",
	},
	{
		id: 38,
		name: "Custos",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGolemBlack.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"Target's DEF -4.5% for 5s upon landing a critical hit with an Earth Attack",
	},
	{
		id: 39,
		name: "El Dorado Guardian",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGolemGold.png",
		element: "Earth ",
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"All teammates ATK +3.15% for 10s upon attacking a boss enemy with its Elemental Weakness (Cooldown: 20s)",
	},
	{
		id: 40,
		name: "Rock Fist Dude",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingStoneguy.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Attacks' Earth DMG +6% upon attacking with Elemental Weakness",
	},
	{
		id: 41,
		name: "Golden Fist Dude",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingStoneGuyGold.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Attack Neutralization DMG +6.3% upon attacking with Elemental Weakness",
	},
	{
		id: 42,
		name: "Orc Warrior",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOrc.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5% against normal enemies (Cooldown: 20s)",
	},
	{
		id: 43,
		name: "Pink Orc Dude",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOrcAxePink.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Physical DMG +5.25% against normal enemies (Cooldown: 20s)",
	},
	{
		id: 44,
		name: "Orc Raider",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOrcAxe.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +5% against normal enemies (Cooldown: 20s)",
	},
	{
		id: 45,
		name: "Rockymander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyong.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +5% for 5s upon being hit 10 times",
	},
	{
		id: 46,
		name: "Leafymander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyongMutation01.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit DMG +5.25% for 5s upon being hit 10 times",
	},
	{
		id: 47,
		name: "Bouldermander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyong.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill DMG +5% for 5s upon being hit 10 times",
	},
	{
		id: 48,
		name: "Vikkymander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyongKingHat.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill DMG +5.25% for 5s upon being hit 10 times",
	},
	{
		id: 49,
		name: "Troll",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTroll.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ultimate Skill Neutralization DMG +5%",
	},
	{
		id: 50,
		name: "Noxtroll",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTrollBlue.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Ultimate Skill Neutralization DMG + 5.25%",
	},
	{
		id: 51,
		name: "Urgash",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTrollKing.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Ultimate Skill Elemental Weakness DMG +5.5%",
	},
	{
		id: 52,
		name: "Wolf",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolf.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5% for 5s upon landing a critical hit",
	},
	{
		id: 53,
		name: "Albino Wolf",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfWhite.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Physical DMG +5.25% for 5s upon landing a critical hit",
	},
	{
		id: 54,
		name: "Behemo-Wolf",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfHuge.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Suppression DMG +5.5% for 10s upon landing a critical hit",
	},
	{
		id: 55,
		name: "Scar",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfHugeScar.png",
		element: "Dark",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"DMG +5.5% against boss enemies for 5s upon landing a critical hit",
	},
	{
		id: 56,
		name: "Frostbite",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfHugeScarWhite.png",
		element: "Dark",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill DMG +5.78% for 10s upon landing a critical hit",
	},
	{
		id: 57,
		name: "Shellymander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSoranyong.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5% for 5s upon being hit 10 times",
	},
	{
		id: 58,
		name: "Mollumander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSoranyongMutation01.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Physical DMG +5.25% for 5s upon being hit 10 times",
	},
	{
		id: 59,
		name: "Swellymander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSoranyongKing.png",
		element: "Normal ",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Basic Attack DMG +5% for 5s upon being hit 10 times",
	},
	{
		id: 60,
		name: "Harvester",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageSoldier.png",
		element: "Dark",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +5% for 5s upon being hit (Cooldown: 20s)",
	},
	{
		id: 61,
		name: "Enforcer",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageSoldierSpear.png",
		element: "Dark",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DEF +3.75% for 5s upon being hit (Cooldown: 20s)",
	},
	{
		id: 62,
		name: "Void Friar",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageMonk.png",
		element: "Dark",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Elemental Weakness DMG +5% for 5s upon being hit (Cooldown: 20s)",
	},
	{
		id: 63,
		name: "Monk's Shadow",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageMonkWhite.png",
		element: "Dark",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Elemental Weakness DMG +5.25% for 5s upon being hit (Cooldown: 20s)",
	},
	{
		id: 64,
		name: "Vectus",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightagePriest.png",
		element: "Dark",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "ATK +2.75% for 10s upon being hit (Cooldown: 20s)",
	},
	{
		id: 65,
		name: "Mountaintaur",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMinotaMountain.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Crit DMG +6% against Staggered boss enemies",
	},
	{
		id: 66,
		name: "Tealtaur",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMinotaForestWind.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Fire DMG +6.3% against Staggered boss enemies",
	},
	{
		id: 67,
		name: "Amon",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAmon.png",
		element: "Dark",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"All teammates' Crit Rate +6% for 10s upon attacking a boss enemy 10 times",
	},
	{
		id: 68,
		name: "Amon's Shadow",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAmonWhite.png",
		element: "Dark",
		region_id: REGION_ID_BY_REGION.VARHINE,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"All teammates' Crit Rate +6.3% for 10s upon using Evasion Counter",
	},
	{
		id: 69,
		name: "Gorrik",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinEnforcer.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Recovers 1.65% of Max HP upon landing 10 Basic Attacks",
	},
	{
		id: 70,
		name: "Ice Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeIce.png",
		element: "Ice",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Elemental Weakness DMG +5% against Ice enemies",
	},
	{
		id: 71,
		name: "Slimeboo",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeIceGreen.png",
		element: "Ice",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit DMG +5.25% against Physical enemies",
	},
	{
		id: 72,
		name: "Fire Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeFire.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Elemental Weakness DMG +5% against Fire enemies",
	},
	{
		id: 73,
		name: "Queen Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeQueen.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Physical DMG +5.5% for 5s upon attacking Physical enemy",
	},
	{
		id: 74,
		name: "Empress Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeQueenRed.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "ATK +2.89% for 10s upon attacking Physical enemy (Cooldown: 20s)",
	},
	{
		id: 75,
		name: "Spaider",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpiderGrassland.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DEF +3.75% for 5s upon defeating 10 enemies",
	},
	{
		id: 76,
		name: "Sparder",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpiderForest.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DMG +5% against normal enemies for 5s upon defeating 10 enemies",
	},
	{
		id: 77,
		name: "Spardig",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpiderHat.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"DMG +5.25% against normal enemies for 5s upon defeating 10 enemies",
	},
	{
		id: 78,
		name: "Spooder",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpiderMountain.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +5% for 5s upon defeating 10 enemies",
	},
	{
		id: 79,
		name: "Spadupa",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpadupa.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Earth DMG +5.5% for 10s upon defeating 10 enemies",
	},
	{
		id: 80,
		name: "Greenpadupa",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpaDupaGreen.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "ATK +2.89% for 10s upon defeating 10 enemies",
	},
	{
		id: 81,
		name: "Gargoyle",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGargoyle.png",
		element: "Ice",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Target's DEF -3.75% for 5s upon using Air Counter.",
	},
	{
		id: 82,
		name: "Grassgoyle",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGargoyleGrassland.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Air Counter Physical DMG +5%",
	},
	{
		id: 83,
		name: "Soilgoyle",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGargoyleMountain.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Air Counter Physical DMG +5.25%",
	},
	{
		id: 84,
		name: "Sylphid",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphi_Mountain.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Earth DMG +5% against Airborne targets",
	},
	{
		id: 85,
		name: "Vamphid",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphiBlack.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Earth DMG +5.25% against Airborne targets",
	},
	{
		id: 86,
		name: "Stickphid",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphiSpear.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +5% against Airborne targets",
	},
	{
		id: 87,
		name: "Healphid",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphi_Grassland.png",
		element: "Ice",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ice DMG +5% against Airborne targets",
	},
	{
		id: 88,
		name: "Head Stickphid",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphiSpearCaptin.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +5% against Airborne targets",
	},
	{
		id: 89,
		name: "Full Moon Vamphid",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphiSpearCaptinBlack.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit Rate +5.25% against Airborne targets",
	},
	{
		id: 90,
		name: "Ice Fist Dude",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingStoneguyCrystal.png",
		element: "Ice",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Elemental Weakness Attack Crit Rate +6%",
	},
	{
		id: 91,
		name: "Plains Minotaur",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMinotaGrassland.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Wind DMG +6% against Staggered boss enemies",
	},
	{
		id: 92,
		name: "Spoonmugger",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpoonmugger.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Target's Lightning RES -6% for 5s upon attacking with Elemental Weakness",
	},
	{
		id: 93,
		name: "Stickmugger",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpoonmuggerQueen.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Lightning DMG +6.3% for 10s upon attacking with Elemental Weakness",
	},
	{
		id: 94,
		name: "Avardan",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAvadanBlack.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"All teammates' Ultimate Skill DMG +6% for 10s upon being hit by a boss enemy",
	},
	{
		id: 95,
		name: "Avardan's Mana",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAvadan.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Restores 1.89% HP for all teammates upon attacking a Staggered boss enemy",
	},
	{
		id: 96,
		name: "Lil' Hauntstack",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeSmall.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Switch Skill Crit DMG +5%",
	},
	{
		id: 97,
		name: "Sacred Hauntstack",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeSky.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Switch Skill Crit DMG +5.25%",
	},
	{
		id: 98,
		name: "Hauntstack",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsae.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Switch Skill Crit Rate +5",
	},
	{
		id: 99,
		name: "Brush Hauntstack",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeGreen.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Ice DMG +5.25% against Staggered boss enemies",
	},
	{
		id: 100,
		name: "Bop-kkaebi",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKkebi.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ultimate Skill Crit DMG 5%",
	},
	{
		id: 101,
		name: "Pew-kkaebi",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKkebiGreen.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ultimate Skill Fire DMG +5%",
	},
	{
		id: 102,
		name: "Kkaebi Herder",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinShieldKkebi.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"DMG +5% against normal enemies for 5s upon using an Ultimate Skill",
	},
	{
		id: 103,
		name: "Odong Seed",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOdongseed.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Crit Rate +5% (Cooldown: 20s)",
	},
	{
		id: 104,
		name: "Odong",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKimodong.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Switch Skill ATK +3%",
	},
	{
		id: 105,
		name: "Maple Odong",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKimodongMaple.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Switch Skill ATK +3.15%",
	},
	{
		id: 106,
		name: "Tree Youkai",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTreeBackah.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Switch Skill Fire DMG +5%",
	},
	{
		id: 107,
		name: "Stumpster",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTreeBackahAxe.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Switch Skill Fire DMG +5%",
	},
	{
		id: 108,
		name: "Bunnie",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRabbitPojol.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5% for 5s upon using Evasion Counter",
	},
	{
		id: 109,
		name: "Masked Bunnie",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRabbitKkebiGreen.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Physical DMG +5.25% for 5s upon using Evasion Counter",
	},
	{
		id: 110,
		name: "Raccoonie",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRaccoonPojol.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Target's Physical RES -5% for 5s upon using Evasion Counter",
	},
	{
		id: 111,
		name: "Masked Raccoonie",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRaccoonMask.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Target's Physical RES -5.25% for 5s upon using Evasion Counter",
	},
	{
		id: 112,
		name: "Battle Spirit",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniMiddle.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Fire DMG +5% against boss enemies",
	},
	{
		id: 113,
		name: "White Wraith",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniMiddleWhite.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Fire DMG +5.25% against boss enemies",
	},
	{
		id: 114,
		name: "Shademask",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniMiddleBoss.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Target's ATK -2.75% for 10s upon attacking a boss enemy (Cooldown: 20s)",
	},
	{
		id: 115,
		name: "Ashen Mask",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniMiddleBossWhite.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Target's ATK -2.75% for 10s upon attacking a boss enemy (Cooldown: 20s)",
	},
	{
		id: 116,
		name: "Turtlie",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtlePojol.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon being hit by a boss enemy",
	},
	{
		id: 117,
		name: "Silvershell",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtleSilver.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon being hit by a boss enemy",
	},
	{
		id: 118,
		name: "Swamp Odong",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKimodongSwamp.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Target's Earth RES -5.5% for 10s upon using a Switch Skill",
	},
	{
		id: 119,
		name: "Duoxini",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxini.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"Target's Fire RES -6% for 10s upon attacking with a Fire Special Skill",
	},
	{
		id: 120,
		name: "Fiend",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniRed.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Fire DMG +6.3% upon attacking with a Fire Special Skill",
	},
	{
		id: 121,
		name: "Black Hauntstack",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeBlack.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Ice DMG +5.5% against Staggered boss enemies",
	},
	{
		id: 122,
		name: "Ronin Bunnie",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRabbitBackah.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Wind DMG +5% for 5s upon using Evasion Counter",
	},
	{
		id: 123,
		name: "Bleacher Bunnie",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRabbitBackahWhite.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Wind DMG +5.3% for 5s upon using Evasion Counter",
	},
	{
		id: 124,
		name: "Ronin Raccoonie",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRaccoonBackah.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DMG +5% against boss enemies for 5s upon using Evasion Counter",
	},
	{
		id: 125,
		name: "Bleacher Raccoonie",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRaccoonBackahWhite.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "DMG +5.3% against boss enemies for 5s upon using Evasion Counter",
	},
	{
		id: 126,
		name: "Ronin Turtlie",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtleBackah.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5% for 5s upon being hit by a boss enemy",
	},
	{
		id: 127,
		name: "Hop-alee",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguri.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Air Counter Crit Rate +5%",
	},
	{
		id: 128,
		name: "Salt-alee",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriBlue.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Air Counter Crit Rate +5.3%",
	},
	{
		id: 129,
		name: "Brute-alee",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriRed.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Air Counter Crit DMG +5%",
	},
	{
		id: 130,
		name: "Borborg",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriShieldBoss.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DEF +4.1% for 5s upon attacking a boss enemy 10 times",
	},
	{
		id: 131,
		name: "Goald",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriShieldBossGold.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "DEF +4.3% for 5s upon attacking a boss enemy 10 times",
	},
	{
		id: 132,
		name: "Cacabagge",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNachuchu.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Earth DMG +5% against normal enemies",
	},
	{
		id: 133,
		name: "Kimkimchi",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNachuchuKimchi.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Earth DMG +5.3% against normal enemies",
	},
	{
		id: 134,
		name: "Cocorn",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNasusu.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +5% against normal enemies (Cooldown: 20s)",
	},
	{
		id: 135,
		name: "Rococorn",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNasusuButter.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit DMG +5.3% against normal enemies (Cooldown: 20s)",
	},
	{
		id: 136,
		name: "Twisted Spineflower",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingFlowerBackah.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Lightning DMG +5% upon attacking Lightning enemy 10 times",
	},
	{
		id: 137,
		name: "Twisted Bloodflower",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingFlowerBackahMiddle.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Target's Lightning RES -5% for 5s upon attacking Lightning enemy 5 times (Cooldown: 20s)",
	},
	{
		id: 138,
		name: "Bruised Bloodflower",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingFlowerBackahMiddleBlue.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Target's Lightning RES -5.3% for 5s upon attacking Lightning enemy 5 times",
	},
	{
		id: 139,
		name: "Manwol",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingManwollok.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +6% for 5s upon using Evasion Counter",
	},
	{
		id: 140,
		name: "Nokjung",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingManwollokBlack.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit Rate +6.3% for 5s upon using Evasion Counter",
	},
	{
		id: 141,
		name: "Onsae",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHakaBackah.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"Crit DMG +6% for 5s upon landing a critical hit with an Ultimate Skill",
	},
	{
		id: 142,
		name: "Cinder",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHakaBackahBlack.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Crit DMG +6.3% for 5s upon landing a critical hit with Ultimate Skill",
	},
	{
		id: 143,
		name: "Hahnul",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHanul.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"All teammates' Switch Skill DMG +6% for 10s upon landing a critical hit on a boss enemy",
	},
	{
		id: 144,
		name: "Gulgak",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHanulWhite.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Target's DEF -4.7% for 5s upon landing a critical hit on a boss enemy.",
	},
	{
		id: 145,
		name: "Baby Spirit",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChildGhost.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"DMG +5% against normal enemies for 5s upon attacking Wind enemy 10 times",
	},
	{
		id: 146,
		name: "Chipmunk Spirit",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChildGhostSquirrel.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"DMG +5% against normal enemies for 5s upon attacking Wind enemy 10 times",
	},
	{
		id: 147,
		name: "Wind Spirit",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGhostWind.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "ATK +2.5% upon attacking Wind enemy 10 times",
	},
	{
		id: 148,
		name: "Grudge Spirit",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGhostWindMiddle.png",
		element: "Dark",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon using a Switch Skill",
	},
	{
		id: 149,
		name: "Grudge Revenant",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGhostWindMiddleRed.png",
		element: "Dark",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon using a Switch Skill",
	},
	{
		id: 150,
		name: "Phantom Snow Tiger",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSnowyBeast.png",
		element: "Ice",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Suppression DMG +5.5% for 5s upon using a Switch Skill",
	},
	{
		id: 151,
		name: "Phantom Stone Tiger",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSnowyBeastBlack.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Suppression DMG +5.5% for 5s upon using a Switch Skill",
	},
	{
		id: 152,
		name: "Lizarcher",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanLizardBow.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DEF +3.75% for 5s upon attacking Fire enemy 10 times",
	},
	{
		id: 153,
		name: "Sun Lizarcher",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanLizardBowRed.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "DEF +3.75% for 5s upon attacking Fire enemy 10 times",
	},
	{
		id: 154,
		name: "Lizcout",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanLizard.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Earth ATK +5% for 10s upon being hit (Cooldown: 20s)",
	},
	{
		id: 155,
		name: "Master Lizcout",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanLizardHat.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Earth ATK +5% for 10s upon being hit (Cooldown: 20s)",
	},
	{
		id: 156,
		name: "Kroko",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanCrocodile.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DEF +3.75% for 5s upon attacking normal enemy 10 times",
	},
	{
		id: 157,
		name: "Krokomander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanCrocodileDora.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "DEF +3.75% for 5s upon attacking normal enemy 10 times",
	},
	{
		id: 158,
		name: "Bunnie Swordsman",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKnightRabbit_Evil.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Target's Wind RES -5% for 5s upon using Evasion Counter",
	},
	{
		id: 159,
		name: "Toad-alee",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriShield.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "All teammates' DEF +4.13% for 5s upon being hit by a boss enemy ",
	},
	{
		id: 160,
		name: "Irontoise",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtle.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"All teammates' DEF +4.13% for 10s upon landing a critical hit on a boss enemy",
	},
	{
		id: 161,
		name: "Treetoise",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtleBrown.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"All teammates' DEF +4.13% for 10s upon landing a critical hit on a boss enemy",
	},
	{
		id: 162,
		name: "Sunek",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNagiMiddle.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DEF +3.75% for 5s upon attacking Wind enemy 10 times",
	},
	{
		id: 163,
		name: "Suhwa",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNagiMiddlePink.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "DEF +3.75% for 5s upon attacking Wind enemy 10 times",
	},
	{
		id: 164,
		name: "Red Shadow",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWetlandMaster.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability: "Crit DMG +6% for 4s upon using a Ice Special Skill",
	},
	{
		id: 165,
		name: "Blue Shadow",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWetlandMasterBlue.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.MUWON,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Ice DMG +6% upon attacking with a Ice Special Skill",
	},
];
