import type { MonsterlingMutationFamily } from "@/components/monster-codex/utils/mutation-family";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";

export const MUTATION_NODE_WIDTH = 112;
export const MUTATION_NODE_HEIGHT = 104;
export const MUTATION_COLUMN_GAP = 32;
export const MUTATION_ROW_GAP = 96;
export const MUTATION_PADDING = 24;

export type MutationFamilyLayout = {
	positionById: Map<number, { x: number; y: number }>;
	width: number;
	height: number;
};

/**
 * Lays out each recipe as a reserved subtree. A subtree's width includes all
 * of its descendants, so centering a parent cannot pull it over a neighboring
 * branch (which is especially important for the Avardan's Mana chain).
 */
export const getMutationFamilyLayout = (
	family: MonsterlingMutationFamily,
): MutationFamilyLayout => {
	const parentById = new Map(family.monsterlingIds.map((id) => [id, id]));
	const find = (id: number): number => {
		const parent = parentById.get(id) ?? id;
		if (parent === id) return id;
		const root = find(parent);
		parentById.set(id, root);
		return root;
	};
	const union = (left: number, right: number) => {
		const leftRoot = find(left);
		const rightRoot = find(right);
		if (leftRoot !== rightRoot) parentById.set(rightRoot, leftRoot);
	};

	for (const recipe of family.recipes) {
		union(recipe.ingredient_ids[0], recipe.ingredient_ids[1]);
	}

	const componentById = new Map(
		family.monsterlingIds.map((id) => [id, find(id)]),
	);
	const components = new Set(componentById.values());
	const depthByComponent = new Map([...components].map((id) => [id, 0]));

	// Longest-path levels preserve the reversed hierarchy while pair unions
	// guarantee both direct ingredients occupy the same row.
	for (let pass = 0; pass < components.size; pass += 1) {
		let changed = false;
		for (const recipe of family.recipes) {
			const resultComponent = componentById.get(recipe.result_id);
			const ingredientComponent = componentById.get(recipe.ingredient_ids[0]);
			if (resultComponent === undefined || ingredientComponent === undefined) {
				continue;
			}
			const nextDepth = (depthByComponent.get(ingredientComponent) ?? 0) + 1;
			if (nextDepth > (depthByComponent.get(resultComponent) ?? 0)) {
				depthByComponent.set(resultComponent, nextDepth);
				changed = true;
			}
		}
		if (!changed) break;
	}

	const positionById = new Map<number, { x: number; y: number }>();
	const rows = new Map<number, number[]>();
	for (const id of family.monsterlingIds) {
		const component = componentById.get(id);
		const depth = depthByComponent.get(component ?? id) ?? 0;
		rows.set(depth, [...(rows.get(depth) ?? []), id]);
	}
	for (const ids of rows.values()) {
		ids.sort(
			(a, b) =>
				(MONSTERLINGS_DATA[a]?.display_id ?? a) -
				(MONSTERLINGS_DATA[b]?.display_id ?? b),
		);
	}
	const maxDepth = Math.max(0, ...rows.keys());

	type Subtree = {
		width: number;
		positions: Map<number, number>;
	};
	const recipeByResult = new Map(
		family.recipes.map((recipe) => [recipe.result_id, recipe]),
	);
	const built = new Set<number>();
	const active = new Set<number>();
	const buildSubtree = (id: number): Subtree => {
		// Shared DAG nodes are rendered once. Reserving one card for subsequent
		// references keeps their branch separated without duplicating a card.
		if (built.has(id) || active.has(id)) {
			return { width: MUTATION_NODE_WIDTH, positions: new Map() };
		}
		active.add(id);
		const recipe = recipeByResult.get(id);
		if (!recipe) {
			active.delete(id);
			built.add(id);
			return {
				width: MUTATION_NODE_WIDTH,
				positions: new Map([[id, 0]]),
			};
		}

		const children = recipe.ingredient_ids.map(buildSubtree);
		const childOffsets = [0, children[0].width + MUTATION_COLUMN_GAP];
		const width = children[0].width + MUTATION_COLUMN_GAP + children[1].width;
		const positions = new Map<number, number>();
		children.forEach((child, index) => {
			for (const [childId, childX] of child.positions) {
				positions.set(childId, childX + childOffsets[index]);
			}
		});
		const childCenters = children.map(
			(child, index) =>
				(child.positions.get(recipe.ingredient_ids[index]) ??
					(child.width - MUTATION_NODE_WIDTH) / 2) +
				childOffsets[index] +
				MUTATION_NODE_WIDTH / 2,
		);
		positions.set(
			id,
			(childCenters[0] + childCenters[1]) / 2 - MUTATION_NODE_WIDTH / 2,
		);
		active.delete(id);
		built.add(id);
		return { width, positions };
	};

	const ingredientIds = new Set(
		family.recipes.flatMap((recipe) => recipe.ingredient_ids),
	);
	const roots = family.monsterlingIds
		.filter((id) => !ingredientIds.has(id))
		.sort(
			(a, b) =>
				(MONSTERLINGS_DATA[a]?.display_id ?? a) -
				(MONSTERLINGS_DATA[b]?.display_id ?? b),
		);
	let nextRootX = 0;
	for (const root of roots.length > 0 ? roots : family.monsterlingIds) {
		const subtree = buildSubtree(root);
		for (const [id, x] of subtree.positions) {
			const depth = depthByComponent.get(componentById.get(id) ?? id) ?? 0;
			positionById.set(id, {
				x: MUTATION_PADDING + nextRootX + x,
				y:
					MUTATION_PADDING +
					(maxDepth - depth) * (MUTATION_NODE_HEIGHT + MUTATION_ROW_GAP),
			});
		}
		nextRootX += subtree.width + MUTATION_COLUMN_GAP;
	}

	// Include malformed/disconnected family records without allowing a cycle to
	// recurse forever. These are laid out as a final, non-overlapping row.
	for (const id of family.monsterlingIds) {
		if (positionById.has(id)) continue;
		const depth = depthByComponent.get(componentById.get(id) ?? id) ?? 0;
		positionById.set(id, {
			x: MUTATION_PADDING + nextRootX,
			y:
				MUTATION_PADDING +
				(maxDepth - depth) * (MUTATION_NODE_HEIGHT + MUTATION_ROW_GAP),
		});
		nextRootX += MUTATION_NODE_WIDTH + MUTATION_COLUMN_GAP;
	}

	const minX = Math.min(...[...positionById.values()].map(({ x }) => x));
	const horizontalShift = MUTATION_PADDING - minX;
	for (const position of positionById.values()) position.x += horizontalShift;
	const maxX = Math.max(
		...[...positionById.values()].map(({ x }) => x + MUTATION_NODE_WIDTH),
	);

	return {
		positionById,
		width: maxX + MUTATION_PADDING,
		height:
			MUTATION_PADDING * 2 +
			(maxDepth + 1) * MUTATION_NODE_HEIGHT +
			maxDepth * MUTATION_ROW_GAP,
	};
};
