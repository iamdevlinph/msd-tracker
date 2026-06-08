import {
	REGION_ELENDOR,
	REGION_MUWON,
	REGION_NAMRYUNG,
	REGION_SERENIA,
	REGION_SURAH,
	REGION_VARHINE,
} from "@/components/monster-codex/data/REGIONS_DATA";
import type { MonsterCodexEntry } from "@/components/monster-codex/store/monster-codex-constants";

export const MONSTERLINGS_DATA: MonsterCodexEntry[] = [
	{
		id: 1,
		name: "Cappy",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopy.png",
		element: "Earth",
		region_id: REGION_ELENDOR,
		ability: "Special Skill Crit Rate +5% (Cooldown: 20s)",
	},
	{
		id: 2,
		name: "Cappyberry",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyPurple.png",
		element: "Earth",
		region_id: REGION_ELENDOR,
		ability: "Special Skill Crit Rate + 5.25% (Cooldown: 20s)",
	},
	{
		id: 3,
		name: "Cappy Mama",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyKing.png",
		element: "Earth ",
		region_id: REGION_ELENDOR,
		ability:
			"Recovers 1.65% of Max HP upon landing a Special Skill (Cooldown: 15s)",
	},
	{
		id: 4,
		name: "Leafy Mama",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyKingSlimeling.png",
		element: "Earth ",
		region_id: REGION_ELENDOR,
		ability:
			"Recovers 1.74% of Max HP upon using a Special Skill (Cooldown: 15s)",
	},
	{
		id: 5,
		name: "Slimelet",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlime.png",
		element: "Water",
		region_id: REGION_ELENDOR,
		ability: "Crit DMG +5% against Physical enemies",
	},
	{
		id: 6,
		name: "Inklet",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeBlack.png",
		element: "Water",
		region_id: REGION_ELENDOR,
		ability: "Crit DMG +5.25% against Physical enemies",
	},
	{
		id: 7,
		name: "Goblin Recruit",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblin.png",
		element: "Normal ",
		region_id: REGION_ELENDOR,
		ability:
			"Crit DMG +5% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	{
		id: 8,
		name: "2nd Lt. Goblin",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinPink.png",
		element: "Normal",
		region_id: REGION_ELENDOR,
		ability:
			"Crit DMG +5.25% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	{
		id: 9,
		name: "Pvt. Goblin",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinBow.png",
		element: "Normal",
		region_id: REGION_ELENDOR,
		ability:
			"Physical DMG +5% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	{
		id: 10,
		name: "Cpl. Goblin",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinshield.png",
		element: "Normal ",
		region_id: REGION_ELENDOR,
		ability:
			"Suppression DMG +5% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	{
		id: 11,
		name: "White Wolf Warrior",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolf.png",
		element: "Normal",
		region_id: REGION_ELENDOR,
		ability: "Brawl DMG +5% for 5s upon landing a critical hit (Cooldown: 20s)",
	},
	{
		id: 12,
		name: "Black Wolf",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWhiteWolf_HostileBlack.png",
		element: "Normal",
		region_id: REGION_ELENDOR,
		ability:
			"Brawl DMG +5.25% for 5s upon landing a critical hit (Cooldown: 20s)",
	},
	{
		id: 13,
		name: "Frostjaw",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolfMagic.png",
		element: "Ice",
		region_id: REGION_ELENDOR,
		ability: "Critical Ice DMG +5%",
	},
	{
		id: 14,
		name: "Crimsonjaw",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolfMagicianRed.png",
		element: "Ice",
		region_id: REGION_ELENDOR,
		ability: "Critical Ice DMG +5.25%",
	},
	{
		id: 15,
		name: "Forkmugger",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpoonmuggerFork.png",
		element: "Normal",
		region_id: REGION_ELENDOR,
		ability:
			"Target's Physical RES -6% for 5s upon attacking with target's Elemental Weakness",
	},
	{
		id: 16,
		name: "King Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeKing.png",
		element: "Water",
		region_id: REGION_ELENDOR,
		ability:
			"All teammates' DEF +4.5% for 5s upon attacking Water enemy (Cooldown: 10s)",
	},
	{
		id: 17,
		name: "Scarlet Queen",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeRed.png",
		element: "Water",
		region_id: REGION_ELENDOR,
		ability: "ATK +3.15% for 10s upon attacking Water enemy (Cooldown: 20s)",
	},
	{
		id: 18,
		name: "Taglock",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinChief.png",
		element: "Normal",
		region_id: REGION_ELENDOR,
		ability:
			"ATK +3% for 10s upon making 20 successful attacks (Cooldown: 20s)",
	},
	{
		id: 19,
		name: "Big Bro Goblin",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinChiefWhite.png",
		element: "Normal",
		region_id: REGION_ELENDOR,
		ability:
			"Restores 1.89% HP for all teammates upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	{
		id: 20,
		name: "Lupe",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHaka.png",
		element: "Ice",
		region_id: REGION_ELENDOR,
		ability:
			"Neutralization DMG +6% for 10s upon landing a critical hit (Cooldown: 20s)",
	},
	{
		id: 21,
		name: "Moon Shadow Lupe",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHakaPurple.png",
		element: "Ice",
		region_id: REGION_ELENDOR,
		ability: "Target's Ice RES -6.3% for 10s upon landing a critical hit",
	},
	{
		id: 22,
		name: "Ring Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeLing.png",
		element: "Water",
		region_id: REGION_ELENDOR,
		ability: "ATK +2.75% against Physical enemies",
	},
	{
		id: 23,
		name: "Uncle Cappy",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyThrowUncle.png",
		element: "Fire",
		region_id: REGION_ELENDOR,
		ability: "Special Skill Fire DMG +5.5% (Cooldown: 15s)",
	},
	{
		id: 24,
		name: "Green Cappy Bro",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopaThrowUncle1.png",
		element: "Fire",
		region_id: REGION_ELENDOR,
		ability: "Special Skill Fire DMG +5.78% (Cooldown: 15s)",
	},
	{
		id: 25,
		name: "Digger Mole",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDugi.png",
		element: "Earth",
		region_id: REGION_ELENDOR,
		ability: "Crit Rate +5% against knocked-down targets",
	},
	{
		id: 26,
		name: "Gold Digger Mole",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDugiGold.png",
		element: "Earth",
		region_id: REGION_ELENDOR,
		ability: "Crit Rate +5.25% against knocked-down targets",
	},
	{
		id: 27,
		name: "Tunneler Mole",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDugi_SlingShot.png",
		element: "Earth",
		region_id: REGION_ELENDOR,
		ability: "Earth DMG +5% against knocked-down targets",
	},
	{
		id: 28,
		name: "Brown Cappy",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyThrow.png",
		element: "Earth",
		region_id: REGION_ELENDOR,
		ability: "Special Skill Crit DMG +5% (Cooldown: 20s)",
	},
	{
		id: 29,
		name: "Teal Cappy",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyThrowBlue.png",
		element: "Earth",
		region_id: REGION_ELENDOR,
		ability: "Special Skill Crit DMG + 5.25% (Cooldown: 20s)",
	},
	{
		id: 30,
		name: "Green Cappy",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyPoison.png",
		element: "Earth ",
		region_id: REGION_ELENDOR,
		ability: "Special Skill Neutralization DMG +5% (Cooldown: 15s)",
	},
	{
		id: 31,
		name: "Orange Cappy",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyPoisonOrange.png",
		element: "Earth ",
		region_id: REGION_ELENDOR,
		ability: "Special Skill Neutralization DMG +5.25% (Cooldown: 15s)",
	},
	{
		id: 32,
		name: "Spark Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeThunder.png",
		element: "Lightning ",
		region_id: REGION_ELENDOR,
		ability: "Crit Rate +5% against Lightning enemies",
	},
	{
		id: 33,
		name: "Golden Spark Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeThunderYellow.png",
		element: "Lightning ",
		region_id: REGION_ELENDOR,
		ability: "Crit Rate +5.25% against Lightning enemies",
	},
	{
		id: 34,
		name: "White Wolf Fulminator",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolf_MagicianLightning.png",
		element: "Lightning ",
		region_id: REGION_ELENDOR,
		ability: "Critical Lightning DMG +5.5%",
	},
	{
		id: 35,
		name: "Moley Mole",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMolly.png",
		element: "Earth ",
		region_id: REGION_ELENDOR,
		ability: "Suppression DMG +5.5% against knocked-down targets",
	},
	{
		id: 36,
		name: "Gold Digger Moley Mole",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMoleyGold.png",
		element: "Earth ",
		region_id: REGION_ELENDOR,
		ability: "Suppression DMG +5.78% against knocked-down targets",
	},
	{
		id: 37,
		name: "Green Cappy Papa",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopaDaddy.png",
		element: "Earth ",
		region_id: REGION_ELENDOR,
		ability: "Special Skill ATK +2.75% (Cooldown: 15s)",
	},
	{
		id: 38,
		name: "Custos",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGolemBlack.png",
		element: "Earth",
		region_id: REGION_ELENDOR,
		ability:
			"Target's DEF -4.5% for 5s upon landing a critical hit with an Earth Attack",
	},
	{
		id: 39,
		name: "El Dorado Guardian",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGolemGold.png",
		element: "Earth ",
		region_id: REGION_ELENDOR,
		ability:
			"All teammates ATK +3.15% for 10s upon attacking a boss enemy with its Elemental Weakness (Cooldown: 20s)",
	},
	{
		id: 40,
		name: "Rock Fist Dude",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingStoneguy.png",
		element: "Earth",
		region_id: REGION_VARHINE,
		ability: "Attacks' Earth DMG +6% upon attacking with Elemental Weakness",
	},
	{
		id: 41,
		name: "Golden Fist Dude",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingStoneGuyGold.png",
		element: "Earth",
		region_id: REGION_VARHINE,
		ability:
			"Attack Neutralization DMG +6.3% upon attacking with Elemental Weakness",
	},
	{
		id: 42,
		name: "Orc Warrior",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOrc.png",
		element: "Normal ",
		region_id: REGION_VARHINE,
		ability: "Physical DMG +5% against normal enemies (Cooldown: 20s)",
	},
	{
		id: 43,
		name: "Pink Orc Dude",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOrcAxePink.png",
		element: "Normal",
		region_id: REGION_VARHINE,
		ability: "Physical DMG +5.25% against normal enemies (Cooldown: 20s)",
	},
	{
		id: 44,
		name: "Orc Raider",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOrcAxe.png",
		element: "Normal",
		region_id: REGION_VARHINE,
		ability: "Crit Rate +5% against normal enemies (Cooldown: 20s)",
	},
	{
		id: 45,
		name: "Rockymander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyong.png",
		element: "Normal ",
		region_id: REGION_VARHINE,
		ability: "Crit DMG +5% for 5s upon being hit 10 times",
	},
	{
		id: 46,
		name: "Leafymander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyongMutation01.png",
		element: "Normal",
		region_id: REGION_VARHINE,
		ability: "Crit DMG +5.25% for 5s upon being hit 10 times",
	},
	{
		id: 47,
		name: "Bouldermander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyong.png",
		element: "Normal ",
		region_id: REGION_VARHINE,
		ability: "Special Skill DMG +5% for 5s upon being hit 10 times",
	},
	{
		id: 48,
		name: "Vikkymander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDoranyongKingHat.png",
		element: "Normal ",
		region_id: REGION_VARHINE,
		ability: "Special Skill DMG +5.25% for 5s upon being hit 10 times",
	},
	{
		id: 49,
		name: "Troll",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTroll.png",
		element: "Normal ",
		region_id: REGION_VARHINE,
		ability: "Ultimate Skill Neutralization DMG +5%",
	},
	{
		id: 50,
		name: "Noxtroll",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTrollBlue.png",
		element: "Normal ",
		region_id: REGION_VARHINE,
		ability: "Ultimate Skill Neutralization DMG + 5.25%",
	},
	{
		id: 51,
		name: "Urgash",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTrollKing.png",
		element: "Normal",
		region_id: REGION_VARHINE,
		ability: "Ultimate Skill Elemental Weakness DMG +5.5%",
	},
	{
		id: 52,
		name: "Wolf",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolf.png",
		element: "Normal ",
		region_id: REGION_VARHINE,
		ability: "Physical DMG +5% for 5s upon landing a critical hit",
	},
	{
		id: 53,
		name: "Albino Wolf",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfWhite.png",
		element: "Normal ",
		region_id: REGION_VARHINE,
		ability: "Physical DMG +5.25% for 5s upon landing a critical hit",
	},
	{
		id: 54,
		name: "Behemo-Wolf",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfHuge.png",
		element: "Normal ",
		region_id: REGION_VARHINE,
		ability: "Suppression DMG +5.5% for 10s upon landing a critical hit",
	},
	{
		id: 55,
		name: "Scar",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfHugeScar.png",
		element: "Dark",
		region_id: REGION_VARHINE,
		ability:
			"DMG +5.5% against boss enemies for 5s upon landing a critical hit",
	},
	{
		id: 56,
		name: "Frostbite",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWolfHugeScarWhite.png",
		element: "Dark",
		region_id: REGION_VARHINE,
		ability: "Special Skill DMG +5.78% for 10s upon landing a critical hit",
	},
	{
		id: 57,
		name: "Shellymander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSoranyong.png",
		element: "Normal",
		region_id: REGION_VARHINE,
		ability: "Physical DMG +5% for 5s upon being hit 10 times",
	},
	{
		id: 58,
		name: "Mollumander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSoranyongMutation01.png",
		element: "Normal ",
		region_id: REGION_VARHINE,
		ability: "Physical DMG +5.25% for 5s upon being hit 10 times",
	},
	{
		id: 59,
		name: "Swellymander",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSoranyongKing.png",
		element: "Normal ",
		region_id: REGION_VARHINE,
		ability: "Basic Attack DMG +5% for 5s upon being hit 10 times",
	},
	{
		id: 60,
		name: "Harvester",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageSoldier.png",
		element: "Dark",
		region_id: REGION_VARHINE,
		ability: "Crit Rate +5% for 5s upon being hit (Cooldown: 20s)",
	},
	{
		id: 61,
		name: "Enforcer",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageSoldierSpear.png",
		element: "Dark",
		region_id: REGION_VARHINE,
		ability: "DEF +3.75% for 5s upon being hit (Cooldown: 20s)",
	},
	{
		id: 62,
		name: "Void Friar",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageMonk.png",
		element: "Dark",
		region_id: REGION_VARHINE,
		ability: "Elemental Weakness DMG +5% for 5s upon being hit (Cooldown: 20s)",
	},
	{
		id: 63,
		name: "Monk's Shadow",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightageMonkWhite.png",
		element: "Dark",
		region_id: REGION_VARHINE,
		ability:
			"Elemental Weakness DMG +5.25% for 5s upon being hit (Cooldown: 20s)",
	},
	{
		id: 64,
		name: "Vectus",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingBlackKnightagePriest.png",
		element: "Dark",
		region_id: REGION_VARHINE,
		ability: "ATK +2.75% for 10s upon being hit (Cooldown: 20s)",
	},
	{
		id: 65,
		name: "Mountaintaur",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMinotaMountain.png",
		element: "Fire",
		region_id: REGION_VARHINE,
		ability: "Crit DMG +6% against Staggered boss enemies",
	},
	{
		id: 66,
		name: "Tealtaur",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMinotaForestWind.png",
		element: "Fire",
		region_id: REGION_VARHINE,
		ability: "Fire DMG +6.3% against Staggered boss enemies",
	},
	{
		id: 67,
		name: "Amon",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAmon.png",
		element: "Dark",
		region_id: REGION_VARHINE,
		ability:
			"All teammates' Crit Rate +6% for 10s upon attacking a boss enemy 10 times",
	},
	{
		id: 68,
		name: "Amon's Shadow",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAmonWhite.png",
		element: "Dark",
		region_id: REGION_VARHINE,
		ability:
			"All teammates' Crit Rate +6.3% for 10s upon using Evasion Counter",
	},
	{
		id: 69,
		name: "Gorrik",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinEnforcer.png",
		element: "Normal",
		region_id: REGION_SERENIA,
		ability: "Recovers 1.65% of Max HP upon landing 10 Basic Attacks",
	},
	{
		id: 70,
		name: "Ice Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeIce.png",
		element: "Ice",
		region_id: REGION_SERENIA,
		ability: "Elemental Weakness DMG +5% against Ice enemies",
	},
	{
		id: 71,
		name: "Slimeboo",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeIceGreen.png",
		element: "Ice",
		region_id: REGION_SERENIA,
		ability: "Crit DMG +5.25% against Physical enemies",
	},
	{
		id: 72,
		name: "Fire Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeFire.png",
		element: "Fire",
		region_id: REGION_SERENIA,
		ability: "Elemental Weakness DMG +5% against Fire enemies",
	},
	{
		id: 73,
		name: "Queen Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeQueen.png",
		element: "Normal",
		region_id: REGION_SERENIA,
		ability: "Physical DMG +5.5% for 5s upon attacking Physical enemy",
	},
	{
		id: 74,
		name: "Empress Slime",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeQueenRed.png",
		element: "Normal",
		region_id: REGION_SERENIA,
		ability: "ATK +2.89% for 10s upon attacking Physical enemy (Cooldown: 20s)",
	},
	{
		id: 75,
		name: "Spaider",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpiderGrassland.png",
		element: "Normal",
		region_id: REGION_SERENIA,
		ability: "DEF +3.75% for 5s upon defeating 10 enemies",
	},
	{
		id: 76,
		name: "Sparder",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpiderForest.png",
		element: "Earth",
		region_id: REGION_SERENIA,
		ability: "DMG +5% against normal enemies for 5s upon defeating 10 enemies",
	},
	{
		id: 77,
		name: "Spardig",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpiderHat.png",
		element: "Earth",
		region_id: REGION_SERENIA,
		ability:
			"DMG +5.25% against normal enemies for 5s upon defeating 10 enemies",
	},
	{
		id: 78,
		name: "Spooder",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpiderMountain.png",
		element: "Normal",
		region_id: REGION_SERENIA,
		ability: "Crit DMG +5% for 5s upon defeating 10 enemies",
	},
	{
		id: 79,
		name: "Spadupa",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpadupa.png",
		element: "Earth",
		region_id: REGION_SERENIA,
		ability: "Earth DMG +5.5% for 10s upon defeating 10 enemies",
	},
	{
		id: 80,
		name: "Greenpadupa",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpaDupaGreen.png",
		element: "Earth",
		region_id: REGION_SERENIA,
		ability: "ATK +2.89% for 10s upon defeating 10 enemies",
	},
	{
		id: 81,
		name: "Gargoyle",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGargoyle.png",
		element: "Ice",
		region_id: REGION_SERENIA,
		ability: "Target's DEF -3.75% for 5s upon using Air Counter.",
	},
	{
		id: 82,
		name: "Grassgoyle",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGargoyleGrassland.png",
		element: "Normal",
		region_id: REGION_SERENIA,
		ability: "Air Counter Physical DMG +5%",
	},
	{
		id: 83,
		name: "Soilgoyle",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGargoyleMountain.png",
		element: "Normal",
		region_id: REGION_SERENIA,
		ability: "Air Counter Physical DMG +5.25%",
	},
	{
		id: 84,
		name: "Sylphid",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphi_Mountain.png",
		element: "Earth",
		region_id: REGION_SERENIA,
		ability: "Earth DMG +5% against Airborne targets",
	},
	{
		id: 85,
		name: "Vamphid",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphiBlack.png",
		element: "Earth",
		region_id: REGION_SERENIA,
		ability: "Earth DMG +5.25% against Airborne targets",
	},
	{
		id: 86,
		name: "Stickphid",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphiSpear.png",
		element: "Earth",
		region_id: REGION_SERENIA,
		ability: "Crit DMG +5% against Airborne targets",
	},
	{
		id: 87,
		name: "Healphid",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphi_Grassland.png",
		element: "Ice",
		region_id: REGION_SERENIA,
		ability: "Ice DMG +5% against Airborne targets",
	},
	{
		id: 88,
		name: "Head Stickphid",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphiSpearCaptin.png",
		element: "Earth",
		region_id: REGION_SERENIA,
		ability: "Crit Rate +5% against Airborne targets",
	},
	{
		id: 89,
		name: "Full Moon Vamphid",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphiSpearCaptinBlack.png",
		element: "Earth",
		region_id: REGION_SERENIA,
		ability: "Crit Rate +5.25% against Airborne targets",
	},
	{
		id: 90,
		name: "Ice Fist Dude",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingStoneguyCrystal.png",
		element: "Ice",
		region_id: REGION_SERENIA,
		ability: "Elemental Weakness Attack Crit Rate +6%",
	},
	{
		id: 91,
		name: "Plains Minotaur",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMinotaGrassland.png",
		element: "Wind",
		region_id: REGION_SERENIA,
		ability: "Wind DMG +6% against Staggered boss enemies",
	},
	{
		id: 92,
		name: "Spoonmugger",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpoonmugger.png",
		element: "Lightning ",
		region_id: REGION_SERENIA,
		ability:
			"Target's Lightning RES -6% for 5s upon attacking with Elemental Weakness",
	},
	{
		id: 93,
		name: "Stickmugger",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpoonmuggerQueen.png",
		element: "Lightning ",
		region_id: REGION_SERENIA,
		ability:
			"Lightning DMG +6.3% for 10s upon attacking with Elemental Weakness",
	},
	{
		id: 94,
		name: "Avardan",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAvadanBlack.png",
		element: "Earth",
		region_id: REGION_SERENIA,
		ability:
			"All teammates' Ultimate Skill DMG +6% for 10s upon being hit by a boss enemy",
	},
	{
		id: 95,
		name: "Avardan's Mana",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAvadan.png",
		element: "Earth",
		region_id: REGION_SERENIA,
		ability:
			"Restores 1.89% HP for all teammates upon attacking a Staggered boss enemy",
	},
	{
		id: 96,
		name: "Lil' Hauntstack",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeSmall.png",
		element: "Water",
		region_id: REGION_SURAH,
		ability: "Switch Skill Crit DMG +5%",
	},
	{
		id: 97,
		name: "Sacred Hauntstack",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeSky.png",
		element: "Water",
		region_id: REGION_SURAH,
		ability: "Switch Skill Crit DMG +5.25%",
	},
	{
		id: 98,
		name: "Hauntstack",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsae.png",
		element: "Water",
		region_id: REGION_SURAH,
		ability: "Switch Skill Crit Rate +5",
	},
	{
		id: 99,
		name: "Brush Hauntstack",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeGreen.png",
		element: "Water",
		region_id: REGION_SURAH,
		ability: "Ice DMG +5.25% against Staggered boss enemies",
	},
	{
		id: 100,
		name: "Bop-kkaebi",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKkebi.png",
		element: "Fire",
		region_id: REGION_SURAH,
		ability: "Ultimate Skill Crit DMG 5%",
	},
	{
		id: 101,
		name: "Pew-kkaebi",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKkebiGreen.png",
		element: "Fire",
		region_id: REGION_SURAH,
		ability: "Ultimate Skill Fire DMG +5%",
	},
	{
		id: 102,
		name: "Kkaebi Herder",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinShieldKkebi.png",
		element: "Normal",
		region_id: REGION_SURAH,
		ability:
			"DMG +5% against normal enemies for 5s upon using an Ultimate Skill",
	},
	{
		id: 103,
		name: "Odong Seed",
		image:
			"https://img.game8.co/4470876/1cf20978101defa5ce2c670e53c5ea53.png/show",
		element: "Earth",
		region_id: REGION_SURAH,
		ability: "Special Skill Crit Rate +5% (Cooldown: 20s)",
	},
	{
		id: 104,
		name: "Odong",
		image:
			"https://img.game8.co/4470871/8b07e3331cf1c21507b5be40f287e090.png/show",
		element: "Earth",
		region_id: REGION_SURAH,
		ability: "Switch Skill ATK +3%",
	},
	{
		id: 105,
		name: "Maple Odong",
		image:
			"https://img.game8.co/4470878/aa8e44c628ba520266366c5f741d3922.png/show",
		element: "Earth",
		region_id: REGION_SURAH,
		ability: "Switch Skill ATK +3.15%",
	},
	{
		id: 106,
		name: "Tree Youkai",
		image:
			"https://img.game8.co/4470840/e13553bba1642fe36e6bc1da165f441b.png/show",
		element: "Fire",
		region_id: REGION_SURAH,
		ability: "Switch Skill Fire DMG +5%",
	},
	{
		id: 107,
		name: "Stumpster",
		image:
			"https://img.game8.co/4470867/975e9ab6927b76e12db87b067457420c.png/show",
		element: "Fire",
		region_id: REGION_SURAH,
		ability: "Switch Skill Fire DMG +5%",
	},
	{
		id: 108,
		name: "Bunnie",
		image:
			"https://img.game8.co/4470869/6fff88816f5e7068ee7b45c279d65dea.png/show",
		element: "Wind",
		region_id: REGION_SURAH,
		ability: "Physical DMG +5% for 5s upon using Evasion Counter",
	},
	{
		id: 109,
		name: "Masked Bunnie",
		image:
			"https://img.game8.co/4470864/9610d694415f4cd3682e6307cb455a08.png/show",
		element: "Wind",
		region_id: REGION_SURAH,
		ability: "Physical DMG +5.25% for 5s upon using Evasion Counter",
	},
	{
		id: 110,
		name: "Raccoonie",
		image:
			"https://img.game8.co/4470873/5e343e2d98123a40da3a5afe18585efa.png/show",
		element: "Normal",
		region_id: REGION_SURAH,
		ability: "Target's Physical RES -5% for 5s upon using Evasion Counter",
	},
	{
		id: 111,
		name: "Masked Raccoonie",
		image:
			"https://img.game8.co/4470852/b849de6048e34212650f2923717bd927.png/show",
		element: "Normal",
		region_id: REGION_SURAH,
		ability: "Target's Physical RES -5.25% for 5s upon using Evasion Counter",
	},
	{
		id: 112,
		name: "Battle Spirit",
		image:
			"https://img.game8.co/4470866/33587237a1bbc7ad6b23a1cbc84206fd.png/show",
		element: "Normal",
		region_id: REGION_SURAH,
		ability: "Fire DMG +5% against boss enemies",
	},
	{
		id: 113,
		name: "White Wraith",
		image:
			"https://img.game8.co/4470844/4fe304f7e2844a3ba9702e4c677f60fa.png/show",
		element: "Normal",
		region_id: REGION_SURAH,
		ability: "Fire DMG +5.25% against boss enemies",
	},
	{
		id: 114,
		name: "Shademask",
		image:
			"https://img.game8.co/4470845/4b0b88f544ce4b68379993cb86ada103.png/show",
		element: "Fire",
		region_id: REGION_SURAH,
		ability:
			"Target's ATK -2.75% for 10s upon attacking a boss enemy (Cooldown: 20s)",
	},
	{
		id: 115,
		name: "Ashen Mask",
		image:
			"https://img.game8.co/4470862/99668eba314b1bd4b12ef8af4cdfc180.png/show",
		element: "Fire",
		region_id: REGION_SURAH,
		ability:
			"Target's ATK -2.75% for 10s upon attacking a boss enemy (Cooldown: 20s)",
	},
	{
		id: 116,
		name: "Turtlie",
		image:
			"https://img.game8.co/4470865/26be3efcca179793c39bf16ec1b0fb7b.png/show",
		element: "Normal",
		region_id: REGION_SURAH,
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon being hit by a boss enemy",
	},
	{
		id: 117,
		name: "Silvershell",
		image:
			"https://img.game8.co/4470880/62060c968605370f025789cedd83a1e9.png/show",
		element: "Normal",
		region_id: REGION_SURAH,
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon being hit by a boss enemy",
	},
	{
		id: 118,
		name: "Swamp Odong",
		image:
			"https://img.game8.co/4470872/e9adbd4553890d9d270b662aba583d21.png/show",
		element: "Earth",
		region_id: REGION_SURAH,
		ability: "Target's Earth RES -5.5% for 10s upon using a Switch Skill",
	},
	{
		id: 119,
		name: "Duoxini",
		image:
			"https://img.game8.co/4470863/b8a2bb66522c677b23f31ba5a7ca7d7e.png/show",
		element: "Fire",
		region_id: REGION_SURAH,
		ability:
			"Target's Fire RES -6% for 10s upon attacking with a Fire Special Skill",
	},
	{
		id: 120,
		name: "Fiend",
		image:
			"https://img.game8.co/4470870/acc1fdc580eb04074e3feeca8ba6880e.png/show",
		element: "Fire",
		region_id: REGION_SURAH,
		ability: "Fire DMG +6.3% upon attacking with a Fire Special Skill",
	},
	{
		id: 121,
		name: "Black Hauntstack",
		image:
			"https://img.game8.co/4475574/e79e9d213762358c8a3e98f99430b7ce.png/show",
		element: "Water",
		region_id: REGION_NAMRYUNG,
		ability: "Ice DMG +5.5% against Staggered boss enemies",
	},
	{
		id: 122,
		name: "Ronin Bunnie",
		image:
			"https://img.game8.co/4475580/ec50e2d8475223d9f3871e0fe1fc8230.png/show",
		element: "Wind",
		region_id: REGION_NAMRYUNG,
		ability: "Wind DMG +5% for 5s upon using Evasion Counter",
	},
	{
		id: 123,
		name: "Bleacher Bunnie",
		image:
			"https://img.game8.co/4475575/8316093d6c3c276a018663153a3f7e18.png/show",
		element: "Wind",
		region_id: REGION_NAMRYUNG,
		ability: "Wind DMG +5.3% for 5s upon using Evasion Counter",
	},
	{
		id: 124,
		name: "Ronin Raccoonie",
		image:
			"https://img.game8.co/4475587/7a1b05b6538e808af14d9dda5f7851b8.png/show",
		element: "Earth",
		region_id: REGION_NAMRYUNG,
		ability: "DMG +5% against boss enemies for 5s upon using Evasion Counter",
	},
	{
		id: 125,
		name: "Bleacher Raccoonie",
		image:
			"https://img.game8.co/4475581/46e3f6d1a24bc716d080d23e1241d480.png/show",
		element: "Earth",
		region_id: REGION_NAMRYUNG,
		ability: "DMG +5.3% against boss enemies for 5s upon using Evasion Counter",
	},
	{
		id: 126,
		name: "Ronin Turtlie",
		image:
			"https://img.game8.co/4475590/04d5ee4849256f26a597551fdb6b30a6.png/show",
		element: "Normal",
		region_id: REGION_NAMRYUNG,
		ability: "Physical DMG +5% for 5s upon being hit by a boss enemy",
	},
	{
		id: 127,
		name: "Hop-alee",
		image:
			"https://img.game8.co/4475572/9ac411c1f05088f258c1a6a29b9a5e96.png/show",
		element: "Water",
		region_id: REGION_NAMRYUNG,
		ability: "Air Counter Crit Rate +5%",
	},
	{
		id: 128,
		name: "Salt-alee",
		image:
			"https://img.game8.co/4475586/03f56d72aec28a93e1607155a717d851.png/show",
		element: "Water",
		region_id: REGION_NAMRYUNG,
		ability: "Air Counter Crit Rate +5.3%",
	},
	{
		id: 129,
		name: "Brute-alee",
		image:
			"https://img.game8.co/4475571/e7081f1ea3a0519e07cb8f1b23b1dd46.png/show",
		element: "Water",
		region_id: REGION_NAMRYUNG,
		ability: "Air Counter Crit DMG +5%",
	},
	{
		id: 130,
		name: "Borborg",
		image:
			"https://img.game8.co/4475570/b1c3f3eb705e7b8f6aab815534d5ef3e.png/show",
		element: "Normal",
		region_id: REGION_NAMRYUNG,
		ability: "DEF +4.1% for 5s upon attacking a boss enemy 10 times",
	},
	{
		id: 131,
		name: "Goald",
		image:
			"https://img.game8.co/4475583/22df6c61b52d3580ba4825911778cd36.png/show",
		element: "Normal",
		region_id: REGION_NAMRYUNG,
		ability: "DEF +4.3% for 5s upon attacking a boss enemy 10 times",
	},
	{
		id: 132,
		name: "Cacabagge",
		image:
			"https://img.game8.co/4475569/5fca121352267905b75346aa9c26dd6f.png/show",
		element: "Earth",
		region_id: REGION_NAMRYUNG,
		ability: "Earth DMG +5% against normal enemies",
	},
	{
		id: 133,
		name: "Kimkimchi",
		image:
			"https://img.game8.co/4475582/103836b8faf95d3b32779c97be74867a.png/show",
		element: "Earth",
		region_id: REGION_NAMRYUNG,
		ability: "Earth DMG +5.3% against normal enemies",
	},
	{
		id: 134,
		name: "Cocorn",
		image:
			"https://img.game8.co/4475555/cf8b52f7debfcd43eed7518c700f7074.png/show",
		element: "Earth",
		region_id: REGION_NAMRYUNG,
		ability: "Crit DMG +5% against normal enemies (Cooldown: 20s)",
	},
	{
		id: 135,
		name: "Rococorn",
		image:
			"https://img.game8.co/4475573/2b2a9f91236665967c48996cf51b2bf3.png/show",
		element: "Earth",
		region_id: REGION_NAMRYUNG,
		ability: "Crit DMG +5.3% against normal enemies (Cooldown: 20s)",
	},
	{
		id: 136,
		name: "Twisted Spineflower",
		image:
			"https://img.game8.co/4475579/73880b8a956715e52f841fa2ef1bd0b9.png/show",
		element: "Lightning ",
		region_id: REGION_NAMRYUNG,
		ability: "Lightning DMG +5% upon attacking Lightning enemy 10 times",
	},
	{
		id: 137,
		name: "Twisted Bloodflower",
		image:
			"https://img.game8.co/4475584/0d398e5f520cd78c72a434cbc622a9c7.png/show",
		element: "Lightning ",
		region_id: REGION_NAMRYUNG,
		ability:
			"Target's Lightning RES -5% for 5s upon attacking Lightning enemy 5 times (Cooldown: 20s)",
	},
	{
		id: 138,
		name: "Bruised Bloodflower",
		image:
			"https://img.game8.co/4475556/32d97fc923edf73bf8fac7e49f5f7dcd.png/show",
		element: "Lightning ",
		region_id: REGION_NAMRYUNG,
		ability:
			"Target's Lightning RES -5.3% for 5s upon attacking Lightning enemy 5 times",
	},
	{
		id: 139,
		name: "Manwol",
		image:
			"https://img.game8.co/4475589/02d8c127c03021d4588eaf85d6ee7ad4.png/show",
		element: "Wind",
		region_id: REGION_NAMRYUNG,
		ability: "Crit Rate +6% for 5s upon using Evasion Counter",
	},
	{
		id: 140,
		name: "Nokjung",
		image:
			"https://img.game8.co/4475588/69117b99f19e9a796693f6477e3cbae9.png/show",
		element: "Wind",
		region_id: REGION_NAMRYUNG,
		ability: "Crit Rate +6.3% for 5s upon using Evasion Counter",
	},
	{
		id: 141,
		name: "Onsae",
		image:
			"https://img.game8.co/4475585/1428a4b952ee99b4e752e80c77a6719a.png/show",
		element: "Fire",
		region_id: REGION_NAMRYUNG,
		ability:
			"Crit DMG +6% for 5s upon landing a critical hit with an Ultimate Skill",
	},
	{
		id: 142,
		name: "Cinder",
		image:
			"https://img.game8.co/4475577/bf917736188c41e10dded0cbbea8fc4d.png/show",
		element: "Fire",
		region_id: REGION_NAMRYUNG,
		ability:
			"Crit DMG +6.3% for 5s upon landing a critical hit with Ultimate Skill",
	},
	{
		id: 143,
		name: "Hahnul",
		image:
			"https://img.game8.co/4475558/28360d0d1deb047a8420f8704cd53ee2.png/show",
		element: "Lightning ",
		region_id: REGION_NAMRYUNG,
		ability:
			"All teammates' Switch Skill DMG +6% for 10s upon landing a critical hit on a boss enemy",
	},
	{
		id: 144,
		name: "Gulgak",
		image:
			"https://img.game8.co/4475576/2a47a494d92f06186d685a27051b8e69.png/show",
		element: "Lightning ",
		region_id: REGION_NAMRYUNG,
		ability:
			"Target's DEF -4.7% for 5s upon landing a critical hit on a boss enemy.",
	},
	{
		id: 145,
		name: "Baby Spirit",
		image:
			"https://img.game8.co/4515748/d4e772a08dc4bd207c6d0df136484002.png/show",
		element: "Wind",
		region_id: REGION_MUWON,
		ability:
			"DMG +5% against normal enemies for 5s upon attacking Wind enemy 10 times",
	},
	{
		id: 146,
		name: "Chipmunk Spirit",
		image:
			"https://img.game8.co/4515749/cb796643aae062ee766b8385cf7c8d2d.png/show",
		element: "Wind",
		region_id: REGION_MUWON,
		ability:
			"DMG +5% against normal enemies for 5s upon attacking Wind enemy 10 times",
	},
	{
		id: 147,
		name: "Wind Spirit",
		image:
			"https://img.game8.co/4515754/853c527a5619b7d296cd37a52cdc0118.png/show",
		element: "Wind",
		region_id: REGION_MUWON,
		ability: "ATK +2.5% upon attacking Wind enemy 10 times",
	},
	{
		id: 148,
		name: "Grudge Spirit",
		image:
			"https://img.game8.co/4515755/35cad8d3c23edb6973b2a2f970c3ee73.png/show",
		element: "Dark",
		region_id: REGION_MUWON,
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon using a Switch Skill",
	},
	{
		id: 149,
		name: "Grudge Revenant",
		image:
			"https://img.game8.co/4515758/0eaca659391b8eb0e648d37ab89515fd.png/show",
		element: "Dark",
		region_id: REGION_MUWON,
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon using a Switch Skill",
	},
	{
		id: 150,
		name: "Phantom Snow Tiger",
		image:
			"https://img.game8.co/4515778/b4d69eef5e1c468b2cca69d1fb48e207.png/show",
		element: "Ice",
		region_id: REGION_MUWON,
		ability: "Suppression DMG +5.5% for 5s upon using a Switch Skill",
	},
	{
		id: 151,
		name: "Phantom Stone Tiger",
		image:
			"https://img.game8.co/4515780/5740c7703e6c181d41c634baf1ddb4a7.png/show",
		element: "Earth",
		region_id: REGION_MUWON,
		ability: "Suppression DMG +5.5% for 5s upon using a Switch Skill",
	},
	{
		id: 152,
		name: "Lizarcher",
		image:
			"https://img.game8.co/4515761/4d24659867519efb970193b72ebd7d38.png/show",
		element: "Fire",
		region_id: REGION_MUWON,
		ability: "DEF +3.75% for 5s upon attacking Fire enemy 10 times",
	},
	{
		id: 153,
		name: "Sun Lizarcher",
		image:
			"https://img.game8.co/4515764/5a235db3383ba55bd64caa128cc6b61b.png/show",
		element: "Fire",
		region_id: REGION_MUWON,
		ability: "DEF +3.75% for 5s upon attacking Fire enemy 10 times",
	},
	{
		id: 154,
		name: "Lizcout",
		image:
			"https://img.game8.co/4515706/0e90fdf3be4705dced19a7456dd49284.png/show",
		element: "Earth",
		region_id: REGION_MUWON,
		ability: "Earth ATK +5% for 10s upon being hit (Cooldown: 20s)",
	},
	{
		id: 155,
		name: "Master Lizcout",
		image:
			"https://img.game8.co/4515713/1ded20d28926f7c6f8520aebdb9d5eb5.png/show",
		element: "Earth",
		region_id: REGION_MUWON,
		ability: "Earth ATK +5% for 10s upon being hit (Cooldown: 20s)",
	},
	{
		id: 156,
		name: "Kroko",
		image:
			"https://img.game8.co/4515723/dcc0e8412fa514c98491cddd8150c9d3.png/show",
		element: "Normal",
		region_id: REGION_MUWON,
		ability: "DEF +3.75% for 5s upon attacking normal enemy 10 times",
	},
	{
		id: 157,
		name: "Krokomander",
		image:
			"https://img.game8.co/4515727/b00afa07d77432aba764c9739015c8a2.png/show",
		element: "Normal",
		region_id: REGION_MUWON,
		ability: "DEF +3.75% for 5s upon attacking normal enemy 10 times",
	},
	{
		id: 158,
		name: "Bunnie Swordsman",
		image:
			"https://img.game8.co/4515775/113cfbf16211c75f02ddf3309fd0492e.png/show",
		element: "Wind",
		region_id: REGION_MUWON,
		ability: "Target's Wind RES -5% for 5s upon using Evasion Counter",
	},
	{
		id: 159,
		name: "Toad-alee",
		image:
			"https://img.game8.co/4515742/15d7163fb350c2a12a5b772b572c2c73.png/show",
		element: "Normal",
		region_id: REGION_MUWON,
		ability: "All teammates' DEF +4.13% for 5s upon being hit by a boss enemy ",
	},
	{
		id: 160,
		name: "Irontoise",
		image:
			"https://img.game8.co/4515732/8efeb88b5acd3f68a6bb3ca1bcd697bc.png/show",
		element: "Normal",
		region_id: REGION_MUWON,
		ability:
			"All teammates' DEF +4.13% for 10s upon landing a critical hit on a boss enemy",
	},
	{
		id: 161,
		name: "Treetoise",
		image:
			"https://img.game8.co/4515738/e610e8aed21f5681bf4a3cbebac38eec.png/show",
		element: "Normal",
		region_id: REGION_MUWON,
		ability:
			"All teammates' DEF +4.13% for 10s upon landing a critical hit on a boss enemy",
	},
	{
		id: 162,
		name: "Sunek",
		image:
			"https://img.game8.co/4515768/77168f30926b86b565fc11644fe6f638.png/show",
		element: "Wind",
		region_id: REGION_MUWON,
		ability: "DEF +3.75% for 5s upon attacking Wind enemy 10 times",
	},
	{
		id: 163,
		name: "Suhwa",
		image:
			"https://img.game8.co/4515771/f3f375b3ee44c3ebc04d1551c5338e52.png/show",
		element: "Wind",
		region_id: REGION_MUWON,
		ability: "DEF +3.75% for 5s upon attacking Wind enemy 10 times",
	},
	{
		id: 164,
		name: "Red Shadow",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWetlandMaster.png",
		element: "Water",
		region_id: REGION_MUWON,
		ability: "Crit DMG +6% for 4s upon using a Ice Special Skill",
	},
	{
		id: 165,
		name: "Blue Shadow",
		image:
			"https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWetlandMasterBlue.png",
		element: "Water",
		region_id: REGION_MUWON,
		ability: "Ice DMG +6% upon attacking with a Ice Special Skill",
	},
];
