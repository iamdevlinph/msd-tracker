// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PortraitWithName } from "@/components/shared/portrait-with-name";

describe("PortraitWithName", () => {
	it("keeps portrait children and renders the compact name overlay", () => {
		render(
			<PortraitWithName name="Long Portrait Name">
				<img alt="portrait" src="/portrait.png" />
				<span>badge</span>
			</PortraitWithName>,
		);

		expect(screen.getByAltText("portrait")).toBeTruthy();
		expect(screen.getByText("badge")).toBeTruthy();
		expect(screen.getByText("Long Portrait Name").className).toBe(
			"absolute inset-x-1 bottom-1 z-10 truncate rounded bg-black/80 px-1 py-0.5 text-center text-[10px] text-white",
		);
	});

	it("allows domain cards to override the name background", () => {
		render(
			<PortraitWithName name="Artifact" nameClassName="bg-transparent">
				<img alt="artifact" src="/artifact.png" />
			</PortraitWithName>,
		);

		const name = screen.getByText("Artifact");
		expect(name.className).toContain("bg-transparent");
		expect(name.className).not.toContain("bg-black/80");
	});
});
