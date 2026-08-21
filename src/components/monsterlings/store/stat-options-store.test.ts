// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { useStatOptionStore } from "@/components/monsterlings/store/stat-options-store";
import { CURRENT_GAME_VERSION } from "@/constants";

afterEach(() => {
	useStatOptionStore.setState({
		statOptions: [],
		version: CURRENT_GAME_VERSION,
	});
});

describe("stat options store", () => {
	it("rebuilds an older cached version with the current game version", () => {
		useStatOptionStore.setState({
			statOptions: [{ label: "Old stat", value: "old" }],
			version: "1.2.0",
		});

		const options = useStatOptionStore.getState().getStatOptions();

		expect(options).not.toEqual([{ label: "Old stat", value: "old" }]);
		expect(options.length).toBeGreaterThan(0);
		expect(useStatOptionStore.getState().version).toBe(CURRENT_GAME_VERSION);
	});
});
