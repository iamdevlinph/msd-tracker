import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";
import { TIER_ID_BY_TIER } from "@/data/tiers/TIERS_DATA";

const EXPECTED_LINK_CHAINS = {
	Amon: "Void's Seed",
	"Amon's Shadow": "Token of Obedience",
	"Ashen Mask": "Ancient Dokkaebi's White Mask",
	Avardan: "Golem's Gem",
	"Avardan's Mana": "Shadowed Stone",
	"Behemo-Wolf": "Giant Wolf's Fang",
	"Big Bro Goblin": "Commanding Flute",
	"Black Hauntstack": "Youkai's Giant Charm",
	"Blue Shadow": "Purple Gem",
	Borborg: "Thorny Shield",
	"Cappy Mama": "Mother's Leaf",
	Cinder: "Hot Furball",
	Custos: "Warden's Core",
	Duoxini: "Dokkaebi King's Mask",
	"El Dorado Guardian": "Mutated Spirit Core",
	"Empress Slime": "Queen's Mascara",
	Fiend: "Ancient Dokkaebi's Bat",
	Forkmugger: "Gluttonous Fork",
	Frostbite: "Giant Wolf's Helm",
	Goald: "Gold-Plated Spiky Shield",
	"Gold Digger Moley Mole": "Mole's Treasure",
	"Golden Fist Dude": "Golden Heart",
	Gorrik: "Taskmaster's Leather Gloves",
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
	"Moley Mole": "Mole's Shovel",
	"Moon Shadow Lupe": "Moonlight-Touched Claw",
	Mountaintaur: "Bloodstained Bridle",
	Nokjung: "Black Antler",
	Odong: "Mysterious Branch",
	Onsae: "Flaming Fox Fur",
	"Phantom Snow Tiger": "Cold Mane",
	"Phantom Stone Tiger": "Mystic Stone Horn",
	"Plains Minotaur": "Leather Halter",
	"Queen Slime": "Queen's Crown",
	"Red Shadow": "Red Gem",
	Reginula: "Star Waves",
	"Ring Slime": "Wet Leaf",
	"Rock Fist Dude": "Frangible Pebble",
	Scar: "Void's Crimson Bead",
	"Scarlet Queen": "Queen's Crimson Tears",
	Shademask: "Dokkaebi Mask",
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
};

describe("MONSTERLINGS_DATA", () => {
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
