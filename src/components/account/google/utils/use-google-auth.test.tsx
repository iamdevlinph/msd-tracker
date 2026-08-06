// @vitest-environment jsdom
import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useGoogleAuth } from "@/components/account/google/utils/use-google-auth";

const { event, googleLogout, initSync, teardownSync } = vi.hoisted(() => ({
	event: vi.fn(),
	googleLogout: vi.fn(),
	initSync: vi.fn(),
	teardownSync: vi.fn(),
}));

vi.mock("@react-oauth/google", () => ({
	googleLogout,
	useGoogleLogin: () => vi.fn(),
}));
vi.mock("tanstack-router-ga4", () => ({
	useGoogleAnalytics: () => ({ event }),
}));
vi.mock("@/components/account/google/utils/drive-sync", () => ({
	initSync,
	teardownSync,
}));

// biome-ignore lint/style/useComponentExportOnlyModules: local test harness
function AuthHarness() {
	const { logout } = useGoogleAuth();
	return (
		<button type="button" onClick={logout}>
			Logout
		</button>
	);
}

beforeEach(() => {
	vi.stubGlobal("fetch", vi.fn());
	event.mockReset();
	googleLogout.mockReset();
	initSync.mockReset();
	teardownSync.mockReset();
});

afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
});

describe("useGoogleAuth logout", () => {
	it("keeps sync active when the server rejects logout", async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce({ ok: false } as Response)
			.mockResolvedValueOnce({ ok: false } as Response);
		render(<AuthHarness />);

		fireEvent.click(screen.getByRole("button", { name: "Logout" }));

		await waitFor(() =>
			expect(event).toHaveBeenCalledWith("google_drive_logout_failure"),
		);
		expect(teardownSync).not.toHaveBeenCalled();
	});

	it("tears down sync after confirmed server logout", async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce({ ok: false } as Response)
			.mockResolvedValueOnce({ ok: true } as Response);
		render(<AuthHarness />);

		fireEvent.click(screen.getByRole("button", { name: "Logout" }));

		await waitFor(() =>
			expect(event).toHaveBeenCalledWith("google_drive_logout_success"),
		);
		expect(teardownSync).toHaveBeenCalledOnce();
	});
});
