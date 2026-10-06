import type { StateCreator } from "zustand";
import type { StoreState } from "@/stores/app-store";
import { nextBackupUpdatedAt } from "@/stores/backup-timestamp";

export type NavigationPreferences = {
	showAssets: boolean;
	showEquipment: boolean;
};

export const DEFAULT_NAVIGATION_PREFERENCES: NavigationPreferences = {
	showAssets: true,
	showEquipment: true,
};

export const normalizeNavigationPreferences = (
	value: unknown,
): NavigationPreferences => {
	const preferences =
		value && typeof value === "object"
			? (value as Partial<NavigationPreferences>)
			: {};
	return {
		showAssets: preferences.showAssets !== false,
		showEquipment: preferences.showEquipment !== false,
	};
};

export type NavigationPreferencesSlice = {
	navigationPreferences: NavigationPreferences;
	setNavigationPreferences: (
		preferences: Partial<NavigationPreferences>,
	) => void;
};

export const createNavigationPreferencesSlice: StateCreator<
	StoreState,
	[],
	[],
	NavigationPreferencesSlice
> = (set) => ({
	navigationPreferences: { ...DEFAULT_NAVIGATION_PREFERENCES },
	setNavigationPreferences: (preferences) =>
		set((state) => {
			const next = normalizeNavigationPreferences({
				...state.navigationPreferences,
				...preferences,
			});
			if (
				next.showAssets === state.navigationPreferences.showAssets &&
				next.showEquipment === state.navigationPreferences.showEquipment
			)
				return state;
			return {
				navigationPreferences: next,
				backupUpdatedAt: nextBackupUpdatedAt(state.backupUpdatedAt),
			};
		}),
});
