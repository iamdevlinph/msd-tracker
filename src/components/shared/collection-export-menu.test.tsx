// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CollectionExportMenu } from "@/components/shared/collection-export-menu";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

const { event, toBlob, write } = vi.hoisted(() => ({
	event: vi.fn(),
	toBlob: vi.fn(),
	write: vi.fn(),
}));

vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));
vi.mock("html-to-image", () => ({ toBlob }));

describe("CollectionExportMenu", () => {
	afterEach(cleanup);
	beforeEach(() => {
		event.mockReset();
		toBlob.mockReset().mockResolvedValue(new Blob(["png"]));
		write.mockReset().mockResolvedValue(undefined);
		Object.defineProperty(navigator, "clipboard", {
			configurable: true,
			value: { write },
		});
		vi.stubGlobal(
			"ClipboardItem",
			class ClipboardItem {
				constructor(public items: Record<string, Blob>) {}
			},
		);
		Object.defineProperty(URL, "createObjectURL", {
			configurable: true,
			value: vi.fn().mockReturnValue("blob:collection"),
		});
		Object.defineProperty(URL, "revokeObjectURL", {
			configurable: true,
			value: vi.fn(),
		});
	});

	it("downloads the rendered preview", async () => {
		render(
			<CollectionExportMenu
				collection="artifacts"
				title="Artifacts"
				count={1}
				itemWidth={120}
				maxColumns={13}
			>
				<div>Artifact card</div>
			</CollectionExportMenu>,
		);
		fireEvent.click(
			screen.getByRole("button", { name: "Export Artifact Data" }),
		);
		fireEvent.click(screen.getByRole("button", { name: "Download PNG" }));
		await waitFor(() => expect(toBlob).toHaveBeenCalledOnce());
		expect(event).toHaveBeenNthCalledWith(
			1,
			ANALYTICS_EVENTS.COLLECTION_DOWNLOAD_ATTEMPT,
			{ collection_type: "artifacts", compact: false },
		);
		expect(event).toHaveBeenNthCalledWith(
			2,
			ANALYTICS_EVENTS.COLLECTION_DOWNLOAD_SUCCESS,
			{ collection_type: "artifacts", compact: false },
		);
	});

	it("disables export when there are no filtered items", () => {
		render(
			<CollectionExportMenu
				collection="artifacts"
				title="Artifacts"
				count={0}
				itemWidth={120}
				maxColumns={13}
			>
				<div>Artifact card</div>
			</CollectionExportMenu>,
		);
		expect(
			(
				screen.getByRole("button", {
					name: "Export Artifact Data",
				}) as HTMLButtonElement
			).disabled,
		).toBe(true);
	});

	it("opens a preview with the filtered heading and cards", () => {
		render(
			<CollectionExportMenu
				collection="characters"
				title="Characters"
				count={1}
				itemWidth={130}
				maxColumns={12}
			>
				<div>Angel card</div>
			</CollectionExportMenu>,
		);
		fireEvent.click(
			screen.getByRole("button", { name: "Export Character Data" }),
		);
		expect(screen.getByRole("dialog")).toBeTruthy();
		expect(screen.getByRole("dialog").querySelector("h2")?.textContent).toBe(
			"Characters",
		);
		expect((screen.getByRole("dialog") as HTMLElement).style.width).toBe(
			"258px",
		);
		expect(screen.getByText("Angel card")).toBeTruthy();
		const surface = screen.getByTestId(
			"collection-export-surface",
		) as HTMLElement;
		expect(surface.style.width).toBe("226px");
		expect(surface.className).toContain("bg-background");
		expect(surface.className).toContain("text-foreground");
		expect(surface.className).not.toContain("dark");
		expect(surface.className).not.toContain("bg-zinc-900");
	});

	it("copies the rendered preview and tracks its variant", async () => {
		render(
			<CollectionExportMenu
				collection="monsterlings"
				title="Monsterlings"
				count={1}
				itemWidth={330}
				maxColumns={5}
				previewVariant={{
					itemWidth: 120,
					maxColumns: 13,
					filenameSuffix: "compact",
					children: <div>Compact Cappy</div>,
				}}
			>
				<div>Detailed Cappy</div>
			</CollectionExportMenu>,
		);
		fireEvent.click(
			screen.getByRole("button", { name: "Export Monsterling Data" }),
		);
		expect(
			(screen.getByRole("checkbox", { name: "Show stats" }) as HTMLElement)
				.dataset.state,
		).toBe("unchecked");
		expect(screen.getByText("Compact Cappy")).toBeTruthy();
		expect(screen.queryByText("Detailed Cappy")).toBeNull();
		fireEvent.click(screen.getByRole("checkbox", { name: "Show stats" }));
		expect(screen.getByText("Detailed Cappy")).toBeTruthy();
		expect(
			(screen.getByTestId("collection-export-surface") as HTMLElement).style
				.width,
		).toBe("426px");
		fireEvent.click(screen.getByRole("checkbox", { name: "Show stats" }));
		fireEvent.click(screen.getByRole("button", { name: "Copy Image" }));
		await waitFor(() => expect(write).toHaveBeenCalledOnce());
		const capturedSurface = toBlob.mock.calls[0][0] as HTMLElement;
		expect(capturedSurface.textContent).toContain("Compact Cappy");
		expect(
			(capturedSurface.querySelector(".grid") as HTMLElement).style
				.gridTemplateColumns,
		).toBe("repeat(auto-fit, minmax(120px, 1fr))");
		expect(toBlob).toHaveBeenCalledWith(
			capturedSurface,
			expect.objectContaining({
				width: 216,
				pixelRatio: 2,
				backgroundColor: getComputedStyle(capturedSurface).backgroundColor,
			}),
		);
		expect(event).toHaveBeenNthCalledWith(
			1,
			ANALYTICS_EVENTS.COLLECTION_COPY_ATTEMPT,
			{ collection_type: "monsterlings", compact: true },
		);
		expect(event).toHaveBeenNthCalledWith(
			2,
			ANALYTICS_EVENTS.COLLECTION_COPY_SUCCESS,
			{ collection_type: "monsterlings", compact: true },
		);
	});

	it("caps columns while keeping partial rows content-sized", () => {
		render(
			<CollectionExportMenu
				collection="characters"
				title="Characters"
				count={20}
				itemWidth={130}
				maxColumns={12}
			>
				<div>Character cards</div>
			</CollectionExportMenu>,
		);
		fireEvent.click(
			screen.getByRole("button", { name: "Export Character Data" }),
		);
		expect(
			(screen.getByTestId("collection-export-surface") as HTMLElement).style
				.width,
		).toBe("1832px");
		expect(
			(
				screen
					.getByTestId("collection-export-surface")
					.querySelector(".grid") as HTMLElement
			).style.gridTemplateColumns,
		).toBe("repeat(auto-fit, minmax(130px, 1fr))");
	});
});
