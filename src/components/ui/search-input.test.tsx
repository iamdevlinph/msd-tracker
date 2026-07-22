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
	afterEach(cleanup);

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
});
