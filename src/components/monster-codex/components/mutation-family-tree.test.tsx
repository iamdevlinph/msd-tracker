// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MutationFamilyTree } from "@/components/monster-codex/components/mutation-family-tree";
import type { MonsterlingMutationFamily } from "@/components/monster-codex/utils/mutation-family";
import {
	getMutationFamilyLayout,
	MUTATION_NODE_HEIGHT,
	MUTATION_NODE_WIDTH,
} from "@/components/monster-codex/utils/mutation-family-layout";

const family: MonsterlingMutationFamily = {
	monsterlingIds: [164, 165, 150, 151, 147, 148, 149],
	recipes: [
		{ result_id: 149, ingredient_ids: [148, 147] },
		{ result_id: 151, ingredient_ids: [150, 149] },
		{ result_id: 165, ingredient_ids: [164, 151] },
	],
};

describe("MutationFamilyTree", () => {
	let clientWidth = 320;
	let clientHeight = 360;
	let originalClientWidth: PropertyDescriptor | undefined;
	let originalClientHeight: PropertyDescriptor | undefined;

	beforeEach(() => {
		originalClientWidth = Object.getOwnPropertyDescriptor(
			HTMLElement.prototype,
			"clientWidth",
		);
		originalClientHeight = Object.getOwnPropertyDescriptor(
			HTMLElement.prototype,
			"clientHeight",
		);
		Object.defineProperty(HTMLElement.prototype, "clientWidth", {
			configurable: true,
			get: () => clientWidth,
		});
		Object.defineProperty(HTMLElement.prototype, "clientHeight", {
			configurable: true,
			get: () => clientHeight,
		});
	});

	afterEach(() => {
		cleanup();
		if (originalClientWidth) {
			Object.defineProperty(
				HTMLElement.prototype,
				"clientWidth",
				originalClientWidth,
			);
		} else {
			Reflect.deleteProperty(HTMLElement.prototype, "clientWidth");
		}
		if (originalClientHeight) {
			Object.defineProperty(
				HTMLElement.prototype,
				"clientHeight",
				originalClientHeight,
			);
		} else {
			Reflect.deleteProperty(HTMLElement.prototype, "clientHeight");
		}
	});

	it("frames a deep selected result together with its direct ingredients", () => {
		const layout = getMutationFamilyLayout(family);
		const selected = layout.occurrences.find(
			(occurrence) => occurrence.monsterlingId === 149,
		);
		if (!selected) throw new Error("missing selected occurrence");
		const connection = layout.recipeConnections.find(
			(candidate) => candidate.resultKey === selected.key,
		);
		if (!connection) throw new Error("missing selected recipe");
		const targets = [
			selected,
			...connection.ingredientKeys.map((key) =>
				layout.occurrences.find((occurrence) => occurrence.key === key),
			),
		].filter((occurrence): occurrence is typeof selected =>
			Boolean(occurrence),
		);

		render(
			<MutationFamilyTree
				family={family}
				selectedMonsterlingId={149}
				shouldAutoFrame
				onSelectMonsterling={vi.fn()}
				scrollContainerRef={createRef<HTMLElement>()}
			/>,
		);

		const diagram = screen.getByRole("region", {
			name: "Mutation family diagram",
		});
		expect(diagram.scrollTop).toBeGreaterThan(0);
		for (const target of targets) {
			expect(target.x).toBeGreaterThanOrEqual(diagram.scrollLeft);
			expect(target.x + MUTATION_NODE_WIDTH).toBeLessThanOrEqual(
				diagram.scrollLeft + clientWidth,
			);
			expect(target.y).toBeGreaterThanOrEqual(diagram.scrollTop);
			expect(target.y + MUTATION_NODE_HEIGHT).toBeLessThanOrEqual(
				diagram.scrollTop + clientHeight,
			);
		}
	});

	it("does not replace a saved frame position", () => {
		clientWidth = 200;
		clientHeight = 200;
		render(
			<MutationFamilyTree
				family={family}
				selectedMonsterlingId={149}
				shouldAutoFrame={false}
				onSelectMonsterling={vi.fn()}
				scrollContainerRef={createRef<HTMLElement>()}
			/>,
		);

		const diagram = screen.getByRole("region", {
			name: "Mutation family diagram",
		});
		expect(diagram.scrollLeft).toBe(0);
		expect(diagram.scrollTop).toBe(0);
	});

	it("highlights only the selected Monsterling's result connector", () => {
		const { container } = render(
			<MutationFamilyTree
				family={family}
				selectedMonsterlingId={149}
				shouldAutoFrame={false}
				onSelectMonsterling={vi.fn()}
				scrollContainerRef={createRef<HTMLElement>()}
			/>,
		);

		const selectedResultLine = container.querySelector(
			'line[data-result-monsterling-id="149"]',
		);
		expect(selectedResultLine?.getAttribute("class")).toBe("text-primary/70");
		expect(
			container
				.querySelector('circle[data-junction-monsterling-id="149"]')
				?.getAttribute("class"),
		).toContain("stroke-primary");
		expect(
			container
				.querySelector('text[data-plus-monsterling-id="149"]')
				?.getAttribute("class"),
		).toContain("fill-foreground");
		for (const resultId of [151, 165]) {
			const unrelatedResultLine = container.querySelector(
				`line[data-result-monsterling-id="${resultId}"]`,
			);
			expect(unrelatedResultLine?.getAttribute("class")).toBe("text-border");
			expect(
				container
					.querySelector(`circle[data-junction-monsterling-id="${resultId}"]`)
					?.getAttribute("class"),
			).toContain("stroke-border");
			expect(
				container
					.querySelector(`text[data-plus-monsterling-id="${resultId}"]`)
					?.getAttribute("class"),
			).toContain("fill-muted-foreground");
		}
	});
});
