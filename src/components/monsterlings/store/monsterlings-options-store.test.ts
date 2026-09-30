// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";

const { monsterlingsData } = vi.hoisted(() => ({
	monsterlingsData: {
		100001: { id: 100_001, name: "Reginula" },
		100002: { id: 100_002, name: "Sorin" },
	},
}));

vi.mock("@/data/monsterlings/MONSTERLINGS_DATA", () => ({
	MONSTERLINGS_DATA: monsterlingsData,
}));

import { useMonsterOptionStore } from "@/components/monsterlings/store/monsterlings-options-store";

afterEach(() => {
	useMonsterOptionStore.setState({
		monsterlingOptions: [],
		version: "1.2.0",
	});
});

describe("monsterling options store", () => {
	it("rebuilds an older cached version so newly added Monsterlings appear", () => {
		useMonsterOptionStore.setState({
			monsterlingOptions: [{ label: "Reginula", value: "100001" }],
			version: "1.2.0",
		});

		const options = useMonsterOptionStore.getState().getMonsterlingOptions();

		expect(options).toContainEqual({ label: "Sorin", value: "100002" });
	});
});
