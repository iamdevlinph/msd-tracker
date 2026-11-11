// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { EntityCardGrid } from "@/components/shared/entity-card-grid";

describe("EntityCardGrid", () => {
	afterEach(cleanup);

	it("uses consistent left-aligned 120px columns with 12px spacing", () => {
		render(
			<EntityCardGrid>
				<button type="button">First card</button>
				<button type="button">Last card</button>
			</EntityCardGrid>,
		);

		const grid = screen.getByRole("button", { name: "First card" })
			.parentElement as HTMLElement;
		expect(grid.className).toContain("grid");
		expect(grid.className).toContain("justify-start");
		expect(grid.className).toContain("gap-3");
		expect(grid.style.gridTemplateColumns).toBe("repeat(auto-fill, 120px)");
		expect(screen.getAllByRole("button")).toHaveLength(2);
	});

	it("preserves Monsterling-sized columns and optional scroll styling", () => {
		render(
			<EntityCardGrid itemWidth={330} className="overflow-x-auto">
				<button type="button">Monsterling</button>
			</EntityCardGrid>,
		);
		const grid = screen.getByRole("button", { name: "Monsterling" })
			.parentElement as HTMLElement;
		expect(grid.style.gridTemplateColumns).toBe("repeat(auto-fill, 330px)");
		expect(grid.className).toContain("gap-3");
		expect(grid.className).toContain("overflow-x-auto");
	});
});
