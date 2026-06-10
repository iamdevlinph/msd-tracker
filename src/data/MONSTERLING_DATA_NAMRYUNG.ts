import type { MonsterCodexEntry } from "@/data/MONSTERLINGS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";

export const MONSTER_LING_DATA_NAMRYUNG: MonsterCodexEntry[] = [
	{
		id: 121,
		name: "Black Hauntstack",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGeuseunsaeBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingGeuseunsaeBlack.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ice DMG +5.5% against Staggered boss enemies",
	},
	{
		id: 122,
		name: "Ronin Bunnie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRabbitBackah.png",
		image: "/images/Monsterling_Icons/MonsterlingRabbitBackah.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Wind DMG +5% for 5s upon using Evasion Counter",
	},
	{
		id: 123,
		name: "Bleacher Bunnie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRabbitBackahWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingRabbitBackahWhite.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Wind DMG +5.3% for 5s upon using Evasion Counter",
	},
	{
		id: 124,
		name: "Ronin Raccoonie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRaccoonBackah.png",
		image: "/images/Monsterling_Icons/MonsterlingRaccoonBackah.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DMG +5% against boss enemies for 5s upon using Evasion Counter",
	},
	{
		id: 125,
		name: "Bleacher Raccoonie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingRaccoonBackahWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingRaccoonBackahWhite.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "DMG +5.3% against boss enemies for 5s upon using Evasion Counter",
	},
	{
		id: 126,
		name: "Ronin Turtlie",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHermanTurtleBackah.png",
		image: "/images/Monsterling_Icons/MonsterlingHermanTurtleBackah.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5% for 5s upon being hit by a boss enemy",
	},
	{
		id: 127,
		name: "Hop-alee",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguri.png",
		image: "/images/Monsterling_Icons/MonsterlingMeoguri.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Air Counter Crit Rate +5%",
	},
	{
		id: 128,
		name: "Salt-alee",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriBlue.png",
		image: "/images/Monsterling_Icons/MonsterlingMeoguriBlue.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Air Counter Crit Rate +5.3%",
	},
	{
		id: 129,
		name: "Brute-alee",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriRed.png",
		image: "/images/Monsterling_Icons/MonsterlingMeoguriRed.png",
		element: "Water",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Air Counter Crit DMG +5%",
	},
	{
		id: 130,
		name: "Borborg",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriShieldBoss.png",
		image: "/images/Monsterling_Icons/MonsterlingMeoguriShieldBoss.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE, SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "DEF +4.1% for 5s upon attacking a boss enemy 10 times",
	},
	{
		id: 131,
		name: "Goald",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMeoguriShieldBossGold.png",
		image: "/images/Monsterling_Icons/MonsterlingMeoguriShieldBossGold.png",
		element: "Normal",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "DEF +4.3% for 5s upon attacking a boss enemy 10 times",
	},
	{
		id: 132,
		name: "Cacabagge",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNachuchu.png",
		image: "/images/Monsterling_Icons/MonsterlingNachuchu.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Earth DMG +5% against normal enemies",
	},
	{
		id: 133,
		name: "Kimkimchi",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNachuchuKimchi.png",
		image: "/images/Monsterling_Icons/MonsterlingNachuchuKimchi.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Earth DMG +5.3% against normal enemies",
	},
	{
		id: 134,
		name: "Cocorn",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNasusu.png",
		image: "/images/Monsterling_Icons/MonsterlingNasusu.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +5% against normal enemies (Cooldown: 20s)",
	},
	{
		id: 135,
		name: "Rococorn",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingNasusuButter.png",
		image: "/images/Monsterling_Icons/MonsterlingNasusuButter.png",
		element: "Earth",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit DMG +5.3% against normal enemies (Cooldown: 20s)",
	},
	{
		id: 136,
		name: "Twisted Spineflower",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingFlowerBackah.png",
		image: "/images/Monsterling_Icons/MonsterlingFlowerBackah.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Lightning DMG +5% upon attacking Lightning enemy 10 times",
	},
	{
		id: 137,
		name: "Twisted Bloodflower",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingFlowerBackahMiddle.png",
		image: "/images/Monsterling_Icons/MonsterlingFlowerBackahMiddle.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Target's Lightning RES -5% for 5s upon attacking Lightning enemy 5 times (Cooldown: 20s)",
	},
	{
		id: 138,
		name: "Bruised Bloodflower",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingFlowerBackahMiddleBlue.png",
		image: "/images/Monsterling_Icons/MonsterlingFlowerBackahMiddleBlue.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Target's Lightning RES -5.3% for 5s upon attacking Lightning enemy 5 times",
	},
	{
		id: 139,
		name: "Manwol",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingManwollok.png",
		image: "/images/Monsterling_Icons/MonsterlingManwollok.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Crit Rate +6% for 5s upon using Evasion Counter",
	},
	{
		id: 140,
		name: "Nokjung",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingManwollokBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingManwollokBlack.png",
		element: "Wind",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit Rate +6.3% for 5s upon using Evasion Counter",
	},
	{
		id: 141,
		name: "Onsae",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHakaBackah.png",
		image: "/images/Monsterling_Icons/MonsterlingHakaBackah.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"Crit DMG +6% for 5s upon landing a critical hit with an Ultimate Skill",
	},
	{
		id: 142,
		name: "Cinder",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHakaBackahBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingHakaBackahBlack.png",
		element: "Fire",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Crit DMG +6.3% for 5s upon landing a critical hit with Ultimate Skill",
	},
	{
		id: 143,
		name: "Hahnul",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHanul.png",
		image: "/images/Monsterling_Icons/MonsterlingHanul.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"All teammates' Switch Skill DMG +6% for 10s upon landing a critical hit on a boss enemy",
	},
	{
		id: 144,
		name: "Gulgak",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHanulWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingHanulWhite.png",
		element: "Lightning ",
		region_id: REGION_ID_BY_REGION.NAMRYUNG,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Target's DEF -4.7% for 5s upon landing a critical hit on a boss enemy.",
	},
];
