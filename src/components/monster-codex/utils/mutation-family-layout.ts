import type { MonsterlingMutationFamily } from "@/components/monster-codex/utils/mutation-family";
import { MONSTERLINGS_DATA } from "@/data/monsterlings/MONSTERLINGS_DATA";

export const MUTATION_NODE_WIDTH = 112;
export const MUTATION_NODE_HEIGHT = 104;
export const MUTATION_COLUMN_GAP = 32;
export const MUTATION_ROW_GAP = 96;
export const MUTATION_PADDING = 24;

export type MutationOccurrence = {
	key: string;
	monsterlingId: number;
	x: number;
	y: number;
};

export type MutationRecipeConnection = {
	resultKey: string;
	ingredientKeys: readonly [string, string];
};

export type MutationFamilyLayout = {
	/** First occurrence for each id, retained for backwards-compatible callers. */
	positionById: Map<number, { x: number; y: number }>;
	positionByOccurrenceKey: Map<string, { x: number; y: number }>;
	occurrences: MutationOccurrence[];
	recipeConnections: MutationRecipeConnection[];
	width: number;
	height: number;
};

/** Lay out recipe occurrences. Shared ingredients are intentionally duplicated. */
export const getMutationFamilyLayout = (
	family: MonsterlingMutationFamily,
): MutationFamilyLayout => {
	const recipeByResult = new Map(
		family.recipes.map((recipe) => [recipe.result_id, recipe]),
	);
	const ingredientIds = new Set(
		family.recipes.flatMap((recipe) => recipe.ingredient_ids),
	);
	const sortIds = (left: number, right: number) =>
		(MONSTERLINGS_DATA[left]?.display_id ?? left) -
		(MONSTERLINGS_DATA[right]?.display_id ?? right);
	const roots = [...family.monsterlingIds]
		.filter((id) => !ingredientIds.has(id))
		.sort(sortIds);
	const rootIds =
		roots.length > 0 ? roots : [...family.monsterlingIds].sort(sortIds);

	type BuiltSubtree = {
		width: number;
		maxLevel: number;
		nodes: Array<{
			key: string;
			monsterlingId: number;
			x: number;
			level: number;
		}>;
		connections: MutationRecipeConnection[];
	};
	const active = new Set<number>();
	const buildSubtree = (id: number, key: string): BuiltSubtree => {
		const recipe = recipeByResult.get(id);
		if (!recipe || active.has(id)) {
			return {
				width: MUTATION_NODE_WIDTH,
				maxLevel: 0,
				nodes: [{ key, monsterlingId: id, x: 0, level: 0 }],
				connections: [],
			};
		}
		active.add(id);
		const children = recipe.ingredient_ids.map((ingredientId, index) =>
			buildSubtree(ingredientId, `${key}/${index}`),
		);
		active.delete(id);
		const childOffsets = [0, children[0].width + MUTATION_COLUMN_GAP];
		const width = children[0].width + MUTATION_COLUMN_GAP + children[1].width;
		const nodes = children.flatMap((child, index) =>
			child.nodes.map((node) => ({
				...node,
				x: node.x + childOffsets[index],
				level: node.level + 1,
			})),
		);
		const childCenters = children.map(
			(child, index) =>
				(child.nodes.find((node) => node.key === `${key}/${index}`)?.x ??
					(child.width - MUTATION_NODE_WIDTH) / 2) +
				childOffsets[index] +
				MUTATION_NODE_WIDTH / 2,
		);
		const resultX =
			(childCenters[0] + childCenters[1]) / 2 - MUTATION_NODE_WIDTH / 2;
		nodes.push({ key, monsterlingId: id, x: resultX, level: 0 });
		const connections = [
			...children.flatMap((child) => child.connections),
			{
				resultKey: key,
				ingredientKeys: [`${key}/0`, `${key}/1`] as const,
			},
		];
		return {
			width,
			maxLevel: 1 + Math.max(children[0].maxLevel, children[1].maxLevel),
			nodes,
			connections,
		};
	};

	const occurrences: MutationOccurrence[] = [];
	const recipeConnections: MutationRecipeConnection[] = [];
	let nextRootX = MUTATION_PADDING;
	let maxLevel = 0;
	for (const rootId of rootIds) {
		const subtree = buildSubtree(rootId, `root-${rootId}`);
		maxLevel = Math.max(maxLevel, subtree.maxLevel);
		for (const node of subtree.nodes) {
			occurrences.push({
				key: node.key,
				monsterlingId: node.monsterlingId,
				x: nextRootX + node.x,
				y:
					MUTATION_PADDING +
					node.level * (MUTATION_NODE_HEIGHT + MUTATION_ROW_GAP),
			});
		}
		recipeConnections.push(...subtree.connections);
		nextRootX += subtree.width + MUTATION_COLUMN_GAP;
	}

	// Include malformed/disconnected records without recursing indefinitely.
	for (const id of family.monsterlingIds) {
		if (occurrences.some((occurrence) => occurrence.monsterlingId === id))
			continue;
		occurrences.push({
			key: `orphan-${id}`,
			monsterlingId: id,
			x: nextRootX,
			y: MUTATION_PADDING,
		});
		nextRootX += MUTATION_NODE_WIDTH + MUTATION_COLUMN_GAP;
	}

	const positionByOccurrenceKey = new Map(
		occurrences.map(({ key, x, y }) => [key, { x, y }]),
	);
	const positionById = new Map<number, { x: number; y: number }>();
	for (const occurrence of occurrences) {
		if (!positionById.has(occurrence.monsterlingId)) {
			positionById.set(occurrence.monsterlingId, {
				x: occurrence.x,
				y: occurrence.y,
			});
		}
	}
	return {
		positionById,
		positionByOccurrenceKey,
		occurrences,
		recipeConnections,
		width: Math.max(MUTATION_NODE_WIDTH + MUTATION_PADDING * 2, nextRootX),
		height:
			MUTATION_PADDING * 2 +
			(maxLevel + 1) * MUTATION_NODE_HEIGHT +
			maxLevel * MUTATION_ROW_GAP,
	};
};
