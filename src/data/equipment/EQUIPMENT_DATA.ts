import { TIER_ID_BY_TIER, type TierId } from "@/data/tiers/TIERS_DATA";

export const EQUIPMENT_PART_TYPES = [
	"headgear",
	"chestpiece",
	"gloves",
	"footwear",
] as const;
export type EquipmentPartType = (typeof EQUIPMENT_PART_TYPES)[number];
export type EquipmentId = number;
export type EquipmentSetEffect = { pieces: 2 | 4; effect: string };
export type Equipment = {
	id: EquipmentId;
	name: string;
	image: string;
	tier_id: TierId;
	part_type: EquipmentPartType;
	set_name: string;
	set_effects: readonly EquipmentSetEffect[];
};

type EquipmentPiece = readonly [
	id: EquipmentId,
	name: string,
	part_type: EquipmentPartType,
	image: string,
];
type EquipmentSet = {
	set_name: string;
	tier_id: TierId;
	set_effects: readonly EquipmentSetEffect[];
	pieces: readonly EquipmentPiece[];
};

const choice = (
	set_name: string,
	set_effects: EquipmentSet["set_effects"],
	pieces: EquipmentSet["pieces"],
): EquipmentSet => ({
	set_name,
	tier_id: TIER_ID_BY_TIER.CHOICE_4,
	set_effects,
	pieces,
});
const prime = (
	firstId: EquipmentId,
	set_name: string,
	set_effects: EquipmentSet["set_effects"],
	file: string,
	names: readonly [string, string, string, string],
	fileSuffix = "",
): EquipmentSet => ({
	set_name,
	tier_id: TIER_ID_BY_TIER.PRIME_5,
	set_effects,
	pieces: EQUIPMENT_PART_TYPES.map((part_type, index) => [
		firstId + index,
		names[index],
		part_type,
		`${file}_${["H", "C", "G", "S"][index]}${fileSuffix}`,
	]),
});

const EQUIPMENT_SETS = [
	choice(
		"Glutton's Visage",
		[{ pieces: 2, effect: "Basic Attack DMG +3% upon using a Fire attack." }],
		[
			[1, "Glutton's Hat", "headgear", "EQUIP_HAT_005"],
			[2, "Glutton's Apron", "chestpiece", "EQUIP_COAT_004"],
		],
	),
	choice(
		"Sticky Gorger",
		[{ pieces: 2, effect: "ATK +3%" }],
		[
			[3, "Gooey Gloves", "gloves", "EQUIP_SET_002_G"],
			[4, "Gooey Shoes", "footwear", "EQUIP_SET_002_S"],
		],
	),
	choice(
		"Green Nightmare",
		[
			{ pieces: 2, effect: "Ice DMG +3% for 2s upon using a Basic Attack." },
			{
				pieces: 4,
				effect:
					"Crit DMG +3% for 5s upon using a Switch Skill on an enemy with Ice Affliction.",
			},
		],
		[
			[5, "Green Nightmare Helm", "headgear", "EQUIP_SET_009_H"],
			[6, "Green Nightmare Armor", "chestpiece", "EQUIP_SET_009_C"],
			[7, "Green Nightmare Gauntlets", "gloves", "EQUIP_SET_009_G"],
			[8, "Green Nightmare Boots", "footwear", "EQUIP_SET_009_S"],
		],
	),
	choice(
		"Frenzied White Wolf",
		[
			{
				pieces: 2,
				effect: "Teammates' DEF +3% for 5s upon using a Support Skill.",
			},
			{
				pieces: 4,
				effect:
					"Target's Elemental Weakness DMG taken +2% for 5s upon attacking an enemy with Earth Affliction.",
			},
		],
		[
			[9, "Frenzied Wolf's Mask", "headgear", "EQUIP_SET_010_H"],
			[10, "Frenzied Wolf's Restraints", "chestpiece", "EQUIP_COAT_04"],
			[11, "Frenzied Wolf's Claws", "gloves", "EQUIP_SET_010_G"],
			[12, "Frenzied Wolf's Sprinters", "footwear", "EQUIP_SET_010_S"],
		],
	),
	choice(
		"Stone Heart",
		[{ pieces: 2, effect: "DEF +3%" }],
		[
			[13, "Stone Mask", "headgear", "EQUIP_HAT_010"],
			[14, "Stone Sandals", "footwear", "EQUIP_SHOES_009"],
		],
	),
	choice(
		"Mountain Peak Majesty",
		[
			{
				pieces: 2,
				effect: "Target's Fire RES -3% for 5s upon landing a Tag-out Skill.",
			},
			{
				pieces: 4,
				effect: "Fire DMG +5% upon attacking an enemy with Fire Affliction.",
			},
		],
		[
			[15, "Mountain Peak Helm", "headgear", "EQUIP_HAT_009"],
			[16, "Mountain Peak Iron Armor", "chestpiece", "EQUIP_COAT_008"],
			[17, "Mountain Peak Gloves", "gloves", "EQUIP_GLOVES_009"],
			[18, "Mountain Peak Marching Boots", "footwear", "EQUIP_SHOES_008"],
		],
	),
	choice(
		"Ice Heart",
		[{ pieces: 2, effect: "Lightning Attack Neutralization DMG +3%" }],
		[
			[19, "Frozen Crown", "headgear", "EQUIP_HAT_012"],
			[20, "Touch of Frost", "gloves", "EQUIP_GLOVES_017"],
		],
	),
	choice(
		"Assault Squad Leader",
		[{ pieces: 2, effect: "ATK +5% for 5s upon using a Support Skill." }],
		[
			[21, "Assault Squad Buff Coat", "chestpiece", "EQUIP_COAT_012"],
			[22, "Assault Squad Leather Boots", "footwear", "EQUIP_SHOES_011"],
		],
	),
	choice(
		"Devourer Stance",
		[
			{
				pieces: 2,
				effect: "Wind DMG +5% upon attacking an enemy with Wind Affliction.",
			},
			{
				pieces: 4,
				effect:
					"Teammates' Crit Rate +3% for 5s upon using a Support Skill. Crit DMG +10% for 5s upon using a Tag-out Skill.",
			},
		],
		[
			[23, "Devourer's Hat", "headgear", "EQUIP_HAT_013"],
			[24, "Devourer's Apron", "chestpiece", "EQUIP_COAT_011"],
			[25, "Devourer's Gloves", "gloves", "EQUIP_GLOVES_013"],
			[26, "Devourer's Sandals", "footwear", "EQUIP_SHOES_010"],
		],
	),
	choice(
		"Military Officer's Courtesy",
		[
			{
				pieces: 2,
				effect:
					"Earth DMG +3% upon landing a critical hit with an Earth attack.",
			},
		],
		[
			[27, "Gilded Armguards", "gloves", "EQUIP_GLOVES_015"],
			[28, "Gilded Greaves", "footwear", "EQUIP_SHOES_01"],
		],
	),
	choice(
		"Mystical Jade Odong",
		[{ pieces: 2, effect: "Max HP +3%" }],
		[
			[29, "Jade Odong Hat", "headgear", "EQUIP_HAT_015"],
			[30, "Jade Odong Brigandine", "chestpiece", "EQUIP_COAT_015"],
		],
	),
	choice(
		"Moonshadow",
		[
			{
				pieces: 2,
				effect: "Crit DMG +5% upon attacking an enemy with Fire Affliction.",
			},
			{ pieces: 4, effect: "Fire DMG +5% for 5s when a minion is summoned." },
		],
		[
			[31, "Eunwol's Antlers", "headgear", "EQUIP_HAT_017"],
			[32, "Moonlight Clothes", "chestpiece", "EQUIP_COAT_017"],
			[33, "Sage's Touch", "gloves", "EQUIP_GLOVES_014"],
			[34, "Shadow Hooves", "footwear", "EQUIP_SHOES_017"],
		],
	),
	choice(
		"Onsae's Dance",
		[
			{
				pieces: 2,
				effect: "Crit Rate +5% for 5s upon triggering a Perfect Dodge.",
			},
		],
		[
			[35, "Mad Fox's Fur Gloves", "gloves", "EQUIP_GLOVES_012"],
			[36, "Mad Fox's Paws", "footwear", "EQUIP_SHOES_03"],
		],
	),
	choice(
		"Gisaeng's Glow Up",
		[{ pieces: 2, effect: "Ice DMG +5% for 5s upon using a Special Skill." }],
		[
			[37, "Gisaeng's Glow Up Headgear", "headgear", "EQUIP_SET_CHEAH_H_001"],
			[38, "Gisaeng's Glow Up Footwear", "footwear", "EQUIP_SET_CHEAH_S_001"],
		],
	),
	prime(
		39,
		"Arbiter",
		[
			{ pieces: 2, effect: "Ice DMG +10% for 5s upon using a Switch Skill." },
			{
				pieces: 4,
				effect:
					"Ice DMG +10% for 5s upon attacking an enemy with Ice Affliction.",
			},
		],
		"EQUIP_SET_102",
		[
			"Warden Helmet",
			"Arbiter of Nature",
			"Magic Vine Gloves",
			"Root's Footprints",
		],
	),
	prime(
		43,
		"Abyss",
		[
			{ pieces: 2, effect: "Wind DMG +10% for 5s upon using a Special Skill." },
			{
				pieces: 4,
				effect: "Wind DMG +10% for 5s upon landing a critical hit.",
			},
		],
		"EQUIP_SET_103",
		[
			"Corrupted Soul Helmet",
			"Ominous Sculpture",
			"Abyssal Touch",
			"Lord of the Void's Greaves",
		],
	),
	prime(
		47,
		"Spirit King",
		[
			{
				pieces: 2,
				effect: "Lightning DMG +8% for 3s upon using a Basic Attack.",
			},
			{
				pieces: 4,
				effect:
					"Lightning DMG +10% upon attacking an enemy with Lightning Affliction.",
			},
		],
		"EQUIP_SET_101",
		[
			"Spirit King's Coronet",
			"Spirit Barrier",
			"Sacred Grasp",
			"Spirit Rock Boots",
		],
	),
	prime(
		51,
		"West Wind",
		[
			{ pieces: 2, effect: "Earth DMG +8% for 3s upon using a Basic Attack." },
			{
				pieces: 4,
				effect:
					"Earth DMG +10% for 5s upon using a Switch Skill on an enemy with Earth Affliction.",
			},
		],
		"EQUIP_SET_104",
		[
			"Eerie Horned Helmet",
			"Avenger's Prayer Beads",
			"Avenger's Gauntlet",
			"Breeze Walkers",
		],
	),
	prime(
		55,
		"Hahnul's Roar",
		[
			{
				pieces: 2,
				effect: "Fire DMG +10% for 5s upon using an Ultimate Skill.",
			},
			{
				pieces: 4,
				effect: "Crit DMG +10% upon attacking an enemy with Fire Affliction.",
			},
		],
		"EQUIP_SET_105",
		[
			"Fierce Tiger's Valor",
			"Tiger Leather Armor",
			"Beast Claws",
			"Beastly Footprints",
		],
	),
	prime(
		59,
		"Swamp Lord",
		[
			{
				pieces: 2,
				effect: "Teammates' Ice DMG +5% for 5s upon granting a Shield.",
			},
			{
				pieces: 4,
				effect:
					"Elemental Weakness DMG taken by target +10% for 5s upon attacking an enemy inflicted with Ice Affliction and Stagger.",
			},
		],
		"EQUIP_SET_WETLANDMASTER",
		[
			"Swamp Lord Headgear",
			"Swamp Lord Chestpiece",
			"Swamp Lord Gloves",
			"Swamp Lord Footwear",
		],
		"_001",
	),
] as const satisfies readonly EquipmentSet[];

const equipment = EQUIPMENT_SETS.flatMap((set) =>
	set.pieces.map(([id, name, part_type, image]) => ({
		id,
		name,
		part_type,
		image: `/images/Equipment/${image}.webp`,
		tier_id: set.tier_id,
		set_name: set.set_name,
		set_effects: set.set_effects,
	})),
);

export const EQUIPMENT_DATA = Object.fromEntries(
	equipment.map((item) => [item.id, item]),
) as Record<EquipmentId, Equipment>;
