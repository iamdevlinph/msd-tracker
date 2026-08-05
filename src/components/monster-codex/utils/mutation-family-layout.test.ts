import { describe, expect, it } from "vitest";
import type { MonsterlingMutationFamily } from "@/components/monster-codex/utils/mutation-family";
import {
	getMutationFamilyLayout,
	MUTATION_COLUMN_GAP,
	MUTATION_NODE_WIDTH,
} from "@/components/monster-codex/utils/mutation-family-layout";

describe("getMutationFamilyLayout", () => {
	it("keeps a paired ingredient row aligned and centers its result", () => {
		const family: MonsterlingMutationFamily = {
			monsterlingIds: [130, 133, 131, 143, 144],
			recipes: [
				{ result_id: 131, ingredient_ids: [130, 133] },
				{ result_id: 144, ingredient_ids: [131, 143] },
			],
		};
		const { positionById } = getMutationFamilyLayout(family);
		const hahnul = positionById.get(143);
		const goald = positionById.get(131);
		const gulgak = positionById.get(144);
		if (!hahnul || !goald || !gulgak) throw new Error("missing layout node");

		expect(hahnul.y).toBe(goald.y);
		expect(gulgak.x + 56).toBe((hahnul.x + 56 + goald.x + 56) / 2);
		expect(gulgak.y).toBeLessThan(goald.y);
	});

	it("keeps nested branches separated while centering each parent", () => {
		const family: MonsterlingMutationFamily = {
			monsterlingIds: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			recipes: [
				{ result_id: 3, ingredient_ids: [1, 2] },
				{ result_id: 6, ingredient_ids: [4, 5] },
				{ result_id: 7, ingredient_ids: [3, 6] },
				{ result_id: 8, ingredient_ids: [7, 9] },
			],
		};
		const { positionById } = getMutationFamilyLayout(family);

		for (const recipe of family.recipes) {
			const result = positionById.get(recipe.result_id);
			const left = positionById.get(recipe.ingredient_ids[0]);
			const right = positionById.get(recipe.ingredient_ids[1]);
			if (!result || !left || !right) throw new Error("missing layout node");

			expect(left.y).toBe(right.y);
			expect(result.x + 56).toBe((left.x + 56 + right.x + 56) / 2);
			expect(result.y).toBeLessThan(left.y);
		}
	});

	it("reserves space for the unbalanced Avardan's Mana chain", () => {
		const family: MonsterlingMutationFamily = {
			monsterlingIds: [95, 94, 24, 23, 2, 1, 32],
			recipes: [
				{ result_id: 2, ingredient_ids: [1, 32] },
				{ result_id: 24, ingredient_ids: [23, 2] },
				{ result_id: 95, ingredient_ids: [94, 24] },
			],
		};
		const { positionById } = getMutationFamilyLayout(family);

		for (const recipe of family.recipes) {
			const result = positionById.get(recipe.result_id);
			const ingredients = recipe.ingredient_ids.map((id) =>
				positionById.get(id),
			);
			if (!result || ingredients.some((position) => !position)) {
				throw new Error("missing layout node");
			}
			expect(ingredients[0]?.y).toBe(ingredients[1]?.y);
			expect(result.x + MUTATION_NODE_WIDTH / 2).toBe(
				ingredients.reduce(
					(sum, position) => sum + (position?.x ?? 0) + MUTATION_NODE_WIDTH / 2,
					0,
				) / ingredients.length,
			);
		}

		const positionsByRow = new Map<number, { x: number; y: number }[]>();
		for (const id of family.monsterlingIds) {
			const position = positionById.get(id);
			if (!position) continue;
			positionsByRow.set(position.y, [
				...(positionsByRow.get(position.y) ?? []),
				position,
			]);
		}
		for (const row of positionsByRow.values()) {
			row.sort((left, right) => left.x - right.x);
			for (let index = 1; index < row.length; index += 1) {
				expect(row[index].x).toBeGreaterThanOrEqual(
					row[index - 1].x + MUTATION_NODE_WIDTH + MUTATION_COLUMN_GAP,
				);
			}
		}
	});

	it("duplicates shared ingredients with deterministic occurrence keys", () => {
		const family: MonsterlingMutationFamily = {
			monsterlingIds: [110, 114, 111, 115],
			recipes: [
				{ result_id: 111, ingredient_ids: [110, 114] },
				{ result_id: 115, ingredient_ids: [114, 111] },
			],
		};
		const layout = getMutationFamilyLayout(family);
		const shared = layout.occurrences.filter(
			(occurrence) => occurrence.monsterlingId === 114,
		);
		expect(shared).toHaveLength(2);
		expect(new Set(shared.map(({ key }) => key)).size).toBe(2);
		for (const connection of layout.recipeConnections) {
			const result = layout.occurrences.find(
				(occurrence) => occurrence.key === connection.resultKey,
			);
			const ingredients = connection.ingredientKeys.map((key) =>
				layout.occurrences.find((occurrence) => occurrence.key === key),
			);
			if (!result || ingredients.some((ingredient) => !ingredient)) {
				throw new Error("missing occurrence");
			}
			expect(ingredients[0]?.y).toBe(ingredients[1]?.y);
			expect(result.y).toBeLessThan(ingredients[0]?.y ?? 0);
			expect(result.x + MUTATION_NODE_WIDTH / 2).toBe(
				((ingredients[0]?.x ?? 0) +
					MUTATION_NODE_WIDTH / 2 +
					(ingredients[1]?.x ?? 0) +
					MUTATION_NODE_WIDTH / 2) /
					2,
			);
		}
	});
});
