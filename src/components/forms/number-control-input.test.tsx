// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { afterEach, describe, expect, it } from "vitest";
import { NumberControlInput } from "@/components/forms/number-control-input";

type FormValues = { skill: number };

// biome-ignore lint/style/useComponentExportOnlyModules: test-only render helper
const TestInput = ({ value }: { value: number }) => {
	const { control } = useForm<FormValues>({ defaultValues: { skill: value } });
	return (
		<NumberControlInput<FormValues>
			name="skill"
			control={control}
			label="Skill"
			min={1}
			max={12}
			awakeningBoost={5}
		/>
	);
};

describe("NumberControlInput awakening badge", () => {
	afterEach(cleanup);

	it("uses max-level green when the stored value reaches max", () => {
		render(<TestInput value={12} />);

		const badge = screen.getByRole("button", { name: "16" });
		expect(badge.classList.contains("bg-green-600")).toBe(true);
		expect(badge.classList.contains("text-white")).toBe(true);
		expect(badge.classList.contains("bg-chart-3")).toBe(false);
	});

	it("keeps awakening styling below max", () => {
		render(<TestInput value={11} />);

		const badge = screen.getByRole("button", { name: "15" });
		expect(badge.classList.contains("bg-chart-3")).toBe(true);
		expect(badge.classList.contains("bg-green-600")).toBe(false);
	});
});
