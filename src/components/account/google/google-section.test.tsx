// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GoogleSection } from "./google-section";

vi.mock("@icons-pack/react-simple-icons", () => ({
	SiGoogledrive: () => null,
}));
vi.mock("@/components/account/google/utils/drive-sync", () => ({
	retrySync: vi.fn(),
}));
vi.mock("@/components/account/google/utils/use-google-auth", () => ({
	useGoogleAuth: () => ({ status: "in", email: "player@example.com" }),
}));
vi.mock("@/stores/app-store", () => ({
	useAppStore: (selector: (state: object) => unknown) =>
		selector({
			syncInProgress: false,
			syncStatus: "failed",
			syncError: "Changes not backed up",
			backupUpdatedAt: 0,
			isHydrated: true,
		}),
}));

describe("Google sync failure state", () => {
	it("shows retry and the Cloudflare operator hint", () => {
		render(<GoogleSection />);

		screen.getByRole("button", { name: "Retry Sync" });
		expect(
			screen.getByText("Check Cloudflare logs for MSD_GOOGLE_DRIVE_SYNC."),
		).toBeTruthy();
	});
});
