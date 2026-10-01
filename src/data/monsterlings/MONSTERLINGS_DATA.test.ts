import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { REGION_ID_BY_REGION } from "@/data/regions/REGIONS_DATA";
import { TIER_ID_BY_TIER } from "@/data/tiers/TIERS_DATA";

const EXPECTED_LINK_CHAINS = {
	Amon: "Void's Seed",
	"Amon's Shadow": "Token of Obedience",
	"Ashen Mask": "Ancient Dokkaebi's White Mask",
	"Altus Raptor": "Altus Raptor",
	Avardan: "Golem's Gem",
	"Avardan's Mana": "Shadowed Stone",
	"Behemo-Wolf": "Giant Wolf's Fang",
	"Big Bro Goblin": "Commanding Flute",
	"Black Hauntstack": "Youkai's Giant Charm",
	"Blue Shadow": "Purple Gem",
	Borborg: "Thorny Shield",
	"Cappy Mama": "Mother's Leaf",
	Cinder: "Hot Furball",
	"Clean Horde": "Clean Horde",
	Colossus: "Colossus",
	"Colossus Alter": "Colossus Alter",
	Custos: "Warden's Core",
	Duoxini: "Dokkaebi King's Mask",
	"El Dorado Guardian": "Mutated Spirit Core",
	"Empress Slime": "Queen's Mascara",
	Fiend: "Ancient Dokkaebi's Bat",
	"Fidelis Raptor": "Fidelis Raptor",
	Forkmugger: "Gluttonous Fork",
	Frostbite: "Giant Wolf's Helm",
	Goald: "Gold-Plated Spiky Shield",
	"Gold Digger Moley Mole": "Mole's Treasure",
	"Golden Fist Dude": "Golden Heart",
	Gorrik: "Taskmaster's Leather Gloves",
	Garbinator: "Garbinator",
	"Green Cappy Bro": "Mushroom Man's Pouch",
	"Green Cappy Papa": "Green Swaddle",
	Greenpadupa: "Precious Spider Cocoon",
	Gulgak: "Cursed Rosary",
	Hahnul: "Giant Tiger's Claw",
	"Ice Fist Dude": "Frozen Gem",
	Irontoise: "Turtle's Stone Hammer",
	"King Slime": "Gooey Crown",
	"Leafy Mama": "Queenshroom's Halo",
	Lupe: "Warrior's Mark",
	Manwol: "Shining Hoof",
	"Maple Odong": "Autumn Branch",
	Macrodon: "Macrodon",
	"Moley Mole": "Mole's Shovel",
	"Moon Shadow Lupe": "Moonlight-Touched Claw",
	Mountaintaur: "Bloodstained Bridle",
	Nagi: "Nagi",
	Nokjung: "Black Antler",
	Odong: "Mysterious Branch",
	Onsae: "Flaming Fox Fur",
	"Phantom Snow Tiger": "Cold Mane",
	"Phantom Stone Tiger": "Mystic Stone Horn",
	"Plains Minotaur": "Leather Halter",
	"Queen Slime": "Queen's Crown",
	Ragnadon: "Ragnadon",
	"Red Shadow": "Red Gem",
	Reginula: "Star Waves",
	"Ring Slime": "Wet Leaf",
	"Rock Fist Dude": "Frangible Pebble",
	"Scrap Hoarder": "Scrap Hoarder",
	Scar: "Void's Crimson Bead",
	"Scarlet Queen": "Queen's Crimson Tears",
	Shademask: "Dokkaebi Mask",
	Silbinator: "Silbinator",
	Sorin: "Sorin",
	Spadupa: "Poisoned Claw",
	Spoonmugger: "Ravenous Spoon",
	Stickmugger: "Gourmet Chopsticks",
	"Swamp Odong": "Fabric Talismans",
	Taglock: "Broken Fang",
	Tealtaur: "Weathered Hoof",
	"Toad-alee": "Ornate Shield",
	Treetoise: "Tree Tortoiseshell",
	"Uncle Cappy": "Mushroom Basket",
	Urgash: "Destroyer's Horn",
	Vectus: "Void's Balance",
	"White Wolf Fulminator": "Shaman's Staff",
	Whitelon: "Whitelon",
	"The Great Unknown": "The Great Unknown",
	Oblivion: "Oblivion",
};

const EXPECTED_NEW_LINK_CHAIN_METADATA = {
	Custos: {
		unlock_level: 9,
		sort_order: 1,
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	Nagi: { unlock_level: 9, sort_order: 2, tier_id: TIER_ID_BY_TIER.CHOICE_4 },
	"Moon Shadow Lupe": {
		unlock_level: 9,
		sort_order: 3,
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	Avardan: {
		unlock_level: 20,
		sort_order: 1,
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	Reginula: {
		unlock_level: 20,
		sort_order: 2,
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	Sorin: {
		unlock_level: 20,
		sort_order: 3,
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	Colossus: {
		unlock_level: 31,
		sort_order: 1,
		tier_id: TIER_ID_BY_TIER.SELECT_3,
	},
	"Scrap Hoarder": {
		unlock_level: 31,
		sort_order: 2,
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	"Blue Shadow": {
		unlock_level: 31,
		sort_order: 3,
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	Garbinator: {
		unlock_level: 32,
		sort_order: 1,
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	"Colossus Alter": {
		unlock_level: 32,
		sort_order: 2,
		tier_id: TIER_ID_BY_TIER.SELECT_3,
	},
	"Clean Horde": {
		unlock_level: 32,
		sort_order: 3,
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	Macrodon: {
		unlock_level: 33,
		sort_order: 1,
		tier_id: TIER_ID_BY_TIER.SELECT_3,
	},
	Ragnadon: {
		unlock_level: 33,
		sort_order: 2,
		tier_id: TIER_ID_BY_TIER.SELECT_3,
	},
	Silbinator: {
		unlock_level: 33,
		sort_order: 3,
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	"Fidelis Raptor": {
		unlock_level: 34,
		sort_order: 1,
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	"The Great Unknown": {
		unlock_level: 34,
		sort_order: 2,
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
	Whitelon: {
		unlock_level: 34,
		sort_order: 3,
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	"Altus Raptor": {
		unlock_level: 34,
		sort_order: 4,
		tier_id: TIER_ID_BY_TIER.CHOICE_4,
	},
	Oblivion: {
		unlock_level: 35,
		sort_order: 1,
		tier_id: TIER_ID_BY_TIER.PRIME_5,
	},
} as const;

describe("MONSTERLINGS_DATA", () => {
	it("includes Sorin as Legendary Monsterling No. 2", () => {
		expect(MONSTERLINGS_DATA[100_002]).toMatchObject({
			id: 100_002,
			display_id: 2,
			name: "Sorin",
			image: "/images/Monsterling_Icons/MonsterlingSorin.webp",
			region_id: REGION_ID_BY_REGION.LEGENDARY,
		});
	});

	it("defines a published ability for every numbered Codex Monsterling", () => {
		for (const monsterling of Object.values(MONSTERLINGS_DATA)) {
			if (monsterling.id > 165) continue;
			expect(monsterling.ability.trim()).not.toBe("");
		}
	});

	it("defines the verified Link Chain roster", () => {
		const linkChainsByMonsterling = Object.fromEntries(
			Object.values(MONSTERLINGS_DATA)
				.filter(({ linkChain }) => linkChain?.name)
				.map(({ name, linkChain }) => [name, linkChain?.name]),
		);

		expect(linkChainsByMonsterling).toEqual(EXPECTED_LINK_CHAINS);
		expect(MONSTERLINGS_DATA[1].linkChain).toBeUndefined();
		expect(MONSTERLINGS_DATA[200_001].linkChain).toBeUndefined();
	});

	it("defines the upcoming Link Chain metadata and order", () => {
		const actualMetadata = Object.fromEntries(
			Object.keys(EXPECTED_NEW_LINK_CHAIN_METADATA).map((name) => {
				const monsterling = Object.values(MONSTERLINGS_DATA).find(
					({ name: monsterlingName }) => monsterlingName === name,
				);

				const linkChain = monsterling?.linkChain;
				return [
					name,
					linkChain && {
						unlock_level: linkChain.unlock_level,
						sort_order: linkChain.sort_order,
						tier_id: linkChain.tier_id,
					},
				];
			}),
		);

		expect(actualMetadata).toEqual(
			Object.fromEntries(Object.entries(EXPECTED_NEW_LINK_CHAIN_METADATA)),
		);
	});

	it("marks deferred upcoming Link Chain details explicitly", () => {
		for (const name of Object.keys(EXPECTED_NEW_LINK_CHAIN_METADATA)) {
			if (
				name === "Avardan" ||
				name === "Blue Shadow" ||
				name === "Custos" ||
				name === "Moon Shadow Lupe" ||
				name === "Reginula"
			)
				continue;

			const monsterling = Object.values(MONSTERLINGS_DATA).find(
				({ name: monsterlingName }) => monsterlingName === name,
			);

			expect(monsterling?.linkChain).toMatchObject({
				trigger: ["Details pending"],
				effect: "Details pending",
			});
			expect(monsterling?.linkChain?.bonusEffects).toBeUndefined();
		}
	});

	it("defines triggers and effects for every Link Chain", () => {
		for (const { linkChain } of Object.values(MONSTERLINGS_DATA)) {
			if (!linkChain) continue;

			expect(linkChain.trigger.length).toBeGreaterThan(0);
			expect(linkChain.trigger.every(Boolean)).toBe(true);
			expect(linkChain.effect).not.toBe("");
			expect(linkChain.bonusEffects?.every(Boolean) ?? true).toBe(true);
		}
	});

	it("defines a valid tier for every Link Chain", () => {
		const validTierIds = Object.values(TIER_ID_BY_TIER);

		for (const { linkChain } of Object.values(MONSTERLINGS_DATA)) {
			if (!linkChain) continue;

			expect(validTierIds).toContain(linkChain.tier_id);
		}
	});

	it("defines a positive integer unlock level for every Link Chain", () => {
		for (const { linkChain } of Object.values(MONSTERLINGS_DATA)) {
			if (!linkChain) continue;

			expect(Number.isInteger(linkChain.unlock_level)).toBe(true);
			expect(linkChain.unlock_level).toBeGreaterThan(0);
		}
	});

	it("defines positive integer Link Chain sort orders when present", () => {
		for (const { linkChain } of Object.values(MONSTERLINGS_DATA)) {
			if (linkChain?.sort_order === undefined) continue;

			expect(Number.isInteger(linkChain.sort_order)).toBe(true);
			expect(linkChain.sort_order).toBeGreaterThan(0);
		}
	});

	it("uses existing WebP images for every coordinated shard", () => {
		for (const monsterling of Object.values(MONSTERLINGS_DATA)) {
			expect(monsterling.image).toMatch(/^\/images\/.+\.webp$/);
			expect(existsSync(resolve("public", monsterling.image.slice(1)))).toBe(
				true,
			);
		}
	});
});
