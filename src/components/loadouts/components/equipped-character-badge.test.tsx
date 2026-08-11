// @vitest-environment jsdom

import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EquippedCharacterBadge } from "./equipped-character-badge";

const characters = [
	{ id: 1, name: "Angel", portraitImage: "/angel.webp" },
	{ id: 2, name: "Francis", portraitImage: "/francis.webp" },
	{
		id: 3,
		name: "Mina",
		portraitImage: "/mina.webp",
		variant: "Summer Dive!" as const,
	},
	{ id: 4, name: "Zoe", portraitImage: "/zoe.webp" },
];

describe("EquippedCharacterBadge", () => {
	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	it("portals every character outside the card on hover and focus", () => {
		vi.useFakeTimers();
		const handleCardClick = vi.fn();
		const { container, rerender } = render(
			<button type="button" className="group" onClick={handleCardClick}>
				Edit owned item
				<EquippedCharacterBadge characters={characters} />
			</button>,
		);

		expect(screen.getByText("+1")).toBeTruthy();
		expect(screen.queryByRole("tooltip")).toBeNull();
		const editButton = screen.getByRole("button", { name: /edit owned item/i });
		fireEvent.mouseEnter(editButton);
		expect(screen.queryByRole("tooltip")).toBeNull();
		const badge = screen.getByRole("img", { name: /equipped by/i });
		fireEvent.mouseEnter(badge);
		const tooltip = screen.getByRole("tooltip");
		expect(tooltip.textContent).toBe("AngelFrancisMina (Summer Dive!)Zoe");
		expect(tooltip.parentElement).toBe(document.body);
		expect(editButton.contains(tooltip)).toBe(false);
		fireEvent.pointerDown(tooltip);
		fireEvent.click(tooltip);
		expect(handleCardClick).not.toHaveBeenCalled();
		fireEvent.mouseLeave(badge);
		fireEvent.mouseEnter(tooltip);
		act(() => vi.advanceTimersByTime(100));
		expect(screen.getByRole("tooltip")).toBeTruthy();
		fireEvent.mouseLeave(tooltip);
		expect(screen.queryByRole("tooltip")).toBeNull();
		fireEvent.mouseEnter(badge);
		fireEvent.focus(editButton);
		expect(screen.getByRole("tooltip").parentElement).toBe(document.body);
		fireEvent.mouseLeave(badge);
		expect(screen.getByRole("tooltip")).toBeTruthy();
		fireEvent.blur(editButton);
		act(() => vi.advanceTimersByTime(100));
		expect(screen.queryByRole("tooltip")).toBeNull();
		expect(container.querySelectorAll("button")).toHaveLength(1);
		expect(container.querySelectorAll('img[alt$=" portrait"]')).toHaveLength(3);
		expect(editButton.getAttribute("aria-describedby")).toBeTruthy();

		rerender(
			<button type="button">
				Edit owned item
				<EquippedCharacterBadge characters={[]} />
			</button>,
		);
		expect(editButton.getAttribute("aria-describedby")).toBeNull();
	});

	it("flips and clamps a long tooltip within the viewport", () => {
		Object.defineProperty(window, "innerWidth", {
			configurable: true,
			value: 320,
		});
		Object.defineProperty(window, "innerHeight", {
			configurable: true,
			value: 240,
		});
		vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(
			function (this: HTMLElement) {
				return (
					this.getAttribute("role") === "tooltip"
						? {
								left: 0,
								top: 0,
								right: 280,
								bottom: 400,
								width: 280,
								height: 400,
							}
						: {
								left: 4,
								top: 210,
								right: 28,
								bottom: 234,
								width: 24,
								height: 24,
							}
				) as DOMRect;
			},
		);
		vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockImplementation(
			function (this: HTMLElement) {
				return this.getAttribute("role") === "tooltip" ? 400 : 24;
			},
		);
		render(
			<button type="button">
				Edit owned item
				<EquippedCharacterBadge characters={characters} />
			</button>,
		);

		fireEvent.mouseEnter(screen.getByRole("img", { name: /equipped by/i }));
		const tooltip = screen.getByRole("tooltip");
		expect(tooltip.style.left).toBe("8px");
		expect(tooltip.style.top).toBe("8px");
		expect(tooltip.style.maxHeight).toBe("198px");
		expect(tooltip.className).toContain("overflow-y-auto");
		expect(tooltip.className).not.toContain("pointer-events-none");

		Object.defineProperty(window, "innerHeight", {
			configurable: true,
			value: 500,
		});
		fireEvent(window, new Event("resize"));
		expect(tooltip.style.top).toBe("238px");
		expect(tooltip.style.maxHeight).toBe("254px");
	});

	it("renders nothing when the item is unused", () => {
		const { container } = render(<EquippedCharacterBadge />);

		expect(container.childElementCount).toBe(0);
	});
});
