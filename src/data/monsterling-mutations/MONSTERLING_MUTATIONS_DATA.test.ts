import { describe, expect, it } from "vitest";
import { MONSTERLING_MUTATIONS_DATA } from "@/data/monsterling-mutations/MONSTERLING_MUTATIONS_DATA";
import { SOURCE_ID_BY_SOURCE } from "@/data/monsterling-sources/MONSTERLINGS_SOURCE_DATA";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";

describe("MONSTERLING_MUTATIONS_DATA", () => {
	it("defines one verified recipe for every mutation-source Monsterling", () => {
		const mutationResultIds = Object.values(MONSTERLINGS_DATA)
			.filter(({ source_id }) =>
				source_id.includes(SOURCE_ID_BY_SOURCE.MUTATION),
			)
			.map(({ id }) => id)
			.sort((a, b) => a - b);
		const recipeResultIds = MONSTERLING_MUTATIONS_DATA.map(
			({ result_id }) => result_id,
		).sort((a, b) => a - b);

		expect(recipeResultIds).toEqual(mutationResultIds);
		expect(recipeResultIds).toHaveLength(65);
	});

	it("references valid, unique, acyclic recipes", () => {
		const recipeKeys = new Set<string>();
		const recipesByResultId = new Map<
			number,
			(typeof MONSTERLING_MUTATIONS_DATA)[number]
		>(MONSTERLING_MUTATIONS_DATA.map((recipe) => [recipe.result_id, recipe]));

		for (const recipe of MONSTERLING_MUTATIONS_DATA) {
			expect(MONSTERLINGS_DATA[recipe.result_id]).toBeDefined();
			expect(recipe.ingredient_ids).not.toContain(recipe.result_id);
			for (const ingredientId of recipe.ingredient_ids) {
				expect(MONSTERLINGS_DATA[ingredientId]).toBeDefined();
			}
			const key = `${[...recipe.ingredient_ids].sort((a, b) => a - b).join(":")}=${recipe.result_id}`;
			expect(recipeKeys.has(key)).toBe(false);
			recipeKeys.add(key);
		}

		const visit = (resultId: number, path: Set<number>) => {
			expect(path.has(resultId)).toBe(false);
			const recipe = recipesByResultId.get(resultId);
			if (!recipe) return;
			const nextPath = new Set(path).add(resultId);
			for (const ingredientId of recipe.ingredient_ids) {
				visit(ingredientId, nextPath);
			}
		};
		for (const resultId of recipesByResultId.keys()) visit(resultId, new Set());
	});

	it("includes the verified multi-generation Muwon recipes", () => {
		expect(MONSTERLING_MUTATIONS_DATA).toContainEqual({
			result_id: 151,
			ingredient_ids: [150, 149],
		});
		expect(MONSTERLING_MUTATIONS_DATA).toContainEqual({
			result_id: 165,
			ingredient_ids: [164, 151],
		});
	});
});
