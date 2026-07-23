import { ELEMENT_ID_BY_ELEMENT } from "@/data/ELEMENTS_DATA";
import type { MonsterCodexData } from "@/data/MONSTERLINGS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/MONSTERLINGS_SOURCE_DATA";
import { REGION_ID_BY_REGION } from "@/data/REGIONS_DATA";

export const MONSTERLING_DATA_SERENIA: MonsterCodexData = {
	69: {
		id: 69,
		name: "Gorrik",
		linkChain: {
			name: "Taskmaster's Leather Gloves",
			trigger: ["Landing an attack"],
			effect:
				"Leaps at the enemy and strikes twice with a sword, dealing Physical DMG.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGoblinEnforcer.png",
		image: "/images/Monsterling_Icons/MonsterlingGoblinEnforcer.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Recovers 1.65% of Max HP upon landing 10 Basic Attacks",
	},
	70: {
		id: 70,
		name: "Ice Slime",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeIce.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeIce.png",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Elemental Weakness DMG +5% against Ice enemies",
	},
	71: {
		id: 71,
		name: "Slimeboo",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeIceGreen.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeIceGreen.png",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit DMG +5.25% against Physical enemies",
	},
	72: {
		id: 72,
		name: "Fire Slime",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeFire.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeFire.png",
		element_id: ELEMENT_ID_BY_ELEMENT.FIRE,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Elemental Weakness DMG +5% against Fire enemies",
	},
	73: {
		id: 73,
		name: "Queen Slime",
		linkChain: {
			name: "Queen's Crown",
			trigger: ["Using Evasion Counter"],
			effect:
				"Punches the enemy, dealing Physical DMG and rendering them Airborne.",
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeQueen.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeQueen.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Physical DMG +5.5% for 5s upon attacking Physical enemy",
	},
	74: {
		id: 74,
		name: "Empress Slime",
		linkChain: {
			name: "Queen's Mascara",
			trigger: ["Using Evasion Counter"],
			effect:
				"Unleashes a flurry of punches, dealing Physical DMG and rendering the enemy Airborne.",
			bonusEffects: ["15% Neutralization RES Reduction (10s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSlimeQueenRed.png",
		image: "/images/Monsterling_Icons/MonsterlingSlimeQueenRed.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "ATK +2.89% for 10s upon attacking Physical enemy (Cooldown: 20s)",
	},
	75: {
		id: 75,
		name: "Spaider",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpiderGrassland.png",
		image: "/images/Monsterling_Icons/MonsterlingSpiderGrassland.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DEF +3.75% for 5s upon defeating 10 enemies",
	},
	76: {
		id: 76,
		name: "Sparder",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpiderForest.png",
		image: "/images/Monsterling_Icons/MonsterlingSpiderForest.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "DMG +5% against normal enemies for 5s upon defeating 10 enemies",
	},
	77: {
		id: 77,
		name: "Spardig",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpiderHat.png",
		image: "/images/Monsterling_Icons/MonsterlingSpiderHat.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"DMG +5.25% against normal enemies for 5s upon defeating 10 enemies",
	},
	78: {
		id: 78,
		name: "Spooder",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpiderMountain.png",
		image: "/images/Monsterling_Icons/MonsterlingSpiderMountain.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +5% for 5s upon defeating 10 enemies",
	},
	79: {
		id: 79,
		name: "Spadupa",
		linkChain: {
			name: "Poisoned Claw",
			trigger: ["Using Air Counter"],
			effect: "Launches spider silk at the enemy, dealing Earth DMG.",
			bonusEffects: ["30% Movement Speed Reduction (10s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpadupa.png",
		image: "/images/Monsterling_Icons/MonsterlingSpadupa.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST, SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Earth DMG +5.5% for 10s upon defeating 10 enemies",
	},
	80: {
		id: 80,
		name: "Greenpadupa",
		linkChain: {
			name: "Precious Spider Cocoon",
			trigger: ["Using Air Counter"],
			effect: "Launches spider silk at the enemy, dealing Earth DMG.",
			bonusEffects: ["50% Movement Speed Reduction (10s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpaDupaGreen.png",
		image: "/images/Monsterling_Icons/MonsterlingSpaDupaGreen.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "ATK +2.89% for 10s upon defeating 10 enemies",
	},
	81: {
		id: 81,
		name: "Gargoyle",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGargoyle.png",
		image: "/images/Monsterling_Icons/MonsterlingGargoyle.png",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Target's DEF -3.75% for 5s upon using Air Counter.",
	},
	82: {
		id: 82,
		name: "Grassgoyle",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGargoyleGrassland.png",
		image: "/images/Monsterling_Icons/MonsterlingGargoyleGrassland.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Air Counter Physical DMG +5%",
	},
	83: {
		id: 83,
		name: "Soilgoyle",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingGargoyleMountain.png",
		image: "/images/Monsterling_Icons/MonsterlingGargoyleMountain.png",
		element_id: ELEMENT_ID_BY_ELEMENT.PHYSICAL,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Air Counter Physical DMG +5.25%",
	},
	84: {
		id: 84,
		name: "Sylphid",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphi_Mountain.png",
		image: "/images/Monsterling_Icons/MonsterlingSylphi_Mountain.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Earth DMG +5% against Airborne targets",
	},
	85: {
		id: 85,
		name: "Vamphid",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphiBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingSylphiBlack.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Earth DMG +5.25% against Airborne targets",
	},
	86: {
		id: 86,
		name: "Stickphid",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphiSpear.png",
		image: "/images/Monsterling_Icons/MonsterlingSylphiSpear.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit DMG +5% against Airborne targets",
	},
	87: {
		id: 87,
		name: "Healphid",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphi_Grassland.png",
		image: "/images/Monsterling_Icons/MonsterlingSylphi_Grassland.png",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Ice DMG +5% against Airborne targets",
	},
	88: {
		id: 88,
		name: "Head Stickphid",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphiSpearCaptin.png",
		image: "/images/Monsterling_Icons/MonsterlingSylphiSpearCaptin.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE],
		ability: "Crit Rate +5% against Airborne targets",
	},
	89: {
		id: 89,
		name: "Full Moon Vamphid",
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSylphiSpearCaptinBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingSylphiSpearCaptinBlack.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability: "Crit Rate +5.25% against Airborne targets",
	},
	90: {
		id: 90,
		name: "Ice Fist Dude",
		linkChain: {
			name: "Frozen Gem",
			trigger: ["Using a Special Skill"],
			effect: "Launches ice fragments at the enemy, dealing Ice DMG.",
			bonusEffects: ["Freeze (5s)", "5% Ice RES Reduction (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingStoneguyCrystal.png",
		image: "/images/Monsterling_Icons/MonsterlingStoneguyCrystal.png",
		element_id: ELEMENT_ID_BY_ELEMENT.ICE,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Elemental Weakness Attack Crit Rate +6%",
	},
	91: {
		id: 91,
		name: "Plains Minotaur",
		linkChain: {
			name: "Leather Halter",
			trigger: ["Using a Switch Skill"],
			effect: "Swings its axe and creates a whirlwind, dealing Wind DMG.",
			bonusEffects: ["5% Wind RES Reduction (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingMinotaGrassland.png",
		image: "/images/Monsterling_Icons/MonsterlingMinotaGrassland.png",
		element_id: ELEMENT_ID_BY_ELEMENT.WIND,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.REQUEST],
		ability: "Wind DMG +6% against Staggered boss enemies",
	},
	92: {
		id: 92,
		name: "Spoonmugger",
		linkChain: {
			name: "Ravenous Spoon",
			trigger: ["When all Stamina is consumed"],
			effect: "Cheers nearby allies and restores their Stamina.",
			bonusEffects: ["Restores 40 Stamina"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpoonmugger.png",
		image: "/images/Monsterling_Icons/MonsterlingSpoonmugger.png",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CAPTURE, SOURCE_ID_BY_SOURCE.REQUEST],
		ability:
			"Target's Lightning RES -6% for 5s upon attacking with Elemental Weakness",
	},
	93: {
		id: 93,
		name: "Stickmugger",
		linkChain: {
			name: "Gourmet Chopsticks",
			trigger: ["When all Stamina is consumed"],
			effect: "Cheers nearby allies and restores their Stamina.",
			bonusEffects: ["Restores 80 Stamina"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingSpoonmuggerQueen.png",
		image: "/images/Monsterling_Icons/MonsterlingSpoonmuggerQueen.png",
		element_id: ELEMENT_ID_BY_ELEMENT.LIGHTNING,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Lightning DMG +6.3% for 10s upon attacking with Elemental Weakness",
	},
	94: {
		id: 94,
		name: "Avardan",
		linkChain: {
			name: "Golem's Gem",
			trigger: ["Using a Special Skill", "Landing an Ultimate Skill"],
			effect:
				"Body-slams the enemy, dealing Earth DMG and rendering them Airborne.",
			bonusEffects: [
				"10% Earth RES Reduction (5s)",
				"15% Neutralization RES Reduction (5s)",
			],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAvadanBlack.png",
		image: "/images/Monsterling_Icons/MonsterlingAvadanBlack.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.CONQUEST],
		ability:
			"All teammates' Ultimate Skill DMG +6% for 10s upon being hit by a boss enemy",
	},
	95: {
		id: 95,
		name: "Avardan's Mana",
		linkChain: {
			name: "Shadowed Stone",
			trigger: ["Attacking a Staggered target"],
			effect: "Releases earth energy toward the enemy, dealing Earth DMG.",
			bonusEffects: ["30% Elemental Weakness DMG Boost (5s)"],
		},
		// image:
		// "https://res.cloudinary.com/dfrhytey3/image/upload/v1780895144/msd/Monsterling_Icons/MonsterlingAvadan.png",
		image: "/images/Monsterling_Icons/MonsterlingAvadan.png",
		element_id: ELEMENT_ID_BY_ELEMENT.EARTH,
		region_id: REGION_ID_BY_REGION.SERENIA,
		source_id: [SOURCE_ID_BY_SOURCE.MUTATION],
		ability:
			"Restores 1.89% HP for all teammates upon attacking a Staggered boss enemy",
	},
};
