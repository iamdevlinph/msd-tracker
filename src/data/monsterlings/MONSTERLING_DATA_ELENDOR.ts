import { ELEMENT_ID_BY_ELEMENT } from "@/data/elements/ELEMENTS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";
import type { MonsterCodexData } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { REGION_ID_BY_REGION } from "@/data/regions/REGIONS_DATA";
import { TIER_ID_BY_TIER } from "@/data/tiers/TIERS_DATA";

export const MONSTERLING_DATA_ELENDOR: MonsterCodexData = {
	1: {
		id: 1,
		name: "Cappy",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopy.png",
		image: "/images/Monsterling_Icons/MonsterlingChopy.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Crit Rate +6.25% (Cooldown: 20s)",
	},
	2: {
		id: 2,
		name: "Cappyberry",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyPurple.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyPurple.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill Crit Rate +6.57% (Triggers once every 20s)",
	},
	3: {
		id: 3,
		name: "Cappy Mama",
		linkChain: {
			unlock_level: 1,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Mother's Leaf",
			trigger: ["Using a Special Skill"],
			effect:
				"Jumps toward the enemy with a powerful body slam, dealing Physical DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyKing.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyKing.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE, SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"Recovers 2.4% of Max HP upon landing a Special Skill (Cooldown: 15s)",
	},
	4: {
		id: 4,
		name: "Leafy Mama",
		linkChain: {
			unlock_level: 3,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Queenshroom's Halo",
			trigger: ["When HP is 50% or lower"],
			effect:
				"Dances to cheer nearby allies, then grants them a healing effect.",
			bonusEffects: ["Heals 10% of Max HP"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyKingSlimeling.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyKingSlimeling.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Recovers 2.52% of Max HP upon using a Special Skill (Triggers once every 15s)",
	},
	5: {
		id: 5,
		name: "Slimelet",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlime.png",
		image: "/images/Monsterling_Icons/MonsterlingSlime.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +6.25% against Physical enemies",
	},
	6: {
		id: 6,
		name: "Inklet",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeBlack.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit DMG +6.57% against Physical enemies",
	},
	7: {
		id: 7,
		name: "Goblin Recruit",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblin.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblin.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Crit DMG +6.25% for 5s upon landing 10 Basic Attacks (Cooldown: 20s)",
	},
	8: {
		id: 8,
		name: "2nd Lt. Goblin",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinPink.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinPink.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Crit DMG +6.57% for 5s upon landing a Basic Attack 10 times (Cooldown: 20s)",
	},
	9: {
		id: 9,
		name: "Pvt. Goblin",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinBow.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinBow.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +6.25% for 5s upon 10 Basic Attacks (Cooldown: 20s)",
	},
	10: {
		id: 10,
		name: "Cpl. Goblin",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinshield.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinshield.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Suppression DMG +6.25% for 5s upon landing a Basic Attack 10 times (Cooldown: 20s)",
	},
	11: {
		id: 11,
		name: "White Wolf Warrior",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolf.png",
		image: "/images/Monsterling_Icons/MonsterlingWerewolf.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"Brawl DMG +6.25% for 5s upon landing a critical hit (Cooldown: 20s)",
	},
	12: {
		id: 12,
		name: "Black Wolf",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWhiteWolf_HostileBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingWhiteWolf_HostileBlack.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Brawl DMG +6.57% for 5s upon landing a critical hit (Cooldown: 20s)",
	},
	13: {
		id: 13,
		name: "Frostjaw",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolfMagic.png",
		image: "/images/Monsterling_Icons/MonsterlingWerewolfMagic.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Critical Ice DMG +6.25%",
	},
	14: {
		id: 14,
		name: "Crimsonjaw",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolfMagicianRed.png",
		image: "/images/Monsterling_Icons/MonsterlingWerewolfMagicianRed.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Critical Ice DMG +6.57%",
	},
	15: {
		id: 15,
		name: "Forkmugger",
		linkChain: {
			unlock_level: 6,
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Gluttonous Fork",
			trigger: ["Using Evasion Counter"],
			effect: "Strikes a potato with its fork, dealing Physical DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpoonmuggerFork.png",
		image: "/images/Monsterling_Icons/MonsterlingSpoonmuggerFork.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"Target's Physical RES -11% for 5s upon attacking with target's Elemental Weakness (Cooldown: 15s)",
	},
	16: {
		id: 16,
		name: "King Slime",
		linkChain: {
			unlock_level: 3,
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Gooey Crown",
			trigger: ["Using a Special Skill"],
			effect: "Slams into the enemy, dealing Water DMG.",
			bonusEffects: ["30% Movement Speed Reduction (10s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeKing.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeKing.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"All teammates' DEF +8.25% for 5s upon attacking a Water enemy (Cooldown: 10s)",
	},
	17: {
		id: 17,
		name: "Scarlet Queen",
		linkChain: {
			unlock_level: 5,
			sort_order: 2,
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Queen's Crimson Tears",
			trigger: ["Using a Special Skill"],
			effect:
				"Charges and body-slams the enemy, dealing Water DMG and rendering them Airborne.",
			bonusEffects: ["50% Movement Speed Reduction (10s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeRed.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeRed.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "ATK +5.78% for 10s upon attacking a Water enemy (Cooldown: 20s)",
	},
	18: {
		id: 18,
		name: "Taglock",
		linkChain: {
			unlock_level: 5,
			sort_order: 1,
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Broken Fang",
			trigger: ["Using a Switch Skill"],
			effect:
				"Jumps toward the enemy and strikes with a hammer, dealing Physical DMG and rendering them Airborne.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinChief.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinChief.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability:
			"ATK +5.5% for 10s upon making 20 successful attacks (Triggers once every 20s)",
	},
	19: {
		id: 19,
		name: "Big Bro Goblin",
		linkChain: {
			unlock_level: 8,
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Commanding Flute",
			trigger: ["Using a Switch Skill"],
			effect:
				"Strikes the enemy twice with a hammer, dealing Physical DMG and rendering them Airborne.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinChiefWhite.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinChiefWhite.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Restores 3.47% HP for all teammates upon landing a Basic Attack 10 times (Cooldown: 20s)",
	},
	20: {
		id: 20,
		name: "Lupe",
		linkChain: {
			unlock_level: 7,
			sort_order: 1,
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Warrior's Mark",
			trigger: ["Landing an Ice Attack"],
			effect: "Charges the enemy, dealing Ice DMG.",
			bonusEffects: ["Freeze (2s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHaka.png",
		image: "/images/Monsterling_Icons/MonsterlingHaka.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"Neutralization DMG +11% for 10s upon landing a critical hit (Cooldown: 20s)",
	},
	21: {
		id: 21,
		name: "Moon Shadow Lupe",
		linkChain: {
			unlock_level: 9,
			tier_id: TIER_ID_BY_TIER.CHOICE_4,
			name: "Moonlight-Touched Claw",
			trigger: ["Using a Special Skill"],
			effect: "Charges twice with its claws, dealing Ice DMG.",
			bonusEffects: ["Freeze (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingHakaPurple.png",
		image: "/images/Monsterling_Icons/MonsterlingHakaPurple.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Target's Ice RES -11.55% for 10s upon landing a critical hit",
	},
	22: {
		id: 22,
		name: "Ring Slime",
		linkChain: {
			unlock_level: 2,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Wet Leaf",
			trigger: ["Landing an attack"],
			effect: "Charges the enemy twice, dealing Water DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeLing.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeLing.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.WATER,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "ATK +4% against Physical enemies",
	},
	23: {
		id: 23,
		name: "Uncle Cappy",
		linkChain: {
			unlock_level: 2,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Mushroom Basket",
			trigger: ["Using Dodge"],
			effect: "Kicks a Bombshroom at the enemy, dealing Fire DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyThrowUncle.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyThrowUncle.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Fire DMG +8% (Cooldown: 15s)",
	},
	24: {
		id: 24,
		name: "Green Cappy Bro",
		linkChain: {
			unlock_level: 7,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Mushroom Man's Pouch",
			trigger: ["Using a Special Skill"],
			effect: "Throws poisonous mushrooms at the enemy, dealing Earth DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopaThrowUncle1.png",
		image: "/images/Monsterling_Icons/MonsterlingChopaThrowUncle1.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill Fire DMG +8.4% (Cooldown: 15s)",
	},
	25: {
		id: 25,
		name: "Digger Mole",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDugi.png",
		image: "/images/Monsterling_Icons/MonsterlingDugi.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +6.25% against knocked-down targets",
	},
	26: {
		id: 26,
		name: "Gold Digger Mole",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDugiGold.png",
		image: "/images/Monsterling_Icons/MonsterlingDugiGold.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit Rate +6.57% against knocked-down targets",
	},
	27: {
		id: 27,
		name: "Tunneler Mole",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingDugi_SlingShot.png",
		image: "/images/Monsterling_Icons/MonsterlingDugi_SlingShot.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Earth DMG +6.25% against knocked-down targets",
	},
	28: {
		id: 28,
		name: "Brown Cappy",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyThrow.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyThrow.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Crit DMG +6.25% (Cooldown: 20s)",
	},
	29: {
		id: 29,
		name: "Teal Cappy",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyThrowBlue.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyThrowBlue.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill Crit DMG +6.57% (Cooldown: 20s)",
	},
	30: {
		id: 30,
		name: "Green Cappy",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyPoison.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyPoison.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skill Neutralization DMG +6.57% (Cooldown: 15s)",
	},
	31: {
		id: 31,
		name: "Orange Cappy",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopyPoisonOrange.png",
		image: "/images/Monsterling_Icons/MonsterlingChopyPoisonOrange.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Special Skill Neutralization DMG +6.57% (Cooldown: 15s)",
	},
	32: {
		id: 32,
		name: "Spark Slime",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeThunder.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeThunder.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +6.25% against Lightning enemies",
	},
	33: {
		id: 33,
		name: "Golden Spark Slime",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeThunderYellow.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeThunderYellow.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit Rate +6.57% against Lightning enemies",
	},
	34: {
		id: 34,
		name: "White Wolf Fulminator",
		linkChain: {
			unlock_level: 6,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Shaman's Staff",
			trigger: ["Using Evasion Counter"],
			effect:
				"Leaps up and creates an explosion with its staff, dealing Lightning DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingWerewolf_MagicianLightning.png",
		image:
			"/images/Monsterling_Icons/MonsterlingWerewolf_MagicianLightning.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE, SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Critical hits' Lightning DMG +8%",
	},
	35: {
		id: 35,
		name: "Moley Mole",
		linkChain: {
			unlock_level: 4,
			sort_order: 1,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Mole's Shovel",
			trigger: ["Rendering the enemy Airborne"],
			effect: "Charges with a shovel, dealing Physical DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMolly.png",
		image: "/images/Monsterling_Icons/MonsterlingMolly.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE, SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Suppression DMG +8% against knocked-down targets",
	},
	36: {
		id: 36,
		name: "Gold Digger Moley Mole",
		linkChain: {
			unlock_level: 8,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Mole's Treasure",
			trigger: ["Rendering the enemy Airborne"],
			effect:
				"Charges twice, dealing Physical DMG and rendering the enemy Airborne.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMoleyGold.png",
		image: "/images/Monsterling_Icons/MonsterlingMoleyGold.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Suppression DMG +8.4% against knocked-down targets",
	},
	37: {
		id: 37,
		name: "Green Cappy Papa",
		linkChain: {
			unlock_level: 4,
			tier_id: TIER_ID_BY_TIER.SELECT_3,
			name: "Green Swaddle",
			trigger: ["When Hit"],
			effect: "Releases a spore explosion, dealing Earth DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingChopaDaddy.png",
		image: "/images/Monsterling_Icons/MonsterlingChopaDaddy.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Special Skills' ATK +4% (Triggers once every 15s)",
	},
	38: {
		id: 38,
		name: "Custos",
		linkChain: {
			unlock_level: 9,
			tier_id: TIER_ID_BY_TIER.PRIME_5,
			name: "Warden's Core",
			trigger: ["Using a Special Skill"],
			effect:
				"Throws nature energy that drags enemies in, then explodes for Earth DMG and renders them Airborne.",
			bonusEffects: ["15% Neutralization RES Reduction (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGolemBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingGolemBlack.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"Target's DEF -8.25% for 5s upon landing a critical hit with an Earth Attack",
	},
	39: {
		id: 39,
		name: "El Dorado Guardian",
		linkChain: {
			unlock_level: 11,
			tier_id: TIER_ID_BY_TIER.PRIME_5,
			name: "Mutated Spirit Core",
			trigger: ["Attacking a Staggered target"],
			effect: "Unleashes energy toward the enemy, dealing Earth DMG.",
			bonusEffects: ["30% Elemental Weakness DMG Boost (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGolemGold.png",
		image: "/images/Monsterling_Icons/MonsterlingGolemGold.webp",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.ELENDOR,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"All teammates' ATK +5.78% for 10s upon attacking a boss enemy with their Elemental Weakness (Cooldown: 20s)",
	},
};
