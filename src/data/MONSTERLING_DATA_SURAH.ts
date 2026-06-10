import type { MonsterCodexEntry } from "@/data/MONSTERLINGS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";

export const MONSTERLING_DATA_SURAH: MonsterCodexEntry[] = [
	{
		id: 96,
		name: "Lil' Hauntstack",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeSmall.png",
		image: "/images/Monsterling_Icons/MonsterlingGeuseunsaeSmall.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Switch Skill Crit DMG +5%",
	},
	{
		id: 97,
		name: "Sacred Hauntstack",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeSky.png",
		image: "/images/Monsterling_Icons/MonsterlingGeuseunsaeSky.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Switch Skill Crit DMG +5.25%",
	},
	{
		id: 98,
		name: "Hauntstack",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsae.png",
		image: "/images/Monsterling_Icons/MonsterlingGeuseunsae.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Switch Skill Crit Rate +5",
	},
	{
		id: 99,
		name: "Brush Hauntstack",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeGreen.png",
		image: "/images/Monsterling_Icons/MonsterlingGeuseunsaeGreen.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Ice DMG +5.25% against Staggered boss enemies",
	},
	{
		id: 100,
		name: "Bop-kkaebi",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKkebi.png",
		image: "/images/Monsterling_Icons/MonsterlingKkebi.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ultimate Skill Crit DMG 5%",
	},
	{
		id: 101,
		name: "Pew-kkaebi",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKkebiGreen.png",
		image: "/images/Monsterling_Icons/MonsterlingKkebiGreen.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ultimate Skill Fire DMG +5%",
	},
	{
		id: 102,
		name: "Kkaebi Herder",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinShieldKkebi.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinShieldKkebi.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"DMG +5% against normal enemies for 5s upon using an Ultimate Skill",
	},
	{
		id: 103,
		name: "Odong Seed",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingOdongseed.png",
		image: "/images/Monsterling_Icons/MonsterlingOdongseed.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Crit Rate +5% (Cooldown: 20s)",
	},
	{
		id: 104,
		name: "Odong",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKimodong.png",
		image: "/images/Monsterling_Icons/MonsterlingKimodong.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Switch Skill ATK +3%",
	},
	{
		id: 105,
		name: "Maple Odong",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKimodongMaple.png",
		image: "/images/Monsterling_Icons/MonsterlingKimodongMaple.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Switch Skill ATK +3.15%",
	},
	{
		id: 106,
		name: "Tree Youkai",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTreeBackah.png",
		image: "/images/Monsterling_Icons/MonsterlingTreeBackah.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Switch Skill Fire DMG +5%",
	},
	{
		id: 107,
		name: "Stumpster",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingTreeBackahAxe.png",
		image: "/images/Monsterling_Icons/MonsterlingTreeBackahAxe.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Switch Skill Fire DMG +5%",
	},
	{
		id: 108,
		name: "Bunnie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRabbitPojol.png",
		image: "/images/Monsterling_Icons/MonsterlingRabbitPojol.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5% for 5s upon using Evasion Counter",
	},
	{
		id: 109,
		name: "Masked Bunnie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRabbitKkebiGreen.png",
		image: "/images/Monsterling_Icons/MonsterlingRabbitKkebiGreen.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Physical DMG +5.25% for 5s upon using Evasion Counter",
	},
	{
		id: 110,
		name: "Raccoonie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRaccoonPojol.png",
		image: "/images/Monsterling_Icons/MonsterlingRaccoonPojol.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Target's Physical RES -5% for 5s upon using Evasion Counter",
	},
	{
		id: 111,
		name: "Masked Raccoonie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRaccoonMask.png",
		image: "/images/Monsterling_Icons/MonsterlingRaccoonMask.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Target's Physical RES -5.25% for 5s upon using Evasion Counter",
	},
	{
		id: 112,
		name: "Battle Spirit",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniMiddle.png",
		image: "/images/Monsterling_Icons/MonsterlingDuoxiniMiddle.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Fire DMG +5% against boss enemies",
	},
	{
		id: 113,
		name: "White Wraith",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniMiddleWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingDuoxiniMiddleWhite.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Fire DMG +5.25% against boss enemies",
	},
	{
		id: 114,
		name: "Shademask",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniMiddleBoss.png",
		image: "/images/Monsterling_Icons/MonsterlingDuoxiniMiddleBoss.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Target's ATK -2.75% for 10s upon attacking a boss enemy (Cooldown: 20s)",
	},
	{
		id: 115,
		name: "Ashen Mask",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniMiddleBossWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingDuoxiniMiddleBossWhite.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Target's ATK -2.75% for 10s upon attacking a boss enemy (Cooldown: 20s)",
	},
	{
		id: 116,
		name: "Turtlie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtlePojol.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanTurtlePojol.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon being hit by a boss enemy",
	},
	{
		id: 117,
		name: "Silvershell",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtleSilver.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanTurtleSilver.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"All teammates' Support Skill DMG +5% for 5s upon being hit by a boss enemy",
	},
	{
		id: 118,
		name: "Swamp Odong",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingKimodongSwamp.png",
		image: "/images/Monsterling_Icons/MonsterlingKimodongSwamp.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Target's Earth RES -5.5% for 10s upon using a Switch Skill",
	},
	{
		id: 119,
		name: "Duoxini",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxini.png",
		image: "/images/Monsterling_Icons/MonsterlingDuoxini.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"Target's Fire RES -6% for 10s upon attacking with a Fire Special Skill",
	},
	{
		id: 120,
		name: "Fiend",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDuoxiniRed.png",
		image: "/images/Monsterling_Icons/MonsterlingDuoxiniRed.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.SURAH,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Fire DMG +6.3% upon attacking with a Fire Special Skill",
	},
];
