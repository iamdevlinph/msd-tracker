import { describe, expect, it } from "vitest";
import { getEquippedCharacterUsage } from "./equipped-character-usage";

const character = (id: number, name: string, variant?: "Summer Dive!") => ({
	id,
	name,
	portraitImage: `/character-${id}.webp`,
	class_id: 1 as const,
	element_id: 1 as const,
	fullImage: `/character-${id}-full.webp`,
	tier_id: 4 as const,
	...(variant ? { variant } : {}),
});

describe("getEquippedCharacterUsage", () => {
	it("matches exact regular, legendary, and artifact owned instances", () => {
		const characters = {
			1: {
				...character(1, "Zoe"),
				costumes: [
					{ id: 1, name: "Costume 1", portraitImage: "/costume.webp" },
				],
			},
			2: character(2, "Angel"),
		};
		const usage = getEquippedCharacterUsage(
			{
				live: {
					characters: [
						{
							characterId: 1,
							monsterlingIds: ["regular", "unused", null],
							legendaryMonsterlingId: "legendary",
							artifactInstanceId: "artifact-a",
						},
						{
							characterId: 2,
							monsterlingIds: [null, null, null],
							legendaryMonsterlingId: null,
							artifactInstanceId: "artifact-b",
						},
					],
				},
			},
			characters,
			{
				monsterlingInstanceIds: ["regular", "legendary", "unused"],
				artifactInstanceIds: ["artifact-a", "artifact-b"],
				charactersOwned: { 1: { costume_id: 1 } },
			},
		);

		expect(usage.monsterlings.regular.map(({ id }) => id)).toEqual([1]);
		expect(usage.monsterlings.legendary.map(({ id }) => id)).toEqual([1]);
		expect(usage.monsterlings.unused.map(({ id }) => id)).toEqual([1]);
		expect(usage.artifacts["artifact-a"].map(({ id }) => id)).toEqual([1]);
		expect(usage.artifacts["artifact-b"].map(({ id }) => id)).toEqual([2]);
		expect(usage.artifacts["artifact-a"][0].portraitImage).toBe(
			"/costume.webp",
		);
	});

	it("deduplicates by character ID, sorts display names, and ignores bad references", () => {
		const characters = {
			1: character(1, "Francis", "Summer Dive!"),
			2: character(2, "Angel"),
			3: character(3, "Francis"),
		};
		const usage = getEquippedCharacterUsage(
			{
				live: {
					characters: [
						{
							characterId: 1,
							monsterlingIds: ["copy", "copy", null],
							legendaryMonsterlingId: "copy",
							artifactInstanceId: "copy-artifact",
						},
						{
							characterId: 2,
							monsterlingIds: ["copy", null, null],
							legendaryMonsterlingId: null,
							artifactInstanceId: "copy-artifact",
						},
						{
							characterId: 3,
							monsterlingIds: ["dangling", null, null],
							legendaryMonsterlingId: null,
							artifactInstanceId: null,
						},
						{
							characterId: 999,
							monsterlingIds: ["copy", null, null],
							legendaryMonsterlingId: null,
							artifactInstanceId: null,
						},
					],
				},
			},
			characters,
			{
				monsterlingInstanceIds: ["copy"],
				artifactInstanceIds: ["copy-artifact"],
			},
		);

		expect(
			usage.monsterlings.copy.map(({ id, name, variant }) => ({
				id,
				name,
				variant,
			})),
		).toEqual([
			{ id: 2, name: "Angel", variant: undefined },
			{ id: 1, name: "Francis", variant: "Summer Dive!" },
		]);
		expect(usage.monsterlings.dangling).toBeUndefined();
		expect(usage.artifacts["copy-artifact"]).toHaveLength(2);
		expect(usage.monsterlings.unknown).toBeUndefined();
	});
});
