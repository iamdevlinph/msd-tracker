import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAppStore } from "@/stores/app-store";

describe("artifacts owned store", () => {
	beforeEach(() => {
		useAppStore.setState({ artifactsOwned: {}, backupUpdatedAt: 0 });
		vi.spyOn(Date, "now").mockReturnValue(123);
	});

	it("creates independent copies and edits or deletes only the selected copy", () => {
		const first = useAppStore
			.getState()
			.createArtifactOwned({ artifact_id: 1, fusion_level: 1 });
		const second = useAppStore
			.getState()
			.createArtifactOwned({ artifact_id: 1, fusion_level: 5 });

		useAppStore.getState().updateArtifactOwned(first, { fusion_level: 3 });
		expect(useAppStore.getState().artifactsOwned).toMatchObject({
			[first]: { artifact_id: 1, fusion_level: 3 },
			[second]: { artifact_id: 1, fusion_level: 5 },
		});
		useAppStore.getState().deleteArtifactOwned(first);
		expect(useAppStore.getState().artifactsOwned).toEqual({
			[second]: { artifact_id: 1, fusion_level: 5 },
		});
		expect(useAppStore.getState().backupUpdatedAt).toBe(123);
	});

	it("constrains fusion levels and resets the collection", () => {
		const id = useAppStore
			.getState()
			.createArtifactOwned({ artifact_id: 1, fusion_level: 99 });
		expect(useAppStore.getState().artifactsOwned[id].fusion_level).toBe(5);
		useAppStore.getState().resetArtifactsOwned();
		expect(useAppStore.getState().artifactsOwned).toEqual({});
		expect(useAppStore.getState().backupUpdatedAt).toBe(123);
	});
});
