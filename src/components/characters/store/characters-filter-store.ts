import { create } from "zustand";
import type { CharacterClassId } from "@/data/CHARACTER_CLASS_DATA";
import type { ElementId } from "@/data/ELEMENTS_DATA";

export type CharacterStoreState = {
	characterFilters: {
		selectedCharacterClass: CharacterClassId[];
		selectedElements: ElementId[];
	};

	setCharacaterFilters: (
		filters: CharacterStoreState["characterFilters"],
	) => void;
};

export const initialCharacterState = {
	characterFilters: {
		selectedCharacterClass: [],
		selectedElements: [],
	},
};

export const useCharacterFilter = create<CharacterStoreState>()((set) => ({
	...initialCharacterState,

	setCharacaterFilters: (filter) =>
		set((state) => {
			const nextFilter = {
				...state.characterFilters,
				...filter,
			};

			// const { characterClassId, elementId } = nextFilter;

			// const cacheKey = `filter-${region}-${source}`;
			// const cached = get().cachedResults[cacheKey];
			// if (cached) {
			// 	return {
			// 		monsterlings: JSON.parse(cached as string),
			// 	};
			// }

			// const ownedCharacaters = new Set(useAppStore.getState().charactersOwned);

			// const filtered = MONSTERLINGS_DATA.filter((monsterling) => {
			// 	if (search && !monsterling.name.toLowerCase().includes(search)) {
			// 		return false;
			// 	}

			// 	if (
			// 		region !== undefined &&
			// 		region !== REGION_ID_BY_REGION.ALL &&
			// 		monsterling.region_id !== region
			// 	) {
			// 		return false;
			// 	}

			// 	if (
			// 		source !== undefined &&
			// 		source !== SOURCE_ID_BY_SOURCE.ALL &&
			// 		!monsterling.source_id.includes(source)
			// 	) {
			// 		return false;
			// 	}

			// 	const isCompleted = completedSet.has(monsterling.id);

			// 	if (completed === "completed" && !isCompleted) {
			// 		return false;
			// 	}

			// 	if (completed === "incomplete" && isCompleted) {
			// 		return false;
			// 	}

			// 	return true;
			// });

			return {
				// monsterlings: filtered,
				characterFilters: nextFilter,
				// cachedResults: {
				// 	...state.cachedResults,
				// 	[cacheKey]: JSON.stringify(filtered),
				// },
			};
		}),
}));
