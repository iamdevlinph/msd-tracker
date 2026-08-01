// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SearchInput } from "@/components/ui/search-input";

const ControlledSearch = ({ onBubble = vi.fn() }) => {
	const [value, setValue] = useState("query");
	return (
		<div onKeyDown={onBubble}>
			<SearchInput
				aria-label="Search"
				value={value}
				onValueChange={setValue}
				data-testid="search"
			/>
		</div>
	);
};

describe("SearchInput", () => {
	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	it("forwards input props and clears from the conditional button", () => {
		render(<ControlledSearch />);
		const input = screen.getByTestId("search") as HTMLInputElement;

		expect(input.type).toBe("text");
		expect(screen.getByRole("button", { name: "Clear search" })).toBeTruthy();
		fireEvent.click(screen.getByRole("button", { name: "Clear search" }));

		expect(input.value).toBe("");
		expect(screen.queryByRole("button", { name: "Clear search" })).toBeNull();
	});

	it("clears a non-empty value on Escape without bubbling or losing focus", () => {
		const onBubble = vi.fn();
		render(<ControlledSearch onBubble={onBubble} />);
		const input = screen.getByRole("textbox", { name: "Search" });
		input.focus();

		fireEvent.keyDown(input, { key: "Escape" });

		expect((input as HTMLInputElement).value).toBe("");
		expect(document.activeElement).toBe(input);
		expect(onBubble).not.toHaveBeenCalled();

		fireEvent.keyDown(input, { key: "Escape" });
		expect(onBubble).toHaveBeenCalledTimes(1);
	});

	it("forwards the input ref", () => {
		const ref = createRef<HTMLInputElement>();
		render(
			<SearchInput
				ref={ref}
				aria-label="Search"
				value=""
				onValueChange={vi.fn()}
			/>,
		);

		expect(ref.current).toBe(screen.getByRole("textbox", { name: "Search" }));
	});

	it("shows the platform shortcut before the search description", () => {
		vi.spyOn(navigator, "platform", "get").mockReturnValue("MacIntel");
		render(
			<SearchInput
				aria-label="Search"
				placeholder="Search monsterling names"
				value=""
				onValueChange={vi.fn()}
			/>,
		);

		expect(
			(screen.getByRole("textbox", { name: "Search" }) as HTMLInputElement)
				.placeholder,
		).toBe("⌘ + K - Search monsterling names");
	});

	it("focuses and selects the last dialog search with Ctrl+K or Cmd+K", () => {
		render(
			<>
				<SearchInput
					aria-label="Page search"
					value="page"
					onValueChange={vi.fn()}
				/>
				<div role="dialog">
					<SearchInput
						aria-label="Dialog search"
						value="dialog"
						onValueChange={vi.fn()}
					/>
				</div>
			</>,
		);
		const dialogSearch = screen.getByRole("textbox", {
			name: "Dialog search",
		}) as HTMLInputElement;

		fireEvent.keyDown(document, { key: "k", ctrlKey: true });
		expect(document.activeElement).toBe(dialogSearch);
		expect(dialogSearch.selectionStart).toBe(0);
		expect(dialogSearch.selectionEnd).toBe(dialogSearch.value.length);

		screen.getByRole("textbox", { name: "Page search" }).focus();
		fireEvent.keyDown(document, { key: "K", metaKey: true });
		expect(document.activeElement).toBe(dialogSearch);
	});
});
