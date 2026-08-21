export type EquipmentSetEffect = { pieces: 2 | 4; effect: string };

export const EQUIPMENT_SET_EFFECTS_DATA = {
	"Glutton's Visage": [
		{ pieces: 2, effect: "Basic Attack DMG +3% upon using a Fire attack." },
	],
	"Sticky Gorger": [{ pieces: 2, effect: "ATK +3%" }],
	"Green Nightmare": [
		{ pieces: 2, effect: "Ice DMG +3% for 2s upon using a Basic Attack." },
		{
			pieces: 4,
			effect:
				"Crit DMG +3% for 5s upon using a Switch Skill on an enemy with Ice Affliction.",
		},
	],
	"Frenzied White Wolf": [
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
	"Stone Heart": [{ pieces: 2, effect: "DEF +3%" }],
	"Mountain Peak Majesty": [
		{
			pieces: 2,
			effect: "Target's Fire RES -3% for 5s upon landing a Tag-out Skill.",
		},
		{
			pieces: 4,
			effect: "Fire DMG +5% upon attacking an enemy with Fire Affliction.",
		},
	],
	"Ice Heart": [
		{ pieces: 2, effect: "Lightning Attack Neutralization DMG +3%" },
	],
	"Assault Squad Leader": [
		{ pieces: 2, effect: "ATK +5% for 5s upon using a Support Skill." },
	],
	"Devourer Stance": [
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
	"Military Officer's Courtesy": [
		{
			pieces: 2,
			effect: "Earth DMG +3% upon landing a critical hit with an Earth attack.",
		},
	],
	"Mystical Jade Odong": [{ pieces: 2, effect: "Max HP +3%" }],
	Moonshadow: [
		{
			pieces: 2,
			effect: "Crit DMG +5% upon attacking an enemy with Fire Affliction.",
		},
		{ pieces: 4, effect: "Fire DMG +5% for 5s when a minion is summoned." },
	],
	"Onsae's Dance": [
		{
			pieces: 2,
			effect: "Crit Rate +5% for 5s upon triggering a Perfect Dodge.",
		},
	],
	"Gisaeng's Glow Up": [
		{ pieces: 2, effect: "Ice DMG +5% for 5s upon using a Special Skill." },
	],
	Arbiter: [
		{ pieces: 2, effect: "Ice DMG +10% for 5s upon using a Switch Skill." },
		{
			pieces: 4,
			effect:
				"Ice DMG +10% for 5s upon attacking an enemy with Ice Affliction.",
		},
	],
	Abyss: [
		{ pieces: 2, effect: "Wind DMG +10% for 5s upon using a Special Skill." },
		{ pieces: 4, effect: "Wind DMG +10% for 5s upon landing a critical hit." },
	],
	"Spirit King": [
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
	"West Wind": [
		{ pieces: 2, effect: "Earth DMG +8% for 3s upon using a Basic Attack." },
		{
			pieces: 4,
			effect:
				"Earth DMG +10% for 5s upon using a Switch Skill on an enemy with Earth Affliction.",
		},
	],
	"Hahnul's Roar": [
		{ pieces: 2, effect: "Fire DMG +10% for 5s upon using an Ultimate Skill." },
		{
			pieces: 4,
			effect: "Crit DMG +10% upon attacking an enemy with Fire Affliction.",
		},
	],
	"Swamp Lord": [
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
	"Gourmand's Grand Banquet": [
		{
			pieces: 2,
			effect: "Target's Fire RES -6% for 5s upon landing a Tag-out Skill",
		},
	],
	"Devourer of the Abyss": [
		{ pieces: 2, effect: "Ice Attack Neutralization DMG +7.5%" },
	],
	"Forest Tyrant": [
		{ pieces: 2, effect: "Ice DMG +7.5% for 3s upon using a Basic Attack" },
		{
			pieces: 4,
			effect:
				"Crit Rate +5% for 5s upon attacking an enemy with Ice Affliction",
		},
	],
	Sirius: [
		{
			pieces: 2,
			effect: "Teammates' Earth DMG +7.5% for 5s upon using a Support Skill",
		},
		{ pieces: 4, effect: "Support DMG +7.5% for 5s upon using a Switch Skill" },
	],
	"Ancient Stone": [
		{ pieces: 2, effect: "Wind Attack Neutralization DMG +7.5%" },
	],
	"Mount Tai's Towering Might": [
		{ pieces: 2, effect: "Crit Rate +5% for 5s upon using Switch Skill" },
		{
			pieces: 4,
			effect: "Lightning DMG +7.5% for 5s upon using a Special Skill",
		},
	],
	"Heart of Eternal Frost": [
		{ pieces: 2, effect: "Lightning attack Stagger DMG +7.5%" },
	],
	"Vanguard of Victory": [
		{
			pieces: 2,
			effect:
				"Target's Elemental Weakness DMG taken +10% for 5s upon attacking an enemy with Earth Affliction",
		},
	],
	"Gourmand Level": [
		{
			pieces: 2,
			effect: "Target's Wind RES -6% for 5s upon landing a Special Skill",
		},
		{
			pieces: 4,
			effect: "Teammates' Crit Rate +6% for 5s upon using a Tag-out Skill",
		},
	],
	"Victorious General's Rites": [
		{ pieces: 2, effect: "Earth Attack Neutralization DMG +7.5%" },
	],
	"Thousand-Year-Old Tree": [
		{
			pieces: 2,
			effect: "Teammates' Fire DMG +7.5% for 5s upon using a Support Skill",
		},
	],
	"Night of a Full Moon": [
		{ pieces: 2, effect: "Fire DMG +7.5% for 5s upon using a Special Skill" },
		{
			pieces: 4,
			effect: "Fire DMG +7.5% upon attacking an enemy with Fire Affliction",
		},
	],
	"Fox Youkai's Fighting Spirit": [
		{
			pieces: 2,
			effect: "Lightning RES -6% for 5s upon using a Tag-out Skill",
		},
	],
	"Blossoms in Full Bloom": [
		{ pieces: 2, effect: "Ice DMG +7.5% for 5s upon using a Special Skill" },
	],
} as const satisfies Record<string, readonly EquipmentSetEffect[]>;

export type EquipmentSetName = keyof typeof EQUIPMENT_SET_EFFECTS_DATA;
