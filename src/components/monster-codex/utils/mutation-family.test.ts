import { describe, expect, it } from "vitest";
import { getMonsterlingMutationFamily } from "@/components/monster-codex/utils/mutation-family";
import type { MonsterlingMutationRecipe } from "@/data/monsterling-mutations/MONSTERLING_MUTATIONS_DATA";

const recipes = [
	{ result_id: 3, ingredient_ids: [1, 2] },
	{ result_id: 5, ingredient_ids: [3, 4] },
	{ result_id: 9, ingredient_ids: [4, 8] },
	{ result_id: 10, ingredient_ids: [5, 6] },
	{ result_id: 8, ingredient_ids: [6, 7] },
] as const satisfies readonly MonsterlingMutationRecipe[];

describe("getMonsterlingMutationFamily", () => {
	it("returns only the selected Monsterling's ancestors and descendants", () => {
		expect(getMonsterlingMutationFamily(3, recipes)).toEqual({
			monsterlingIds: [3, 1, 2, 5, 4, 10, 6],
			recipes: [recipes[0], recipes[1], recipes[3]],
		});
	});

	it("does not expand unrelated branches from a required co-ingredient", () => {
		const family = getMonsterlingMutationFamily(3, recipes);

		expect(family.monsterlingIds).not.toContain(9);
		expect(family.monsterlingIds).not.toContain(8);
		expect(family.recipes).not.toContain(recipes[2]);
	});

	it("returns an isolated Monsterling without recipes", () => {
		expect(getMonsterlingMutationFamily(11, recipes)).toEqual({
			monsterlingIds: [11],
			recipes: [],
		});
	});
});
