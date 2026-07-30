import { nanoid } from "nanoid";
import type { StateCreator } from "zustand";
import type { StoreState } from "@/stores/app-store";

export type ArtifactOwned = { artifact_id: number; fusion_level: number };
export type ArtifactsOwnedSlice = {
	artifactsOwned: Record<string, ArtifactOwned>;
	createArtifactOwned: (
		artifact: Omit<ArtifactOwned, "fusion_level"> & { fusion_level?: number },
	) => string;
	updateArtifactOwned: (
		instanceId: string,
		artifact: Partial<ArtifactOwned>,
	) => void;
	deleteArtifactOwned: (instanceId: string) => void;
	resetArtifactsOwned: () => void;
};
const validFusion = (v: number) => Math.max(1, Math.min(5, Math.round(v)));
export const createArtifactsOwnedSlice: StateCreator<
	StoreState,
	[],
	[],
	ArtifactsOwnedSlice
> = (set) => ({
	artifactsOwned: {},
	createArtifactOwned: ({ artifact_id, fusion_level = 1 }) => {
		const id = nanoid();
		set((s) => ({
			artifactsOwned: {
				...s.artifactsOwned,
				[id]: { artifact_id, fusion_level: validFusion(fusion_level) },
			},
			backupUpdatedAt: Date.now(),
		}));
		return id;
	},
	updateArtifactOwned: (id, artifact) =>
		set((s) =>
			s.artifactsOwned[id]
				? {
						artifactsOwned: {
							...s.artifactsOwned,
							[id]: {
								...s.artifactsOwned[id],
								...artifact,
								fusion_level:
									artifact.fusion_level == null
										? s.artifactsOwned[id].fusion_level
										: validFusion(artifact.fusion_level),
							},
						},
						backupUpdatedAt: Date.now(),
					}
				: s,
		),
	deleteArtifactOwned: (id) =>
		set((s) => {
			const { [id]: _, ...rest } = s.artifactsOwned;
			return { artifactsOwned: rest, backupUpdatedAt: Date.now() };
		}),
	resetArtifactsOwned: () =>
		set({ artifactsOwned: {}, backupUpdatedAt: Date.now() }),
});
