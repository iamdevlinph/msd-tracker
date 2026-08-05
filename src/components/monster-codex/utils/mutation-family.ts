import type { MonsterlingMutationRecipe } from "@/data/monsterling-mutations/MONSTERLING_MUTATIONS_DATA";

export type MonsterlingMutationFamily = {
	monsterlingIds: number[];
	recipes: MonsterlingMutationRecipe[];
};

export const getMonsterlingMutationFamily = (
	monsterlingId: number,
	allRecipes: readonly MonsterlingMutationRecipe[],
): MonsterlingMutationFamily => {
	const monsterlingIds = new Set([monsterlingId]);
	const recipes = new Set<MonsterlingMutationRecipe>();
	const ancestorTargets = new Set([monsterlingId]);
	const descendantLineage = new Set([monsterlingId]);
	let hasNewRelation = true;

	while (hasNewRelation) {
		hasNewRelation = false;
		for (const recipe of allRecipes) {
			if (ancestorTargets.has(recipe.result_id)) {
				if (!recipes.has(recipe)) hasNewRelation = true;
				recipes.add(recipe);
				for (const ingredientId of recipe.ingredient_ids) {
					monsterlingIds.add(ingredientId);
					ancestorTargets.add(ingredientId);
				}
			}

			if (
				recipe.ingredient_ids.some((ingredientId) =>
					descendantLineage.has(ingredientId),
				)
			) {
				if (!recipes.has(recipe)) hasNewRelation = true;
				recipes.add(recipe);
				monsterlingIds.add(recipe.result_id);
				if (!descendantLineage.has(recipe.result_id)) {
					descendantLineage.add(recipe.result_id);
					hasNewRelation = true;
				}
				for (const ingredientId of recipe.ingredient_ids) {
					monsterlingIds.add(ingredientId);
				}
			}
		}
	}

	return {
		monsterlingIds: [...monsterlingIds],
		recipes: allRecipes.filter((recipe) => recipes.has(recipe)),
	};
};
