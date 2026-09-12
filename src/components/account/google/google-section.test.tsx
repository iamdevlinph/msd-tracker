// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GoogleSection } from "./google-section";

const { event, keepLocalBackup } = vi.hoisted(() => ({
	event: vi.fn(),
	keepLocalBackup: vi.fn(),
}));

vi.mock("@icons-pack/react-simple-icons", () => ({
	SiGoogledrive: () => null,
}));
vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));
vi.mock("@/components/account/google/utils/drive-sync", () => ({
	retrySync: vi.fn(),
	keepLocalBackup,
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
			syncRecovery: "invalid-remote",
			backupUpdatedAt: 0,
			isHydrated: true,
		}),
}));

describe("Google sync failure state", () => {
	afterEach(() => {
		cleanup();
		event.mockReset();
		keepLocalBackup.mockReset();
	});

	it("shows retry and browser token-refresh guidance", () => {
		render(<GoogleSection />);

		screen.getByRole("button", { name: "Retry Sync" });
		expect(
			screen.getByText(
				"Drive requests run in your browser; MSD_GOOGLE_DRIVE_SYNC covers token refresh only.",
			),
		).toBeTruthy();
	});

	it("offers and tracks confirmed local overwrite for an invalid remote backup", async () => {
		keepLocalBackup.mockResolvedValue(undefined);
		render(<GoogleSection />);

		fireEvent.click(
			screen.getByRole("button", { name: "Keep Local & Overwrite Drive" }),
		);
		expect(
			screen.getByText(
				"The Drive backup is invalid. Keeping local data will replace it.",
			),
		).toBeTruthy();
		await waitFor(() =>
			expect(event).toHaveBeenNthCalledWith(
				2,
				"google_drive_keep_local_success",
			),
		);
	});

	it("tracks overwrite attempts and handles a failed promise", async () => {
		keepLocalBackup.mockRejectedValue(new Error("upload failed"));
		render(<GoogleSection />);

		fireEvent.click(
			screen.getByRole("button", { name: "Keep Local & Overwrite Drive" }),
		);

		await waitFor(() =>
			expect(event).toHaveBeenNthCalledWith(
				1,
				"google_drive_keep_local_attempt",
			),
		);
		expect(event).toHaveBeenNthCalledWith(2, "google_drive_keep_local_failure");
	});
});
