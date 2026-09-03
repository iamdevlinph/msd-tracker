import { describe, expect, it } from "vitest";
import { getThemeScript } from "@/components/themes/theme-script";

describe("getThemeScript", () => {
	it("escapes script breakouts in the storage key", () => {
		const themeScript = getThemeScript("theme</script>", "dark");

		expect(themeScript).toContain(
			'localStorage.getItem("theme\\u003c/script>")',
		);
		expect(themeScript).not.toContain("</script>");
		expect(themeScript).toContain('t="dark"');
	});
});
