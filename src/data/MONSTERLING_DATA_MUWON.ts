import type { MonsterCodexEntry } from "@/data/MONSTERLINGS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";

export const MONSTER_LING_DATA_MUWON: MonsterCodexEntry[] = [
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
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
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
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
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
